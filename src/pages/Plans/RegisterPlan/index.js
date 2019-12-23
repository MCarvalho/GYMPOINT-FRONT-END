import React from 'react';
import { MdLibraryAdd } from 'react-icons/md';

import { Container, ButtonRegister } from './styles';

export default function RegisterPlan() {
  return (
    <Container>
      <ButtonRegister>
        <MdLibraryAdd size={22} />
        CADASTRAR
      </ButtonRegister>
    </Container>
  );
}
