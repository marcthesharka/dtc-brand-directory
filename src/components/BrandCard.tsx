import React, { useState } from 'react';
import { Star, Users, Instagram, Twitter, Store, ExternalLink, ChevronDown, ChevronUp, Leaf } from 'lucide-react';
import { Brand } from '../types/Brand';

interface BrandCardProps {
  brand: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getPricePointColor = (pricePoint: string) => {
    switch (pricePoint) {
      case 'Low': return 'bg-green-100 text-green-700';
      case 'Mid': return 'bg-yellow-100 text-yellow-700';
      case 'Premium': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Food': return 'bg-orange-100 text-orange-700';
      case 'Beverages': return 'bg-blue-100 text-blue-700';
      case 'Snacks': return 'bg-red-100 text-red-700';
      case 'Supplements': return 'bg-green-100 text-green-700';
      case 'Condiments': return 'bg-yellow-100 text-yellow-700';
      case 'Desserts': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}k`;
    return count.toString();
  };

  return (
    <div className="bg-white hover:bg-gray-50 transition-colors duration-150">
      {/* Compact Main Row */}
      <div className="flex items-center px-4 py-2 text-sm">
        {/* Logo - Very Small */}
        <div className="w-8 h-8 flex-shrink-0 mr-3">
          <img 
            src={brand.logoUrl} 
            alt={`${brand.name} logo`}
            className="w-full h-full object-cover rounded border border-gray-200"
          />
        </div>
        
        {/* Brand Name & New Badge */}
        <div className="min-w-0 flex-1 max-w-xs">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-gray-900 truncate text-sm">{brand.name}</h3>
            {brand.isNew && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-700">
                New
              </span>
            )}
          </div>
        </div>
        
        {/* Category */}
        <div className="hidden sm:block min-w-0 flex-1 max-w-xs px-2">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(brand.category)}`}>
            {brand.category}
          </span>
        </div>
        
        {/* Price Point */}
        <div className="hidden md:block min-w-0 flex-1 max-w-xs px-2">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPricePointColor(brand.pricePoint)}`}>
            {brand.pricePoint}
          </span>
        </div>
        
        {/* Launch Year */}
        <div className="hidden lg:block min-w-0 flex-1 max-w-xs px-2 text-xs text-gray-500">
          {brand.launchYear}
        </div>
        
        {/* Rating */}
        <div className="min-w-0 flex-1 max-w-xs px-2">
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-gray-700">{brand.rating}</span>
          </div>
        </div>
        
        {/* Social Metrics */}
        <div className="hidden sm:flex min-w-0 flex-1 max-w-xs px-2 items-center space-x-3 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Instagram className="h-3 w-3" />
            <span>{formatFollowers(brand.socialMedia.instagram)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Twitter className="h-3 w-3" />
            <span>{formatFollowers(brand.socialMedia.twitter)}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-1 ml-2">
          <a 
            href={`https://${brand.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-xs font-medium px-2 py-1 rounded hover:bg-emerald-50 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            <span className="hidden sm:inline">Visit</span>
          </a>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-xs font-medium px-2 py-1 rounded hover:bg-gray-50 transition-colors"
          >
            <Leaf className="h-3 w-3" />
            <span className="hidden sm:inline">Details</span>
            {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>
      </div>
      
      {/* Expanded Details */}
      {showDetails && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          {/* Description */}
          <div className="mb-3">
            <p className="text-sm text-gray-600 leading-relaxed">{brand.description}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            {/* Ingredients */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                <Leaf className="h-3 w-3 mr-1 text-green-600" />
                Ingredients
              </h4>
              <div className="flex flex-wrap gap-1">
                {brand.ingredients.map((ingredient, index) => (
                  <span key={index} className="inline-block bg-white text-gray-600 px-2 py-1 rounded text-xs border">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Target Audience */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                <Users className="h-3 w-3 mr-1 text-blue-600" />
                Target Audience
              </h4>
              <div className="space-y-1 text-xs text-gray-600">
                <div><span className="font-medium text-gray-700">Demographics:</span> {brand.targetAudience.demographics}</div>
                <div><span className="font-medium text-gray-700">Lifestyle:</span> {brand.targetAudience.lifestyle}</div>
                <div><span className="font-medium text-gray-700">Values:</span> {brand.targetAudience.values}</div>
                <div><span className="font-medium text-gray-700">Pain Points:</span> {brand.targetAudience.painPoints.join(', ')}</div>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-200">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Influencer Partners</h4>
              <div className="flex flex-wrap gap-1">
                {brand.influencers.map((influencer, index) => (
                  <span key={index} className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                    {influencer}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Available At</h4>
              <div className="flex flex-wrap gap-1">
                {brand.retailStores.map((store, index) => (
                  <span key={index} className="inline-block bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs">
                    {store}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandCard;