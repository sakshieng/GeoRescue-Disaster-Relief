import { Menu, Row, theme, Layout, Typography } from 'antd';
import SeismicActivityGraphs from '../components/SeismicActivityGraphs';
import Eqdodont from '../components/Eqdodont';
import React from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import Hero from './Hero';
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

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout hasSider>
    {/* <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header> */}
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
        <h1 style={{color: '#ffffff', alignSelf: 'center', marginLeft: 20}}>GeoRescue©</h1>
        <Menu theme="dark" mode="inline" items={items} />
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
              minHeight: 380,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Hero/>
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
export default Home;










// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import { useState } from 'react';
// import './Home.css'
// import Hero from './Hero';

// const { Header, Content, Footer } = Layout;

// const items = [
//     {
//       label: 'Home',
//       key: 'home',
//     },
//     {
//       label: 'Navigation Two',
//       key: 'app',
//     },
//     {
//         label: (
//           <a href="/earthquake"  rel="noopener noreferrer">
//             Seismic Activity
//           </a>
//         ),
//         key: 'alipay',
//       },
//     ];

// const Home = () => {
//     const [current, setCurrent] = useState('mail');
//   const onClick = (e) => {
//     console.log('click ', e);
//     setCurrent(e.key);
//   };

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout>
//       <Header
//         style={{
//           position: 'sticky',
//           top: 0,
//           zIndex: 1,
//           width: '100%',
//           display: 'flex',
//           alignItems: 'center',
//         }}
//       >
//         <div className="demo-logo" />
//         <Menu
//           theme="dark"
//           onClick={onClick} 
//           selectedKeys={[current]} 
//           mode="horizontal" 
//           items={items}
//           style={{
//             flex: 1,
//             minWidth: 0,
//           }}
//         />
//       </Header>
//       <Content
//         style={{
//           padding: '0 48px',
//         }}
//       >
//         <Breadcrumb
//           style={{
//             margin: '16px 0',
//           }}
//         >
//           <Breadcrumb.Item>Home</Breadcrumb.Item>
//           <Breadcrumb.Item>List</Breadcrumb.Item>
//           <Breadcrumb.Item>App</Breadcrumb.Item>
//         </Breadcrumb>
//         <div
//           style={{
//             minHeight: 380,
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           <Hero/>
//         </div>
//       </Content>
//       <Footer
//         style={{
//           textAlign: 'center',
//         }}
//       >
//         GeoRescue©©{new Date().getFullYear()} Created by Ant UED
//       </Footer>
//     </Layout>
//   );
// };
// export default Home;