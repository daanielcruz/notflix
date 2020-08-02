import styled from 'styled-components';

export const FormContainer = styled.div`
  background: rgba(0, 0, 0, 0.75);
  padding: 45px;
  border-radius: 4px;
  min-width: 400px;
  width: 50vw;
  max-width: 8000px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: 800px) {
    min-width: 0;
    width: 95%;
    padding: 10px;
  }
`;
