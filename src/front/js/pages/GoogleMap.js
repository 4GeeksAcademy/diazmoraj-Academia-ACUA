import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const markerIconUrl = 'https://i.postimg.cc/SsYLhmRL/icono2mapa-removebg-preview.png'; 

const GoogleMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([9.9445886, -84.0429487], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([9.9445886, -84.0429487], {
      icon: L.icon({
        iconUrl: markerIconUrl,
        iconSize: [50, 50],  // Tamaño del icono
        iconAnchor: [25, 50],  
        popupAnchor: [0, -50] 
      })
    }).addTo(map)
      .bindPopup('Academia ACUA')
      .openPopup();
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '400px', marginBottom: '50px' }}
    ></div>
  );
};

export default GoogleMap;
