import styled from 'styled-components';
import bgForm from '../../assets/bg-form.jpg';

export const Main = styled.main`
  display: flex;
  /* background: var(--black); */
  background-image: url(${bgForm});
  background-size: cover;
  color: var(--white);
  flex: 1;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 5%;
  padding-right: 5%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
