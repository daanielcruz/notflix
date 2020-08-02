import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FormContainer = styled.div`
  background: rgba(0, 0, 0, 0.75);
  padding: 45px 45px 0;
  border-radius: 4px;
  width: 55vw;
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
  > div {
    width: 100%;
    padding: 40px;
    max-height: 60vh;
    > div {
      > div {
        max-height: 35vh;
      }
    }
  }
`;

export const EndBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 25px;
  font-size: 1.1em;
  color: white;
  flex-direction: column;
  @media (max-width: 800px) {
    padding: 10px !important;
  }
`;

export const BackLink = styled(Link)`
  text-decoration: none;
  color: var(--primary);
  transition: 200ms;
  &:hover {
    color: rgb(229, 9, 20, 0.7);
  }
`;
