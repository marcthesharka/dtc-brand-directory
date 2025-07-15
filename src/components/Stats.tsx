import React from 'react';
import { TrendingUp, Package, Star, Calendar } from 'lucide-react';
import { Brand } from '../types/Brand';

interface StatsProps {
  brands: Brand[];
  filteredBrands: Brand[];
}

const Stats: React.FC<StatsProps> = ({ brands, filteredBrands }) => {
  const newBrands = brands.filter(brand => brand.isNew).length;
  const averageRating = brands.reduce((sum, brand) => sum + brand.rating, 0) / brands.length;
  const currentYear = new Date().getFullYear();
  const recentBrands = brands.filter(brand => brand.launchYear >= currentYear - 1).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mx-auto mb-3">
            <Package className="h-6 w-6 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{filteredBrands.length}</div>
          <div className="text-sm text-gray-500">Total Brands</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{newBrands}</div>
          <div className="text-sm text-gray-500">New Brands</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-3">
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
          <div className="text-sm text-gray-500">Avg Rating</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
            <Calendar className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{recentBrands}</div>
          <div className="text-sm text-gray-500">Recent Launches</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;