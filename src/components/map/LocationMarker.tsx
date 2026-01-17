import { useState, useEffect } from 'react';
import { useMapEvents, Circle, Marker, Popup } from 'react-leaflet';
import { useStore } from '@/store/useStore';
import { getRestaurantsInRadius, getAverageRating, getStandardDeviation } from '@/utils/geo';
import { LatLng } from 'leaflet';
import { DEFAULT_MARKER_ICON } from '@/constants/mapIcons';

export const LocationMarker = () => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const RADIUS_METERS = 250;
  
  const { restaurants, setStats, stats } = useStore();

  useEffect(() => {
    if (!stats) {
      setPosition(null);
    }
  }, [stats]);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      
      const inside = getRestaurantsInRadius(
        e.latlng.lat, 
        e.latlng.lng, 
        RADIUS_METERS, 
        restaurants
      );

      const avg = getAverageRating(inside);
      const std = getStandardDeviation(inside);

      const topPicks = inside
        .filter(r => r.rating >= 2) 
        .sort((a, b) => b.rating - a.rating) 
        .slice(0, 3);

      setStats({
        count: inside.length,
        avgRating: avg,
        stdDev: std
      }, topPicks);
    },
  });

  return position === null ? null : (
    <>
      <Marker position={position} icon={DEFAULT_MARKER_ICON}>
        <Popup>Centro del análisis</Popup>
      </Marker>
      <Circle 
        center={position} 
        radius={RADIUS_METERS} 
        pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }} 
      />
    </>
  );
};