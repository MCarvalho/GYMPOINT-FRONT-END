import React from 'react';

import { MdQuestionAnswer } from 'react-icons/md';

import { Container } from './styles';

import InfoTable from '~/components/InfoTable';

export default function HelpOders() {
  return (
    <Container>
      <header>
        <strong>Gerenciamento de Alunos</strong>

        <div>
          <input type="text" placeholder="Buscar Aluno" />
        </div>
      </header>

      <footer>
        <InfoTable>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th className="options">OPTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>student.name</td>
              <td className="options">
                <div>
                  <button type="button">
                    <MdQuestionAnswer size={22} color="#4D85EE" />
                    <strong>RESPONDER</strong>
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
