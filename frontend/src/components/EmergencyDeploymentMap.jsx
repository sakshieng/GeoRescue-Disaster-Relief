// EmergencyDeploymentMap.js

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

const EmergencyDeploymentMap = () => {
  const [emergencyLocations, setEmergencyLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setEmergencyLocations([...emergencyLocations, { lat, lng }]);
    console.log("hello")
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  const mapCenter = emergencyLocations.length > 0 ? emergencyLocations[0] : [0, 0];

  return (
    <div>
      <h2>Emergency Personnel Deployment Map</h2>
      <p>Click on the map to add emergency locations.</p>
      <MapContainer center={mapCenter} zoom={2} style={{ height: '500px', width: '100%' }} onClick={handleMapClick}>
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://maps.stamen.com/watercolor.html">Stamen Design</a>'
      />
        {emergencyLocations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            eventHandlers={{ click: () => handleMarkerClick(location) }}
          >
            <Popup>
              {`Emergency Location ${index + 1}`}
              <br />
              {`Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}`}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {selectedLocation && (
        <div>
          <h3>Selected Location Details</h3>
          <p>{`Lat: ${selectedLocation.lat.toFixed(4)}`}</p>
          <p>{`Lng: ${selectedLocation.lng.toFixed(4)}`}</p>
        </div>
      )}
    </div>
  );
};

export default EmergencyDeploymentMap;
