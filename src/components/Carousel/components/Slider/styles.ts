import styled from "styled-components";

export const Container = styled.ul`
  padding: 0;
  margin: 0;
  .slick-prev,
  .slick-next {
    z-index: 50;
    top: 0;
    bottom: 0;
    margin: auto;
    transform: initial;
  }

  .slick-prev {
    left: -35px;
    &:before {
      content: none;
    }
    @media (max-width: 800px) {
      left: 11px;
    }
  }
  .slick-next {
    right: -35px;
    content: none;
    &:before {
      content: none;
    }
    @media (max-width: 800px) {
      right: 11px;
    }
  }
`;

export const ArrowContainer = styled.div`
  display: flex !important;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 95px !important;
  background: rgb(211, 211, 211, 0.2);
  transition: 300ms;

  &:hover {
    background: rgb(211, 211, 211, 0.8);
    --arrow: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 800px) {
    background: transparent;
    --arrow: white;
    svg {
      -webkit-filter: drop-shadow(3px 3px 2px rgba(0, 0, 0));
      filter: drop-shadow(3px 3px 2px rgba(0, 0, 0));
    }

    &:hover {
      background: transparent;
    }
  }
`;
