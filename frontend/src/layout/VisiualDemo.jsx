// VisualDemo.js

import React, { useState } from 'react';
import { Modal, Button, Space } from 'antd';

const VisualDemo = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDemoClick = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" size="large" onClick={handleDemoClick}>
        Launch Demo
      </Button>
      <Modal
        title="Interactive Simulation Demo"
        visible={modalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={null}
      >
        {/* Include your interactive demo or simulation component here */}
        <iframe
          title="Earthquake Simulation Demo"
          width="100%"
          height="400"
          src="https://www.example.com/your-interactive-demo"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </Modal>
    </div>
  );
};

export default VisualDemo;
