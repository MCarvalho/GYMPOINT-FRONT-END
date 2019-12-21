import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/images/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('Digite um email'),
  password: Yup.string()
    .min(6, 'Senha deve ter no mínimo 6 digitos')
    .required('Digite sua senha'),
});

export default function SignIn() {
  function handleSubmit(data) {}

  return (
    <>
      <img src={logo} alt="GYMPOINT" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <strong>EMAIL </strong>
        <Input name="email" type="email" placeholder="Digite seu email" />
        <strong>SENHA </strong>
        <Input name="password" type="password" placeholder="Digite sua senha" />
        <button type="submit">Acessar</button>
      </Form>
    </>
  );
}
