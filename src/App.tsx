import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import BrandCard from './components/BrandCard';
import Stats from './components/Stats';
import Pagination from './components/Pagination';
import { sampleBrands } from './data/sampleBrands';
import { Brand, BrandFilters, PaginationInfo } from './types/Brand';

function App() {
  const [filters, setFilters] = useState<BrandFilters>({
    search: '',
    category: 'All',
    pricePoint: 'All',
    launchYear: 'All',
    rating: 0,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredAndSortedBrands = useMemo(() => {
    let filtered = sampleBrands.filter((brand: Brand) => {
      const matchesSearch = brand.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           brand.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                           brand.ingredients.some(ingredient => 
                             ingredient.toLowerCase().includes(filters.search.toLowerCase())
                           );
      const matchesCategory = filters.category === 'All' || brand.category === filters.category;
      const matchesPricePoint = filters.pricePoint === 'All' || brand.pricePoint === filters.pricePoint;
      const matchesLaunchYear = filters.launchYear === 'All' || brand.launchYear.toString() === filters.launchYear;
      const matchesRating = brand.rating >= filters.rating;
      
      return matchesSearch && matchesCategory && matchesPricePoint && matchesLaunchYear && matchesRating;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'launchYear':
          aValue = a.launchYear;
          bValue = b.launchYear;
          break;
        case 'followers':
          aValue = a.socialMedia.instagram + a.socialMedia.twitter;
          bValue = b.socialMedia.instagram + b.socialMedia.twitter;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (filters.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [filters]);

  const paginatedBrands = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedBrands.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedBrands, currentPage, itemsPerPage]);

  const paginationInfo: PaginationInfo = {
    currentPage,
    totalPages: Math.ceil(filteredAndSortedBrands.length / itemsPerPage),
    totalItems: filteredAndSortedBrands.length,
    itemsPerPage
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        filters={filters}
        setFilters={setFilters}
        totalBrands={sampleBrands.length}
        filteredCount={filteredAndSortedBrands.length}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Discover the Latest DTC Food & Drink Brands
          </h2>
          <p className="text-gray-600">
            Explore innovative brands that are reshaping the food and beverage industry
          </p>
        </div>
        
        <Stats brands={sampleBrands} filteredBrands={filteredAndSortedBrands} />
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {paginatedBrands.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No brands found matching your criteria.</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {paginatedBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          )}
          
          {paginatedBrands.length > 0 && (
            <Pagination
              pagination={paginationInfo}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;