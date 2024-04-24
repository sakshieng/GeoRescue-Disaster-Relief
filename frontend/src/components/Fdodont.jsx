import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Row, theme } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const getItems = (panelStyle) => [
  {
    key: '1',
    label: 'What to Do Before an Flood',
    children: <ul>
    <li>Avoid building in flood-prone areas unless you elevate and reinforce your home.</li>
    <li>Elevate the furnace, water heater, and electric panel if susceptible to flooding.</li>
    <li>Install "Check Valves" in sewer traps to prevent floodwater from backing up into the drains of your home.</li>
    <li>Contact community officials to find out if they are planning to construct barriers (levees, beams, and floodwalls) to stop floodwater from entering the homes in your area.</li>
    <li>Seal the walls in your basement with waterproofing compounds to avoid seepage.</li>
  </ul>,
    style: panelStyle,
  },
  {
    key: '2',
    label: 'What to Do After an Flood',
    children: <ul>
    <li>Avoid building in flood-prone areas unless you elevate and reinforce your home.</li>
    <li>Elevate the furnace, water heater, and electric panel if susceptible to flooding.</li>
    <li>Install "Check Valves" in sewer traps to prevent floodwater from backing up into the drains of your home.</li>
    <li>Contact community officials to find out if they are planning to construct barriers (levees, beams, and floodwalls) to stop floodwater from entering the homes in your area.</li>
    <li>Seal the walls in your basement with waterproofing compounds to avoid seepage.</li>
  </ul>,
    style: panelStyle,
  },
  {
    key: '3',
    label: 'Emergency Kit',
    children: <p>{text}</p>,
    style: panelStyle,
  },
];
const Fdodont = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };
  return (
    <div>
       <Title level={2} align={'center'}>Floods Do's and Dont's</Title>
        <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{
            background: token.colorBgContainer,
        }}
        items={getItems(panelStyle)}
        />
    </div>
  );
};
export default Fdodont;