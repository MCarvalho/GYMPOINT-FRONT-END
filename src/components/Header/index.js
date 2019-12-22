import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo-extend.svg';

import { Container, Content } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="logo" />
          <Link to="/students">ALUNOS</Link>
          <Link to="/plans">PLANOS</Link>
          <Link to="/enrollments">MATRÍCULAS</Link>
          <Link to="/helpoders">PEDIDOS DE AUXÍLIO</Link>
        </nav>

        <div>
          <strong>Nome USER</strong>
          <button type="button">SAIR</button>
        </div>
      </Content>
    </Container>
  );
}
