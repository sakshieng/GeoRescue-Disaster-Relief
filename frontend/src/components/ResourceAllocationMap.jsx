// ResourceAllocationMap.js

import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, useMap, GeoJSON } from 'react-leaflet';
import data from '../data/database.geojson'

const ResourceAllocationMap = () => {
  const [seismicIntensity, setSeismicIntensity] = useState(5); // Initial seismic intensity
    console.log(data.features[2])
  const handleIntensityChange = (event, newValue) => {
    setSeismicIntensity(newValue);
  };

  const DynamicCircle = ({ seismicIntensity }) => {
    const map = useMap();
    const center = map.getCenter();
  
    // Adjust radius based on seismic intensity
    const radius = seismicIntensity * 10000;
  
    return <Circle center={center} radius={radius} color="red" />;
  };

  return (
    <div>
      <h2>Dynamic Resource Allocation Map</h2>
      <input
        type="range"
        min={1}
        max={10}
        value={seismicIntensity}
        onChange={(e) => handleIntensityChange(e, parseInt(e.target.value))}
      />
      <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON data={data} />
        <DynamicCircle seismicIntensity={seismicIntensity} />
      </MapContainer>
    </div>
  );
};



export default ResourceAllocationMap;
