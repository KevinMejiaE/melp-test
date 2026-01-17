'use client'; 

import { MapContainer as LMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { Restaurant } from '@/types';
import { DEFAULT_MARKER_ICON } from '@/constants/mapIcons';
import { LocationMarker } from './LocationMarker';
import { useStore } from '@/store/useStore';

interface Props {
  restaurants: Restaurant[];
  center?: [number, number]; // Lat, Lng
}

const MapContainer = ({ restaurants, center = [19.4326, -99.1332] }: Props) => {
  const { stats, nearbyTopPicks, setStats } = useStore();

return (
    <div className="flex flex-col gap-4 h-full w-full">
      
      {/* MAPA */}
      <div className="relative flex-1 min-h-[350px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        
        {/* Panel de Estadísticas */}
        {stats && (
          <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-blue-100 min-w-[200px] animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
              <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wider">
                Zona (250m)
              </h4>
              <button 
                onClick={() => setStats(null, [])} 
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100"
                title="Cerrar análisis"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Encontrados:</span>
                <span className="font-bold text-blue-600">{stats.count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Promedio:</span>
                <span className="font-bold text-yellow-600">{stats.avgRating} ★</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Desviación:</span>
                <span className="font-mono text-gray-700">{stats.stdDev}</span>
              </div>
            </div>
          </div>
        )}

        <LMap center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          {restaurants.map((rest) => (
            <Marker 
              key={rest.id} 
              position={[rest.address.location.lat, rest.address.location.lng]}
              icon={DEFAULT_MARKER_ICON}
            >
              <Popup>
                <div className="font-bold text-sm">{rest.name}</div>
                <div className="text-xs text-yellow-600 font-bold">Rating: {rest.rating} ★</div>
              </Popup>
            </Marker>
          ))}
        </LMap>
      </div>

      {/* TOP PICKS */}
      {stats && nearbyTopPicks.length > 0 && (
        <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm animate-in fade-in slide-in-from-bottom-2">
          <h5 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
            <span className="text-xl">🏆</span> Recomendaciones en la zona
          </h5>
          <ul className="space-y-2">
            {nearbyTopPicks.map(rest => (
              <li key={rest.id} className="group flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-slate-700 text-sm truncate group-hover:text-blue-600 transition-colors">
                    {rest.name}
                  </span>
                  <span className="text-[10px] text-gray-400 truncate">
                    {rest.address.street}
                  </span>
                </div>
                <span className="shrink-0 flex items-center justify-center font-bold text-xs text-white bg-yellow-400 w-8 h-6 rounded-md shadow-sm">
                  {rest.rating}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default MapContainer;