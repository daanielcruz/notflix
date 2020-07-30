import React from 'react';
import initialData from '../../data/initial_data.json';
import Menu from '../../components/Menu';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';

const Home = () => {
  return (
    <div style={{ background: '#141414' }}>
      <Menu />
      <BannerMain
        videoTitle={initialData.categories[0].videos[0].title}
        url={initialData.categories[0].videos[0].url}
        videoDescription={
          '[PT-BR] Know everything you need to start with React Native!'
        }
      />

      <Carousel ignoreFirstVideo category={initialData.categories[0]} />
      <Carousel ignoreFirstVideo category={initialData.categories[1]} />
      <Carousel ignoreFirstVideo category={initialData.categories[2]} />
      <Footer />
    </div>
  );
};

export default Home;
