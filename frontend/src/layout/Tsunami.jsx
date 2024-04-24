import { Menu, Row, theme, Layout, Typography } from 'antd';
import waveImg from '../../../backend/screenshots/wave.png'
import Tqdodont from '../components/Tdodont';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const { Title, Text } = Typography;

const { Header, Content, Footer, Sider } = Layout;
const items = [
  {
    key: '1',
    label: (
      <a href="/earthquake"  rel="noopener noreferrer">
        Earthquake
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a href="/floods"  rel="noopener noreferrer">
        Flood
      </a>
    ),
  },
  {
      key: '3',
      label: 'Cyclone'
  },
  {
    key: '4',
    label: (
      <a href="/tsunami"  rel="noopener noreferrer">
        Tsunami
      </a>
    ),
  },
  {
      key: '5',
      label: 'Cloudburst'
    }
]

const NavigationMenu = () => {
  const navigate = useNavigate();

  const handleMenuItemClick = (key) => {
    switch (key) {
      case '4':
        navigate('/tsunami');
        break;
      default:
        break;
    }
  };

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onSelect={({ key }) => handleMenuItemClick(key)} items={items} />
  );
};

const Tsunami = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <h1 style={{color: '#ffffff', alignSelf: 'center', marginLeft: 20}} >GeoRescue©</h1>
        <NavigationMenu />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Row style={{padding: '0% 5%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Title level={4}>Tsunami</Title>
              <img src={"https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/half_width/public/thumbnails/image/jason_seaheight.jpg?itok=eT0Zy5wZ"} alt="Wave" style={{ width: '100%', maxWidth: '1000px', marginBottom: '16px' }} /> 
              <Text>A tsunami is a series of ocean waves caused by earthquakes, landslides, or volcanic eruptions. These waves can kill and injure people and destroy entire communities. Tsunamis strike as fast moving walls of water that flood, drain, and re flood the land for hours. Tsunamis can flood more than a mile inland. But we can take action to prepare. Prepare now to protect yourself and your loved ones.</Text>
            </Row>
            <Row style={{padding: '1% 5%'}}>
              <Tqdodont/>
            </Row>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          GeoRescue©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Tsunami;
