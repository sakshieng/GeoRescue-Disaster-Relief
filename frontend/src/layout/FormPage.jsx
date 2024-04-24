import { Button, Flex, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';

const FormPage = () => {
  const [location, setLocation] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [disasterName, setDisasterName] = useState('');
  const [response1, setResponse1] = useState(null);
  const [response2, setResponse2] = useState(null);

  const handleGenerateResponse = async () => {
    try {
      // Make the first GET request to disaster_response
      const response = await axios.get(
        `http://127.0.0.1:8000/disaster_response?number_of_people=${numberOfPeople}&disaster_name=${disasterName}`
      );
      // console.log(response.data)
      setResponse1(response.data);

      // Make the second GET request to get_docters
      // console.log(location)
      const doctorsResponse = await axios.get(
        `http://127.0.0.1:8000/get_docters?location=${location}&count=5`
      );
      // console.log(doctorsResponse.data)
      setResponse2(doctorsResponse.data);
    } catch (error) {
      console.error('Error generating response:', error);
    }
  };

  const formattedResponse = response1?.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  console.log(formattedResponse)

  return (
    <div>
      <Typography.Title level={2} style={{marginLeft: '40%'}}>Resource Allocation</Typography.Title>
      <Form style={{ marginTop: 50 }}>
        <Flex>
          <Form.Item
            label="Location"
            name="location"
            rules={[
              {
                required: true,
                message: 'Please input your location!',
              },
            ]}
            style={{ marginRight: 20 }}
          >
            <Input onChange={(e) => setLocation(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Number of people"
            name="Number of people"
            rules={[
              {
                required: true,
                message: 'Please input the number of people!',
              },
            ]}
            style={{ marginRight: 20 }}
          >
            <Input onChange={(e) => setNumberOfPeople(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Disaster Name"
            name="Disaster Name"
            rules={[
              {
                required: true,
                message: 'Please input the disaster name!',
              },
            ]}
            style={{ marginRight: 10 }}
          >
            <Input onChange={(e) => setDisasterName(e.target.value)} />
          </Form.Item>
        </Flex>
        <Button
          style={{ backgroundColor: '#ff675a', color: 'white' }}
          onClick={handleGenerateResponse}
        >
          Generate Response
        </Button>
      </Form>

      {/* Display the responses */}
      {/* <Typography.Title level={4}>{formattedResponse}</Typography.Title> */}
      {/* <Typography.Title level={4}>{response2}</Typography.Title> */}
      {response1 && (
        <div>
          <h2>Response:</h2>
          <Typography.Title level={5}>{formattedResponse}</Typography.Title>
        </div>
      )}

      {response2 && (
        <div>
          <h2>Doctors List:</h2>
          <ul>
            {response2?.map((doctor, index) => (
              <li key={index}>
                <Typography.Text strong>{doctor.name}</Typography.Text>
                <br />
                Location: {doctor.location}
                <br />
                Phone Number: {doctor.phone_number}
                <br />
                Specialist: {doctor.specialist}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FormPage;
