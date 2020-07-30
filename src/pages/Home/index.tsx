import React, { useState, useEffect } from 'react';
import initialData from '../../data/initial_data.json';
import Menu from '../../components/Menu';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';
import { Loading } from '../NewCategory/styles';
import { Container, LoadContainer } from './styles';

const Home = () => {
  interface iVideos {
    title: string;
    url: string;
  }

  interface iCategories {
    title: string;
    videos: iVideos[];
  }

  const [data, setData] = useState<iCategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const catchData = async () => {
      const crudeResponse = await fetch(
        'https://notflix-fakend.herokuapp.com/categories',
      );
      const response = await crudeResponse.json();
      setData([...response]);
      setIsLoading(false);
    };
    catchData();
  }, []);

  return (
    <>
      <Menu />
      <Container>
        {isLoading ? (
          <LoadContainer>
            <Loading />
          </LoadContainer>
        ) : (
          <BannerMain
            videoTitle={initialData.categories[0].videos[0].title}
            url={initialData.categories[0].videos[0].url}
            videoDescription={
              '[PT-BR] Know everything you need to start with React Native!'
            }
          />
        )}

        {!isLoading &&
          data
            .filter((e, i) => i === 0)
            .map((item, i) => (
              <Carousel ignoreFirstVideo category={item} key={i} />
            ))}

        {!isLoading &&
          data
            .filter((e, i) => i !== 0)
            .map((item, i) => <Carousel category={item} key={i} />)}
      </Container>
      <Footer />
    </>
  );
};

export default Home;
