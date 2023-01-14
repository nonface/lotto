import styled from 'styled-components';

export const SavedNumbersContainer = styled.div`
  padding: 0;
  margin-top: 25px;
  border: 1px solid #eee;
  border-radius: 5px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px;

    h2 {
      margin: 0;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      border-top: 1px solid #eee;

      span {
        color: #777;
        font-size: .9rem;
        padding-left: 5px;
      }

      &:nth-child(even) {
        background-color: #f3f3f3;
      }
    }
  }
`;
