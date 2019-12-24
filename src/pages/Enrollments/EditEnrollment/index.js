import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addMonths, parseISO, format } from 'date-fns';
import { MdEdit, MdArrowBack, MdSave } from 'react-icons/md';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FloatForm, Content } from '~/components/FloatForm';
import { formatPrice } from '~/util/format';

import api from '~/services/api';

import history from '~/services/history';

import { Container, EditButton } from './styles';

const schema = Yup.object().shape({
  start_date: Yup.date('Data incial').required('Quando inicia?'),
});

export default function EditEnrollment({ data }) {
  const [visible, setVisible] = useState(false);
  const [duriationChange, setduriationChange] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [startDateChange, setStartDateChange] = useState();
  const [plans, setPlans] = useState([]);

  async function handleFormChange(e) {
    switch (e.target.id) {
      case 'plan_id': {
        const plan = plans.find(p => p.id === Number(e.target.value));
        setPriceChange(Number(plan.price));
        setduriationChange(Number(plan.duration));
        break;
      }

      case 'start_date': {
        setStartDateChange(parseISO(e.target.value));
        break;
      }

      default:
    }
  }

  useEffect(() => {
    async function loadingData() {
      setduriationChange(Number(data.Plan.duration));
      setPriceChange(Number(data.Plan.price));
      setStartDateChange(parseISO(data.start_date));
    }

    loadingData();
  }, [data.Plan.duration, data.Plan.price, data.start_date]);

  const totalPrice = useMemo(() => formatPrice(duriationChange * priceChange), [
    priceChange,
    duriationChange,
  ]);

  const initialData = useMemo(
    () => ({
      student: data.Student.name,
      start_date: format(parseISO(data.start_date), "yyyy'-'MM'-'yy"),
    }),
    [data]
  );

  const endDateChange = useMemo(() => {
    try {
      return format(
        addMonths(startDateChange, duriationChange),
        "yyyy'-'MM'-'dd"
      );
    } catch (error) {
      return '';
    }
  }, [duriationChange, startDateChange]);

  async function handleSubmit({ student_id, plan_id, start_date }) {
    await api
      .put(`enrollments/${data.id}`, {
        student_id,
        plan_id,
        start_date,
      })
      .then(() => {
        setVisible(!visible);
        history.go('/enrollments');
      })
      .catch(() => {
        toast.error('Houve alguma falha no cadastro, verifique os dados');
      });
  }

  useEffect(() => {
    async function loadingPlans() {
      const response = await api.get('plans');

      const dataRequest = response.data.map(plan => ({
        title: plan.title,
        id: plan.id,
        duration: plan.duration,
        price: plan.price,
      }));

      setPlans(dataRequest);
    }

    loadingPlans();
  }, []);

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <Container>
      <EditButton onClick={handleVisible}>
        <MdEdit size={22} color="#4D85EE" />
      </EditButton>

      <FloatForm visible={visible}>
        <Content visible={visible}>
          <Form
            initialData={initialData}
            schema={schema}
            onSubmit={handleSubmit}
            onChange={handleFormChange}
          >
            <header>
              <strong>Edição de Matrícula</strong>
              <div>
                <button type="button" onClick={handleVisible}>
                  <MdArrowBack size={22} />
                  Voltar
                </button>
                <button type="submit">
                  <MdSave size={22} />
                  Salvar
                </button>
              </div>
            </header>

            <footer>
              <strong>ALUNO</strong>
              <Input name="student" readOnly />

              <div>
                <div>
                  <strong>PLANO</strong>
                  <Select
                    name="plan_id"
                    options={plans}
                    placeholder={data.Plan.title}
                  />
                </div>
                <div>
                  <strong>DATA DE INÍCIO</strong>
                  <Input
                    name="start_date"
                    type="date"
                    placeholder="Valor mensal"
                  />
                </div>
                <div>
                  <strong>DATA DE TÉRMINO</strong>
                  <Input
                    name="end_date"
                    type="date"
                    value={endDateChange}
                    readOnly
                    placeholder="Será calculado."
                  />
                </div>
                <div>
                  <strong>PREÇO TOTAL</strong>
                  <Input
                    name="totalPrice"
                    readOnly
                    value={totalPrice}
                    placeholder="Será calculado."
                  />
                </div>
              </div>
            </footer>
          </Form>
        </Content>
      </FloatForm>
    </Container>
  );
}

EditEnrollment.propTypes = {
  data: PropTypes.object.isRequired,
};
