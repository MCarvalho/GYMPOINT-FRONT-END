import React, { useEffect, useState } from 'react';

import { MdQuestionAnswer } from 'react-icons/md';

import { Container, Footer } from './styles';

import InfoTable from '~/components/InfoTable';

import api from '~/services/api';

export default function HelpOders() {
  const [helpOders, setHelpOders] = useState([]);

  useEffect(() => {
    async function loadingHelpOders() {
      const response = await api.get('help-oders');
      console.tron.log(response.data);
      setHelpOders(response.data);
    }

    loadingHelpOders();
  }, []);
  return (
    <Container>
      <header>
        <strong>Gerenciamento de Auxílios</strong>
      </header>

      <Footer>
        <InfoTable>
          <thead>
            <tr>
              <th>ALUNO</th>
            </tr>
          </thead>
          <tbody>
            {helpOders.map(helpoder => (
              <tr>
                <td>{helpoder.student.name || 'Deletado'}</td>
                <td className="options">
                  <div>
                    <button type="button">
                      <MdQuestionAnswer size={22} color="#4D85EE" />
                      <strong>RESPONDER</strong>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </InfoTable>
      </Footer>
    </Container>
  );
}
