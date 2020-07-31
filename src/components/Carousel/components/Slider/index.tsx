import React from 'react';
import SlickSlider from 'react-slick';
import {
  ArrowIosForwardOutline,
  ArrowIosBackOutline,
} from '@styled-icons/evaicons-outline';
import { Container, ArrowContainer } from './styles';

const Slider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <SlickSlider
        {...{
          dots: false,
          infinite: true,
          speed: 300,
          centerMode: true,
          variableWidth: true,
          adaptiveHeight: true,
          nextArrow: (
            <ArrowContainer>
              <ArrowIosForwardOutline size={22} color={'var(--arrow)'} />
            </ArrowContainer>
          ),
          prevArrow: (
            <ArrowContainer>
              <ArrowIosBackOutline size={22} color={'var(--arrow)'} />
            </ArrowContainer>
          ),
        }}
      >
        {children}
      </SlickSlider>
    </Container>
  );
};

export default Slider;
