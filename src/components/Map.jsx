import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const Map = ({ location }) => {

    const {lat,lng}=location
    
    const mapStyles = {
        height: "50vh",
        width: "100%"
    }

    const defaultCenter = {
        lat: lat, lng: lng
    }

    return (
        <LoadScript googleMapsApiKey='AIzaSyDvOFkhP8WTxIg_UKt16jn1fmdG4RrIfRg'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={17}
                center={defaultCenter}
            >
                <Marker position={defaultCenter} />
            </GoogleMap>
        </LoadScript>
    );
}

export default Map;