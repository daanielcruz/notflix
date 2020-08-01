import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';

export const VideoCardContainer = styled.a`
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  color: white;
  flex: 0 0 298px;
  width: 298px;
  height: 197px;
  background-image: ${({ url }: { url: string }) => `url(${url})`};
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 16px;

  transition: opacity 0.3s;
  &:hover,
  &:focus {
    opacity: 0.5;
  }

  &:not(:first-child) {
    margin-left: 20px;
  }
`;

export const ModalContent = styled.div`
  background: rgba(0, 0, 0, 0.75);
  padding: 35px;
  border-radius: 4px;
  width: 700px;
  height: 500px;
  position: relative;
  outline: none;
  border: 1px solid rgb(229, 9, 20, 0.5);
  > span {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    color: white;
  }
  @media (max-width: 800px) {
    min-width: 0;
    width: 90%;
    height: 35%;
  }
`;

export const ModalContainer = styled(Modal)`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
`;
