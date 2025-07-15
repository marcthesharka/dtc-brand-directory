import React, { useState } from 'react';
import { Star, Users, Instagram, Twitter, Store, ExternalLink, Badge, ChevronDown, ChevronUp, Leaf } from 'lucide-react';
import { Brand } from '../types/Brand';

interface BrandCardProps {
  brand: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getPricePointColor = (pricePoint: string) => {
    switch (pricePoint) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Mid': return 'bg-yellow-100 text-yellow-800';
      case 'Premium': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Food': return 'bg-orange-100 text-orange-800';
      case 'Beverages': return 'bg-blue-100 text-blue-800';
      case 'Snacks': return 'bg-red-100 text-red-800';
      case 'Supplements': return 'bg-green-100 text-green-800';
      case 'Condiments': return 'bg-yellow-100 text-yellow-800';
      case 'Desserts': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 overflow-hidden">
      <div className="flex items-center p-4">
        {/* Logo */}
        <div className="w-16 h-16 flex-shrink-0 mr-4">
          <img 
            src={brand.logoUrl} 
            alt={`${brand.name} logo`}
            className="w-full h-full object-cover rounded-lg border border-gray-200"
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{brand.name}</h3>
                {brand.isNew && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    <Badge className="h-3 w-3 mr-1" />
                    New
                  </span>
                )}
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{brand.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{brand.description}</p>
              
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(brand.category)}`}>
                  {brand.category}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPricePointColor(brand.pricePoint)}`}>
                  {brand.pricePoint}
                </span>
                <span className="text-xs text-gray-500">Est. {brand.launchYear}</span>
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Instagram className="h-3 w-3" />
                  <span>{formatFollowers(brand.socialMedia.instagram)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Twitter className="h-3 w-3" />
                  <span>{formatFollowers(brand.socialMedia.twitter)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Store className="h-3 w-3" />
                  <span>{brand.retailStores.length} stores</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2 ml-4">
              <a 
                href={`https://${brand.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium px-3 py-1 rounded-md hover:bg-emerald-50 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Visit</span>
              </a>
              
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm font-medium px-3 py-1 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Leaf className="h-3 w-3" />
                <span>Details</span>
                {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded Details */}
      {showDetails && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ingredients */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <Leaf className="h-4 w-4 mr-1 text-green-600" />
                Ingredients
              </h4>
              <div className="space-y-1">
                {brand.ingredients.map((ingredient, index) => (
                  <span key={index} className="inline-block bg-white text-gray-700 px-2 py-1 rounded text-xs mr-1 mb-1 border">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Target Audience */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <Users className="h-4 w-4 mr-1 text-blue-600" />
                Target Audience
              </h4>
              <div className="space-y-2 text-xs text-gray-600">
                <div>
                  <span className="font-medium text-gray-700">Demographics:</span> {brand.targetAudience.demographics}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Lifestyle:</span> {brand.targetAudience.lifestyle}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Values:</span> {brand.targetAudience.values}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Pain Points:</span> {brand.targetAudience.painPoints.join(', ')}
                </div>
              </div>
            </div>
          </div>
          
          {/* Influencers and Retail Stores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pt-4 border-t border-gray-200">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Influencer Partners</h4>
              <div className="flex flex-wrap gap-1">
                {brand.influencers.map((influencer, index) => (
                  <span key={index} className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    {influencer}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Available At</h4>
              <div className="flex flex-wrap gap-1">
                {brand.retailStores.map((store, index) => (
                  <span key={index} className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
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