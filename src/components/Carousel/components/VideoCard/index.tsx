import React, { useState } from 'react';
import { VideoCardContainer, ModalContent, ModalContainer } from './styles';

const VideoCard = ({
  videoTitle,
  videoURL,
}: {
  videoTitle: string;
  videoURL: string;
}) => {
  const getYouTubeId = (youtubeURL: string) => {
    return youtubeURL.replace(
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
      '$7',
    );
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const image = `https://img.youtube.com/vi/${getYouTubeId(
    videoURL,
  )}/hqdefault.jpg`;

  return (
    <>
      <VideoCardContainer
        url={image}
        title={videoTitle}
        onClick={() => setModalIsOpen(!modalIsOpen)}
      >
        <span>{videoTitle}</span>
      </VideoCardContainer>

      {modalIsOpen && (
        <ModalContainer open={modalIsOpen}>
          <ModalContent>
            <span onClick={() => setModalIsOpen(!modalIsOpen)}>&#10060;</span>
            <iframe
              title={videoTitle}
              className="border border-secondary rounded"
              width="100%"
              height="100%"
              src={`https://youtube.com/embed/${getYouTubeId(videoURL)}`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0"
            ></iframe>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};

export default VideoCard;
