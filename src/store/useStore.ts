import { create } from 'zustand';
import { Restaurant, SortOption } from '@/types';


interface Statistics {
  count: number;
  avgRating: number;
  stdDev: number;
}

interface AppState {
  restaurants: Restaurant[];
  filteredRestaurants: Restaurant[];
  isLoading: boolean;
  selectedSort: SortOption;
  stats: Statistics | null;
  searchQuery: string;
  nearbyTopPicks: Restaurant[];

  setRestaurants: (data: Restaurant[]) => void;
  setLoading: (status: boolean) => void;
  sortRestaurants: (option: SortOption) => void;
  setStats: (stats: Statistics | null, topPicks?: Restaurant[]) => void;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  restaurants: [],
  filteredRestaurants: [],
  isLoading: false,
  selectedSort: null,
  stats: null,
  searchQuery: '',
  nearbyTopPicks: [],

  setRestaurants: (data) => set({ restaurants: data, filteredRestaurants: data }),
  setLoading: (status) => set({ isLoading: status }),
  setStats: (stats, topPicks = []) => set({ stats, nearbyTopPicks: topPicks }),
  setSearchQuery: (query) => {
    const { restaurants, selectedSort } = get();
    const lowerQuery = query.toLowerCase();
    let filtered = restaurants.filter(r => 
      r.name.toLowerCase().includes(lowerQuery) || 
      r.address.city.toLowerCase().includes(lowerQuery)
    );

    if (selectedSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    set({ searchQuery: query, filteredRestaurants: filtered });
  },

  sortRestaurants: (option) => {
    const { restaurants } = get();
    let sorted = [...restaurants];

    if (option === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating); 
    } else if (option === 'alphabetical') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    set({ filteredRestaurants: sorted, selectedSort: option });
  },
}));