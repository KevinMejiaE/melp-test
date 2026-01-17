import { Restaurant } from '@/types';

const API_URL = '/data_melp.json';

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error fetching data');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};