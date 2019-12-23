import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { formatPrice } from '~/util/format';

import { Container } from './styles';

import api from '~/services/api';

import RegisterPlan from './RegisterPlan';

import InfoTable from '~/components/InfoTable';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadingPlans() {
      const response = await api.get('plans');

      const data = response.data.map(plan => ({
        ...plan,
        formatedPrice: formatPrice(plan.price),
        durationMonth: `${plan.duration} ${
          plan.duration !== 1 ? 'meses' : 'mês'
        }`,
      }));

      setPlans(data);
    }

    loadingPlans();
  }, []);

  return (
    <Container>
      <header>
        <strong>Gerenciamento de Planos</strong>

        <div>
          <RegisterPlan />
        </div>
      </header>

      <footer>
        <InfoTable>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR p/ MÊS</th>
              <th>OPTIONS</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr>
                <td>{plan.title}</td>
                <td>{plan.formatedPrice}</td>
                <td>{plan.formatedPrice}</td>
                <td>
                  <div>
                    <button type="button">
                      <MdDelete size={22} color="#DE3B3B" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </InfoTable>
      </footer>
    </Container>
  );
}
