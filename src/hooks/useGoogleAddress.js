import { useState, useEffect } from 'react';
import axios from 'axios';

const useGoogleAddress = address => {
    const [map, setMap] = useState({ lat: 0, lng: 0 });
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDvOFkhP8WTxIg_UKt16jn1fmdG4RrIfRg`;
    useEffect(() => {
        async function fetchData() {
            const response = await axios(API);
            setMap(response.data.results[0].geometry.location);
        }
        fetchData();
        /* fetch(API)
            .then(response => response.json())
            .then(data => {
                setMap(data.results[0].geometry.location);
            }
            ); */

    }, []);
    return map;
};

export default useGoogleAddress;


