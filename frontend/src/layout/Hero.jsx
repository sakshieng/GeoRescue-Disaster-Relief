// src/components/HeroSection.js
import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import VisualDemo from './VisiualDemo';
import Tweets from './Tweets';
import Video from './Video';
import FormPage from './FormPage';
import disaster from '../assets/disaster.png'
import ImageCarousel from './ImageCarousel';

const Hero = () => {
  return (
    <div className="hero-section">
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{marginTop: 100}}>
          <div className="hero-tagline">
            <Typography.Title level={1}>From Prediction to Protection:</Typography.Title>
            <Typography.Title level={1} style={{color: '#ff675a', marginTop: -20}}>Unleashing the Power of Preparedness.</Typography.Title>
            <Typography.Title level={5}>
            From Prediction to Protection: Unleashing the Power of Preparedness is our commitment to turning foresight into action. We harness cutting-edge technology to predict disasters, empowering communities with timely information. Together, we stand resilient, ensuring that every step taken in preparedness becomes a shield against the uncertainties of tomorrow.
            </Typography.Title>
            <Button style={{backgroundColor: '#ff675a', color: 'white'}}>
              Know more....
            </Button>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={11}>
          <img src={disaster} height={'600px'} width={'100%'}/>
        </Col>
      </Row>
      <Row justify={'center'} style={{marginTop: 10, marginBottom: 30}}>
        <ImageCarousel />
      </Row>
      <Row justify={'center'} style={{margin: '0 60'}}>
        {/* <img src='https://www.visualcapitalist.com/wp-content/uploads/2023/09/deadliest-earthquakes-21st-century.jpg' height={'auto'} width={'60%'}/> */}
        <FormPage />
      </Row>
      <Row style={{padding: 30}} justify='space-between'>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} align='center'>
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <Tweets />
        </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={10}>
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <Video url="https://www.youtube.com/watch?v=vTmJv94wZZ4" text="Do's and don'ts during an earthquake" />
            <Video url="https://www.youtube.com/watch?v=jPR8HHmpeXE" text="Earthquake Safety | Safety for kids | Earthquake safety tips | भूकंप से कैसे बचें?" />
            <Video url="https://www.youtube.com/watch?v=m59kX6MAEPw" text="How do you stay safe during an earthquake? (BBC Hindi)" />
            <Video url="https://www.youtube.com/watch?v=CBf57Fyy-YI" text="Natural Disaster Management Complete in Hindi प्राकृतिक आपदा पर निबंध, कारण, प्रभाव, प्रबंधन" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Hero;
