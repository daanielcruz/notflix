import React from 'react';
import { VideoCardGroupContainer, Title, SliderItem } from './styles';
import Slider from './components/Slider';
import VideoCard from './components/VideoCard';

interface iVideos {
  id: number;
  categoryId: number;
  title: string;
  url: string;
}

interface iCategory {
  id: number;
  title: string;
  videos: iVideos[];
}

const Carousel = ({
  ignoreFirstVideo,
  category,
}: {
  ignoreFirstVideo?: boolean;
  category: iCategory;
  key?: number;
}) => {
  const categoryTitle = category.title;
  const videos = category.videos;
  return (
    <VideoCardGroupContainer>
      {categoryTitle && (
        <>
          <Title>{categoryTitle}</Title>
        </>
      )}
      <Slider>
        {videos.map((video, index) => {
          if (ignoreFirstVideo && index === 0) {
            return null;
          }

          return (
            <SliderItem key={video.id}>
              <VideoCard videoTitle={video.title} videoURL={video.url} />
            </SliderItem>
          );
        })}
      </Slider>
    </VideoCardGroupContainer>
  );
};

export default Carousel;
