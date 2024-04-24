import React from 'react';
import { Carousel, Typography } from 'antd';
import './ImageCarousel.css';  // Import your CSS file

import image2 from '../../../backend/screenshots/2.jpeg'
import image3 from '../../../backend/screenshots/3.jpeg'
import image5 from '../../../backend/screenshots/4.jpeg'
import image4 from '../../../backend/screenshots/5.jpeg'
import image6 from '../../../backend/screenshots/6.jpeg'
import image7 from '../../../backend/screenshots/7.jpeg'
import image8 from '../../../backend/screenshots/1.jpeg'

const ImageCarousel = () => {
  const images = [
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];

  return (
    <div className="carousel-container">
      <Typography.Title level={2} style={{marginLeft: '30%'}}>Natural Disaster Sentiment Analysis</Typography.Title>
      <Carousel autoplay dots={false} slidesToShow={4} align='center'>
        {images.map((image, index) => (
          <div key={index} className="carousel-item" style={{align: 'center', marginTop: 'auto'}}>
            <img src={image} alt={`Image ${index + 1}`} style={{align: 'center', marginTop: 'auto'}}/>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
