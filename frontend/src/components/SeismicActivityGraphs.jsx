import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Button, Col, DatePicker, Row, Space } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

const SeismicActivityGraphs = () => {
  const [seismicData, setSeismicData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const maxDataPoints = 400; // Maximum number of data points to display

  const fetchData = async () => {
    try {
      const queryParams = `format=geojson&minmagnitude=1.0${
        startDate ? `&starttime=${startDate.toISOString()}` : ''
      }${endDate ? `&endtime=${endDate.toISOString()}` : ''}`;

      const response = await fetch(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?${queryParams}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch seismic data');
      }

      const data = await response.json();
      const formattedData = data.features.map((feature) => ({
        date: new Date(feature.properties.time).toLocaleDateString(),
        magnitude: feature.properties.mag,
        depth: feature.geometry.coordinates[2],
      }));

      // Update the seismic data while keeping a rolling window
      setSeismicData((prevData) => {
        const newData = [...prevData, ...formattedData].slice(-maxDataPoints);
        return newData;
      });
    } catch (error) {
      console.error('Error fetching seismic data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    // Fetch data every 10 seconds (adjust as needed)
    const intervalId = setInterval(fetchData, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [startDate, endDate]);

  const handleDateChange = (newDate, dateType) => {
    if (dateType === 'start') {
      setStartDate(newDate);
    } else if (dateType === 'end') {
      setEndDate(newDate);
    }
  };

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div>
      <Title align={'center'}>Seismic Activity</Title>
      <Row>
        <Col lg={15}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={seismicData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="magnitude" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Col>
        <Col lg={9} align="center">
          <Space direction="vertical" style={{ marginTop: '20px' }}>
            <Space>
              <DatePicker
                onChange={(date) => handleDateChange(date, 'start')}
                value={startDate}
                placeholder="Start Date"
              />
              <DatePicker
                onChange={(date) => handleDateChange(date, 'end')}
                value={endDate}
                placeholder="End Date"
              />
            </Space>
            <Button
              type="primary"
              onClick={fetchData}
              style={{ backgroundColor: '#ff675a', color: 'white' }}
            >
              Apply Filters
            </Button>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default SeismicActivityGraphs;
