import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Typography, theme } from 'antd';
import React from 'react';

const { Title } = Typography;

const text = `
  A tsunami is a series of ocean waves caused by an underwater earthquake, 
  landslide, or volcanic eruption. It's crucial to be prepared and know 
  what to do to stay safe during a tsunami.
`;

const getItems = (panelStyle) => [
  {
    key: '1',
    label: 'Before a Tsunami',
    children: (
      <ul>
        <li>Learn the tsunami warning signs and evacuation routes in your area.</li>
        <li>Develop a family emergency plan and practice it regularly.</li>
        <li>Identify safe areas inland and at higher elevations.</li>
        <li>Secure heavy items and move valuable possessions to higher floors.</li>
        <li>Stay informed through local authorities and weather updates.</li>
      </ul>
    ),
    style: panelStyle,
  },
  {
    key: '2',
    label: 'During a Tsunami',
    children: (
      <ul>
        <li>Follow evacuation orders immediately and move to higher ground.</li>
        <li>Avoid coastal areas, riverbanks, and low-lying areas.</li>
        <li>Do not return to the evacuation zone until authorities declare it safe.</li>
        <li>Listen to local radio or TV stations for updates and instructions.</li>
        <li>Help others who may need assistance, but prioritize your safety.</li>
      </ul>
    ),
    style: panelStyle,
  },
  {
    key: '3',
    label: 'After a Tsunami',
    children: <p>{text}</p>,
    style: panelStyle,
  },
];

const TsunamiDosAndDonts = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <div>
      <Title level={2} align="center">
        Tsunami Do's and Dont's
      </Title>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{
          background: token.colorBgContainer,
        }}
      >
        {getItems(panelStyle).map(item => (
          <Collapse.Panel key={item.key} header={item.label} style={item.style}>
            {item.children}
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default TsunamiDosAndDonts;
