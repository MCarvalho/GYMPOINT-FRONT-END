import React from 'react';
import { MdNoteAdd } from 'react-icons/md';

import { Container, ButtonRegister } from './styles';

export default function RegisterEnrollment() {
  return (
    <Container>
      <ButtonRegister>
        <MdNoteAdd size={22} />
        CADASTRAR
      </ButtonRegister>
    </Container>
  );
}
