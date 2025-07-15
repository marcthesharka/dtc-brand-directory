/*
  # Create brands table for DTC food & drink directory

  1. New Tables
    - `brands`
      - `id` (uuid, primary key)
      - `name` (text, brand name)
      - `description` (text, brand description)
      - `category` (text, food/drink category)
      - `price_point` (text, low/mid/premium)
      - `launch_year` (integer, year established)
      - `website` (text, brand website)
      - `social_media` (jsonb, instagram/twitter followers)
      - `influencers` (text[], array of influencer handles)
      - `retail_stores` (text[], array of retail store names)
      - `rating` (decimal, consumer rating)
      - `logo_url` (text, brand logo image URL)
      - `ingredients` (text[], array of ingredients)
      - `target_audience` (jsonb, AI-generated audience profile)
      - `is_new` (boolean, new brand flag)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `brands` table
    - Add policies for public read access
    - Add policies for authenticated users to manage brands

  3. Indexes
    - Add indexes for common query patterns (category, price_point, launch_year)
    - Add full-text search index for name and description
*/

CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('Food', 'Beverages', 'Snacks', 'Supplements', 'Condiments', 'Desserts')),
  price_point text NOT NULL CHECK (price_point IN ('Low', 'Mid', 'Premium')),
  launch_year integer NOT NULL CHECK (launch_year >= 1900 AND launch_year <= EXTRACT(YEAR FROM CURRENT_DATE) + 5),
  website text NOT NULL,
  social_media jsonb NOT NULL DEFAULT '{"instagram": 0, "twitter": 0}',
  influencers text[] DEFAULT '{}',
  retail_stores text[] DEFAULT '{}',
  rating decimal(2,1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
  logo_url text NOT NULL,
  ingredients text[] DEFAULT '{}',
  target_audience jsonb NOT NULL DEFAULT '{"demographics": "", "lifestyle": "", "values": "", "painPoints": []}',
  is_new boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view brands"
  ON brands
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert brands"
  ON brands
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update brands"
  ON brands
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete brands"
  ON brands
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_brands_category ON brands(category);
CREATE INDEX IF NOT EXISTS idx_brands_price_point ON brands(price_point);
CREATE INDEX IF NOT EXISTS idx_brands_launch_year ON brands(launch_year);
CREATE INDEX IF NOT EXISTS idx_brands_rating ON brands(rating);
CREATE INDEX IF NOT EXISTS idx_brands_is_new ON brands(is_new);
CREATE INDEX IF NOT EXISTS idx_brands_created_at ON brands(created_at);

-- Create full-text search index
CREATE INDEX IF NOT EXISTS idx_brands_search ON brands USING gin(to_tsvector('english', name || ' ' || description));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_brands_updated_at
    BEFORE UPDATE ON brands
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();