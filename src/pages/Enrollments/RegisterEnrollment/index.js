import React, { useState, useMemo, useEffect } from 'react';
import { addMonths, parseISO, format } from 'date-fns';
import { MdNoteAdd, MdArrowBack, MdSave } from 'react-icons/md';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FloatForm, Content } from '~/components/FloatForm';
import { formatPrice } from '~/util/format';

import api from '~/services/api';

import history from '~/services/history';

import { Container, ButtonRegister } from './styles';

const schema = Yup.object().shape({
  student_id: Yup.string().required('É necessário o nome do plano'),
  plan_id: Yup.number('Em meses').required('Quantos meses duram o plano?'),
  start_date: Yup.date('Data incial').required('Quando inicia?'),
});

export default function RegisterPlan() {
  const [visible, setVisible] = useState(false);
  const [duriationChange, setduriationChange] = useState(0);
  const [priceChange, setpriceChange] = useState(0);
  const [startDateChange, setStartDateChange] = useState();
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);

  async function handleFormChange(e) {
    switch (e.target.id) {
      case 'plan_id': {
        const plan = plans.find(p => p.id === Number(e.target.value));
        setpriceChange(Number(plan.price));
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

  const totalPrice = useMemo(() => formatPrice(duriationChange * priceChange), [
    priceChange,
    duriationChange,
  ]);

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
      .post('enrollments', {
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
    async function loadingStudents() {
      const response = await api.get('students', {
        params: {
          name: '',
        },
      });

      const data = response.data.map(student => ({
        title: student.name,
        id: student.id,
      }));

      setStudents(data);
    }

    async function loadingPlans() {
      const response = await api.get('plans');

      const data = response.data.map(plan => ({
        title: plan.title,
        id: plan.id,
        duration: plan.duration,
        price: plan.price,
      }));

      setPlans(data);
    }

    loadingPlans();
    loadingStudents();
  }, []);

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <Container>
      <ButtonRegister onClick={handleVisible}>
        <MdNoteAdd size={22} />
        CADASTRAR
      </ButtonRegister>

      <FloatForm visible={visible}>
        <Content visible={visible}>
          <Form
            schema={schema}
            onSubmit={handleSubmit}
            onChange={handleFormChange}
          >
            <header>
              <strong>Cadastro de Matrícula</strong>
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
              <Select
                name="student_id"
                options={students}
                placeholder="Escolha um Aluno"
              />

              <div>
                <div>
                  <strong>PLANO</strong>
                  <Select
                    name="plan_id"
                    options={plans}
                    placeholder="Escolha um Aluno"
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
