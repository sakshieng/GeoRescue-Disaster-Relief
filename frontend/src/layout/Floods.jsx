import { Menu, Row, theme, Layout, Typography, Col, Slider, Flex, Button } from 'antd';
import React, { useState } from 'react';
import flood_line from '../assets/flood_line.jpeg'
import Fdodont from '../components/Fdodont';
import Earthquake from './Earthquake';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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


// const items1 = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

const Floods = () => {
    const [jun, setJun] = useState(0)
    const [jul, setJul] = useState(0)
    const [aug, setAug] = useState(0)
    const [pred, setPred] = useState(0)
    const [fat, setFat] = useState(0)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleJun = (value) => {
    setJun(value)
  };
  const handleJul = (value) => {
    setJul(value)
  };
  const handleAug = (value) => {
    setAug(value)
  };

  const handleSubmit = () => {
    console.log(jun, jul, aug)
    axios.post('http://127.0.0.1:8000/predict_flood', 
        {
            "YEAR": 2022,
            "JAN": 100.0,
            "FEB": 100.0,
            "MAR": 100.0,
            "APR": 70.0,
            "MAY": 30.0,
            "JUN": jun,
            "JUL": jul,
            "AUG": aug,
            "SEP": 50.0,
            "OCT": 50.0,
            "NOV": 110.0,
            "DEC": 60.0
          }
    )
      .then(res => {
        setPred(res.data.prediction)
        setFat(res.data.fatality_rate)
    })  
      .catch(function (error) {
        console.log(error);
      });
  };

  const navigate = useNavigate();

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
        {/* <h1 style={{color: '#ffffff', alignSelf: 'center', marginLeft: 20}} onClick={navigate('/')}>GeoRescue©</h1> */}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} items={items} />
        {/* {items.map(item => (
          <Menu.Item key={item.key}>
            <Link to={`/${item.label.toLowerCase()}`}>{item.label}</Link>
          </Menu.Item>
        ))} */}
        {/* </Menu> */}
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        /> */}
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
            //   padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
                         <Row style={{padding: '0% 5%'}}>
             <Title level={4}>Floods</Title>
             <Text>Floods are a recurrent phenomenon, which cause huge loss of lives and 
                damage to livelihood systems, property, infrastructure and public utilities. 
                It is a cause for concern that flood related damages show an increasing trend. 
                The average annual flood damage in the last 10 years period from 1996 to 2005 
                was Rs. 4745 crore as compared to Rs. 1805 crore, the corresponding average 
                for the previous 53 years. This can be attributed to many reasons including a 
                steep increase in population, rapid urbanization growing developmental and economic 
                activities in flood plains coupled with global warming.
            </Text>
              </Row>
            <Row justify={'center'}>
                <img src={flood_line} style={{width: '80%', padding: '3%'}}/>
            </Row>
            <Typography.Title level={3} style={{marginLeft: '40%'}}>Flood Prediction</Typography.Title>
            <Row style={{margin: '1% 23% 2% 18%', padding: '4%', border: 'solid black 1px', borderRadius: 20}}>
              <Typography.Title level={2} style={{marginLeft: '30%', marginTop: -25}}>Rainfall in mm</Typography.Title>
                <Col lg={12}>
                  <Flex>
                    <Typography.Title level={4} style={{marginRight: 20, marginTop: -2}}>June</Typography.Title>
                    <Slider
                        defaultValue={jun}
                        style={{width: '200px'}}
                        step={10}
                        max={1000}
                        tooltip={{
                        open: true,
                        }}
                        onChangeComplete={handleJun}
                    />
                </Flex>
                <Flex>
                  <Typography.Title level={4} style={{marginRight: 20, marginTop: -2}}>July</Typography.Title>
                  <Slider
                      defaultValue={jul}
                      style={{width: '200px'}}
                      step={10}
                      max={1000}
                      tooltip={{
                      open: true,
                      }}
                      onChangeComplete={handleJul}
                  />
                </Flex>
                <Flex>
                  <Typography.Title level={4} style={{marginRight: 20, marginTop: -2}}>August</Typography.Title>
                  <Slider
                      defaultValue={aug}
                      style={{width: '200px'}}
                      step={10}
                      max={1000}
                      tooltip={{
                      open: true,
                      }}
                      onChangeComplete={handleAug}
                  />
                </Flex>
                <Button onClick={handleSubmit} style={{backgroundColor: '#ff675a', color: 'white', marginTop: 20}}>Submit</Button>
                </Col>
                <Col lg={12} style={{display: 'block'}}>
                    <div>
                        <Typography.Title level={4} style={{marginRight: 20}}>Prediction: {pred}</Typography.Title>
                        <Typography.Title level={4}>Fatality_rate:{fat}</Typography.Title>
                    </div>
                </Col>
            </Row>
            <Row style={{padding: '1% 5%'}}>
              <Fdodont/>
            </Row>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          GeoRescue©©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Floods;