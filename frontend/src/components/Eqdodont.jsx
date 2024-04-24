import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
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
    label: 'What to Do Before an Earthquake',
    children: <ul>
    <li>Repair deep plaster cracks in ceilings and foundations. Get expert advice if there are signs of structural defects.</li>
    <li>Anchor overhead lighting fixtures to the ceiling.</li>
    <li>Follow BIS codes relevant to your area for building standards.</li>
    <li>Fasten shelves securely to walls.</li>
    <li>Place large or heavy objects on lower shelves.</li>
    <li>Store breakable items such as bottled foods, glass, and china in low, closed cabinets with latches.</li>
    <li>Hang heavy items such as pictures and mirrors away from beds, settees, and anywhere that people sit.</li>
    <li>Brace overhead light and fan fixtures.</li>
    <li>Repair defective electrical wiring and leaky gas connections. These are potential fire risks.</li>
    <li>Secure water heaters, LPG cylinders, etc., by strapping them to the walls or bolting to the floor.</li>
    <li>Store weed killers, pesticides, and flammable products securely in closed cabinets with latches and on bottom shelves.</li>
  </ul>,
    style: panelStyle,
  },
  {
    key: '2',
    label: 'What to Do After an Earthquake',
    children: <ul>
    <li>Repair deep plaster cracks in ceilings and foundations. Get expert advice if there are signs of structural defects.</li>
    <li>Anchor overhead lighting fixtures to the ceiling.</li>
    <li>Follow BIS codes relevant to your area for building standards.</li>
    <li>Fasten shelves securely to walls.</li>
    <li>Place large or heavy objects on lower shelves.</li>
    <li>Store breakable items such as bottled foods, glass, and china in low, closed cabinets with latches.</li>
    <li>Hang heavy items such as pictures and mirrors away from beds, settees, and anywhere that people sit.</li>
    <li>Brace overhead light and fan fixtures.</li>
    <li>Repair defective electrical wiring and leaky gas connections. These are potential fire risks.</li>
    <li>Secure water heaters, LPG cylinders, etc., by strapping them to the walls or bolting to the floor.</li>
    <li>Store weed killers, pesticides, and flammable products securely in closed cabinets with latches and on bottom shelves.</li>
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
const Eqdodont = () => {
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };
  return (
    <div>
       <Title level={2} align={'center'}>Earthquake Do's and Dont's</Title>
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
export default Eqdodont;