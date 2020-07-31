import React, { useState, useEffect } from 'react';
import PageDefault from '../../components/PageDefault';
import { getAllCategoriesWithVideosAsync } from '../../api';
import { Loading } from '../../styles/global';
import { Container, LoadContainer } from './styles';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';

const Home = () => {
  interface iVideos {
    id: number;
    categoryId: number;
    title: string;
    url: string;
  }

  interface iCategories {
    id: number;
    title: string;
    videos: iVideos[];
  }

  const [data, setData] = useState<iCategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const catchData = async () => {
      try {
        const data = await getAllCategoriesWithVideosAsync();
        setData(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        alert('Error at API =/');
      }
    };
    catchData();
  }, []);

  return (
    <PageDefault>
      <Container>
        {isLoading ? (
          <LoadContainer>
            <Loading />
          </LoadContainer>
        ) : (
          <BannerMain
            videoTitle={data[0].videos[0].title}
            url={data[0].videos[0].url}
            videoDescription={
              '[PT-BR] Know everything you need to start with React Native!'
            }
          />
        )}

        {!isLoading && (
          <Carousel
            ignoreFirstVideo
            category={data[0]}
            key={data[0].videos[0].id}
          />
        )}

        {!isLoading &&
          data.map((category, i) => {
            if (i !== 0) {
              if (category.videos.length > 0)
                return <Carousel key={category.id} category={category} />;
            }
          })}
      </Container>
    </PageDefault>
  );
};

export default Home;
