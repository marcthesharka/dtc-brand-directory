# Cool Eats & Drinks - DTC Brand Directory

A comprehensive directory platform for discovering new Direct-to-Consumer (DTC) food and beverage brands. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### 🔍 Discovery & Search
- **Advanced Search**: Search by brand name, description, or ingredients
- **Smart Filtering**: Filter by category, price point, launch year, and rating
- **Sorting Options**: Sort by name, rating, launch year, or social media followers
- **Pagination**: Efficient browsing of large brand catalogs

### 📊 Brand Information
- **Comprehensive Profiles**: Detailed brand information including description, category, and pricing
- **Social Metrics**: Instagram and Twitter follower counts
- **Retail Presence**: Store availability and distribution channels
- **Consumer Ratings**: User-generated ratings and reviews

### 🧪 Detailed Product Data
- **Full Ingredient Lists**: Complete ingredient transparency
- **AI-Generated Audience Profiles**: Target demographics, lifestyle, values, and pain points
- **Influencer Partnerships**: Connected influencer and brand ambassador information
- **Launch Timeline**: Brand establishment and growth tracking

### 🎨 User Experience
- **Compact Design**: Optimized for browsing hundreds of brands
- **Logo-First Approach**: Brand recognition through logo display
- **Expandable Details**: Click to reveal detailed ingredient and audience information
- **Responsive Design**: Optimized for desktop and mobile devices

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Ready for Netlify/Vercel

## Database Schema

### Brands Table
```sql
- id (uuid, primary key)
- name (text, brand name)
- description (text, brand description)  
- category (enum: Food, Beverages, Snacks, Supplements, Condiments, Desserts)
- price_point (enum: Low, Mid, Premium)
- launch_year (integer)
- website (text)
- social_media (jsonb: instagram/twitter followers)
- influencers (text[], influencer handles)
- retail_stores (text[], store names)
- rating (decimal, 0-5 scale)
- logo_url (text, brand logo)
- ingredients (text[], full ingredient list)
- target_audience (jsonb, AI-generated profile)
- is_new (boolean, new brand flag)
- created_at/updated_at (timestamps)
```

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Environment variables configured

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env` file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup
1. Create a new Supabase project
2. Run the migration file in the Supabase SQL editor
3. The database will be automatically configured with proper RLS policies

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## Scaling Considerations

### Performance Optimization
- **Pagination**: 20 brands per page for optimal loading
- **Lazy Loading**: Images and detailed content loaded on demand
- **Efficient Queries**: Indexed database queries for fast filtering
- **Caching**: Browser caching for static assets

### Data Management
- **Bulk Import**: CSV/JSON import capabilities for large brand datasets
- **API Integration**: Ready for third-party data source integration
- **Content Moderation**: Admin tools for brand approval and management
- **Analytics**: User behavior tracking and brand performance metrics

### Future Enhancements
- **AI-Powered Recommendations**: Personalized brand suggestions
- **User Accounts**: Favorites, reviews, and personalized feeds
- **Brand Verification**: Verified brand profiles and official accounts
- **Advanced Analytics**: Market trends and brand performance insights
- **Mobile App**: Native iOS/Android applications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or support, please open an issue on GitHub or contact the development team.