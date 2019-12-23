import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/images/logo-extend.svg';

import { Container, Content } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="logo" />
          <NavLink to="/students">ALUNOS</NavLink>
          <NavLink to="/plans">PLANOS</NavLink>
          <NavLink to="/enrollments">MATRÍCULAS</NavLink>
          <NavLink to="/helpoders">PEDIDOS DE AUXÍLIO</NavLink>
        </nav>

        <div>
          <strong>Nome USER</strong>
          <button type="button">SAIR</button>
        </div>
      </Content>
    </Container>
  );
}
