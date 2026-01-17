'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useStore } from '@/store/useStore';
import { fetchRestaurants } from '@/services/api';
import { RestaurantCard } from '@/components/restaurant/RestaurantCard';
import { ArrowDownAZ, Star } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';

const MapWithNoSSR = dynamic(() => import('@/components/map/MapContainer'), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-gray-200 animate-pulse rounded-xl" />
});

export default function Home() {
  const { 
    filteredRestaurants, 
    setRestaurants, 
    sortRestaurants, 
    selectedSort,
    isLoading,
    setLoading 
  } = useStore();

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      const data = await fetchRestaurants();
      setRestaurants(data);
      setLoading(false);
    };
    initData();
  }, [setRestaurants, setLoading]);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-4 pb-6 border-b border-gray-200">
          <div className="w-full md:w-auto">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Melp <span className="text-yellow-500">Restaurantes</span>
            </h1>
            <p className="text-slate-500 font-medium">Descubre la mejor experiencia culinaria</p>
          </div>
          
          {/* Controles de Filtro */}
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto items-stretch md:items-center">
            <SearchBar />
            <button
              onClick={() => sortRestaurants('rating')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedSort === 'rating' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Star size={16} /> Rating
            </button>
            <button
              onClick={() => sortRestaurants('alphabetical')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedSort === 'alphabetical' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ArrowDownAZ size={16} /> A-Z
            </button>
          </div>
        </header>

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Mapa */}
          <section className="lg:col-span-1 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto no-scrollbar rounded-xl">
             <MapWithNoSSR restaurants={filteredRestaurants} />
          </section>

          {/* Listado */}
          <section className="lg:col-span-2">
            {isLoading ? (
              <p className="text-center text-gray-500 mt-10">Cargando comida...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRestaurants.map((rest) => (
                  <RestaurantCard key={rest.id} data={rest} />
                ))}
              </div>
            )}
            
            {!isLoading && filteredRestaurants.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-400">No se encontraron restaurantes de comida.</p>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}