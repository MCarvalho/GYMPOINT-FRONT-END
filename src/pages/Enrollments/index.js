import React from 'react';

import { MdDelete, MdCheckCircle, MdNotInterested } from 'react-icons/md';

import { Container } from './styles';

import RegisterEnrollment from './RegisterEnrollment';

import InfoTable from '~/components/InfoTable';

export default function Enrollments() {
  const iconTrue = true;
  return (
    <Container>
      <header>
        <strong>Gerenciamento de Matrículas</strong>

        <div>
          <RegisterEnrollment />
        </div>
      </header>

      <footer>
        <InfoTable>
          <thead>
            <tr>
              <th className="checkActivity">ATIVA</th>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉMINO</th>
              <th>OPTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="checkActivity">
                {iconTrue ? (
                  <MdCheckCircle size={27} color="#94C160" />
                ) : (
                  <MdNotInterested size={27} color="#DE3B3B" />
                )}
              </td>
              <td>student.name</td>
              <td>student.email</td>
              <td>student.ageCalc</td>
              <td>student.ageCalc</td>
              <td>
                <div>
                  <button type="button">
                    <MdDelete size={22} color="#DE3B3B" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </InfoTable>
      </footer>
    </Container>
  );
}
