import { Restaurant } from '@/types';
import { Star, MapPin, Globe, Phone, Mail, Facebook, Link as LinkIcon } from 'lucide-react';

interface Props {
  data: Restaurant;
}

export const RestaurantCard = ({ data }: Props) => {
  const { name, rating, address, contact } = data;

  const isPremium = rating === 4;

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 group ${isPremium ? 'border-yellow-200 ring-1 ring-yellow-100' : 'border-gray-100'} flex flex-col h-full">
      <div className="p-5 flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
          <div className="flex items-center text-sm text-gray-500 gap-1">
            <MapPin size={16} />
            <span>{address.city}, {address.state}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg font-bold">
          <Star size={16} fill="currentColor" />
          <span>{rating}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 w-full" />

      {/* Info Body */}
      <div className="p-5 flex-1 space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Globe size={18} className="text-blue-500" />
          <a 
            href={contact.site} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline truncate"
          >
            {contact.site}
          </a>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Mail size={18} className="text-red-500" />
          <span className="truncate">{contact.email}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Phone size={18} className="text-green-500" />
          <span>{contact.phone}</span>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Compartir</span>
        <div className="flex gap-3">
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${data.contact.site}`}
            target="_blank"
            rel="noreferrer" 
            className="text-gray-400 hover:text-blue-600 transition-colors"
            title="Compartir en Facebook"
          >
            <Facebook size={16} />
          </a>
          <button 
            className="text-gray-400 hover:text-gray-700 transition-colors"
            onClick={() => navigator.clipboard.writeText(data.contact.site)}
            title="Copy Link"
          >
            <LinkIcon size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};