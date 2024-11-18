
import axios from 'axios';
import { useEffect, useState } from 'react';

export function Checking() {
    const [macAddress, setMacAddress] = useState('');

    useEffect(() => {
        axios.get('http://localhost:65531/api/data')
            .then(response => setMacAddress(response.data))
            .catch(error => console.error('Error fetching MAC address:', error));
    }, []);
    return (
        <>
       <div>
       <h1>Device MAC Address</h1>
       <p>{macAddress || 'Loading...'}</p>
        </div>
        </>
    );
}