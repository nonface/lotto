import styled from 'styled-components';

export const BasicButton = styled.button`
  background-color: dodgerblue;
  border: none;
  color: #fff;
  border-radius: 4px;
  height: max-content;
  padding: 8px 10px;
  filter: brightness(100%);
  transition: filter 150ms;

  &:hover {
    filter: brightness(90%);
    cursor: pointer;
  }
`;
