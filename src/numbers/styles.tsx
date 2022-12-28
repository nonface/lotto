import styled from 'styled-components';

export const SelectionContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;

  > div {
    flex-grow: 1;
    flex-shrink: 0;
  }

  button {
    flex-shrink: 0;
    margin-top: 18px;
  }
`;

export const NumbersContainer = styled.div`
  display: flex;
  gap: 10px;

  span {
    display: block;
    height: 75px;
    aspect-ratio: 1/1;
    line-height: 75px;
    text-align: center;
    border-radius: 50%;
    font-size: 40px;
    font-weight: bold;
    background: #fff;
    background: linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(255,255,255,1) 24%, rgba(255,255,255,1) 99%);
    box-shadow: 0 2px 3px 1px rgba(0,0,0,.2);
    background-clip: content-box;

    &.special {
      background: linear-gradient(0deg, rgba(135,82,82,1) 0%, rgba(227,46,46,1) 24%, rgba(219,64,64,1) 100%);
      // background: linear-gradient(0deg, rgba(135,82,82,1) 0%, rgba(227,46,46,1) 24%, rgba(228,60,60,1) 76%, rgba(215,193,193,0.53687412464986) 100%, rgba(231,180,180,1) 100%);
      // border-color: transparent;
      color: #fff;
    }
  }
`;
