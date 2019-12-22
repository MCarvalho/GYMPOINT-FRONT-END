import styled from 'styled-components';
import { darken } from 'polished';

const InfoTable = styled.table`
  width: 100%;
  overflow: scroll;
  background: rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 100%;

  thead th {
    color: #fff;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    padding: 12px;
  }

  tbody td {
    color: #eee;
    font-size: 16px;
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    button {
      display: flex;
      align-items: center;
      border: 0;
      background: rgba(255, 255, 255, 0.5);
      padding: 3px;
      border-radius: 4px;

      &:hover {
        background: ${darken(0.01, '#000')};
        transform: translateY(-3px);
        transition: all 0.11s;
      }
    }
  }
`;

export default InfoTable;
