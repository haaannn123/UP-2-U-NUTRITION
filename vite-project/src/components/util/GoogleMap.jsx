// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = () => {
  const containerStyle = {
    width: '90%',
    height: '400px',
  };

  const center = {
    lat: 29.672982939291256,
    lng: -82.34131254724184,
  };

  return (

    <LoadScript googleMapsApiKey="AIzaSyBWUUeHQhks55sgL_DJdpkHMM0anGVCZ8A">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={20}
      >
        {/* Add markers, info windows, and other map elements here */}
      </GoogleMap>
    </LoadScript >

  );
};

export default Map;
