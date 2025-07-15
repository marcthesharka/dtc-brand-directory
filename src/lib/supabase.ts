import { createClient } from '@supabase/supabase-js';
import { Brand } from '../types/Brand';

// Note: These would be environment variables in production
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database service functions
export class BrandService {
  static async getAllBrands(): Promise<Brand[]> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching brands:', error);
      return [];
    }
    
    return data || [];
  }

  static async getBrandById(id: string): Promise<Brand | null> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching brand:', error);
      return null;
    }
    
    return data;
  }

  static async createBrand(brand: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>): Promise<Brand | null> {
    const { data, error } = await supabase
      .from('brands')
      .insert([brand])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating brand:', error);
      return null;
    }
    
    return data;
  }

  static async updateBrand(id: string, updates: Partial<Brand>): Promise<Brand | null> {
    const { data, error } = await supabase
      .from('brands')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating brand:', error);
      return null;
    }
    
    return data;
  }

  static async deleteBrand(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('brands')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting brand:', error);
      return false;
    }
    
    return true;
  }

  static async searchBrands(query: string): Promise<Brand[]> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error searching brands:', error);
      return [];
    }
    
    return data || [];
  }

  static async getBrandsByCategory(category: string): Promise<Brand[]> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching brands by category:', error);
      return [];
    }
    
    return data || [];
  }

  static async getBrandsByPricePoint(pricePoint: string): Promise<Brand[]> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('price_point', pricePoint)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching brands by price point:', error);
      return [];
    }
    
    return data || [];
  }
}