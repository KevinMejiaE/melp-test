import { Restaurant } from '@/types';

export const getDistanceFromLatLonInMeters = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; 
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; 
  return d * 1000; 
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};


export const getRestaurantsInRadius = (
  centerLat: number,
  centerLng: number,
  radiusMeters: number,
  restaurants: Restaurant[]
) => {
  return restaurants.filter((r) => {
    const distance = getDistanceFromLatLonInMeters(
      centerLat,
      centerLng,
      r.address.location.lat,
      r.address.location.lng
    );
    return distance <= radiusMeters;
  });
};

export const getAverageRating = (restaurants: Restaurant[]): number => {
  if (restaurants.length === 0) return 0;
  const sum = restaurants.reduce((acc, curr) => acc + curr.rating, 0);
  return parseFloat((sum / restaurants.length).toFixed(2));
};

export const getStandardDeviation = (restaurants: Restaurant[]): number => {
  if (restaurants.length === 0) return 0;
  const mean = getAverageRating(restaurants);
  const squareDiffs = restaurants.map((r) => {
    const diff = r.rating - mean;
    return diff * diff;
  });
  const avgSquareDiff =
    squareDiffs.reduce((acc, curr) => acc + curr, 0) / restaurants.length;
  return parseFloat(Math.sqrt(avgSquareDiff).toFixed(2));
};