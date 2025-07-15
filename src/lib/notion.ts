import { Client } from '@notionhq/client';
import { Brand } from '../types/Brand';

// Initialize Notion client
const notion = new Client({
  auth: import.meta.env.VITE_NOTION_TOKEN,
});

const DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID;

// Helper function to extract text from Notion rich text
const extractText = (richText: any[]): string => {
  if (!richText || !Array.isArray(richText)) return '';
  return richText.map(text => text.plain_text).join('');
};

// Helper function to extract number from Notion number property
const extractNumber = (numberProperty: any): number => {
  return numberProperty?.number || 0;
};

// Helper function to extract select value
const extractSelect = (selectProperty: any): string => {
  return selectProperty?.select?.name || '';
};

// Helper function to extract multi-select values
const extractMultiSelect = (multiSelectProperty: any): string[] => {
  if (!multiSelectProperty?.multi_select) return [];
  return multiSelectProperty.multi_select.map((item: any) => item.name);
};

// Helper function to extract URL from files property
const extractFileUrl = (filesProperty: any): string => {
  if (!filesProperty?.files || filesProperty.files.length === 0) return '';
  const file = filesProperty.files[0];
  return file.type === 'external' ? file.external.url : file.file.url;
};

// Helper function to extract JSON from rich text
const extractJSON = (richText: any[], fallback: any = {}): any => {
  const text = extractText(richText);
  if (!text) return fallback;
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
};

// Convert Notion page to Brand object
const notionPageToBrand = (page: any): Brand => {
  const properties = page.properties;
  
  return {
    id: page.id,
    name: extractText(properties.Name?.title || properties.name?.title || []),
    description: extractText(properties.Description?.rich_text || []),
    category: extractSelect(properties.Category) as Brand['category'] || 'Food',
    pricePoint: extractSelect(properties['Price Point'] || properties.PricePoint) as Brand['pricePoint'] || 'Mid',
    launchYear: extractNumber(properties['Launch Year'] || properties.LaunchYear) || new Date().getFullYear(),
    website: extractText(properties.Website?.rich_text || []),
    socialMedia: extractJSON(properties['Social Media']?.rich_text || [], { instagram: 0, twitter: 0 }),
    influencers: extractMultiSelect(properties.Influencers || properties.influencers),
    retailStores: extractMultiSelect(properties['Retail Stores'] || properties.RetailStores),
    rating: extractNumber(properties.Rating) || 0,
    logoUrl: extractFileUrl(properties.Logo || properties.logo) || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    ingredients: extractMultiSelect(properties.Ingredients || properties.ingredients),
    targetAudience: extractJSON(properties['Target Audience']?.rich_text || [], {
      demographics: '',
      lifestyle: '',
      values: '',
      painPoints: []
    }),
    isNew: properties['Is New']?.checkbox || false,
    createdAt: page.created_time,
    updatedAt: page.last_edited_time
  };
};

export class NotionBrandService {
  static async getAllBrands(): Promise<Brand[]> {
    try {
      const response = await notion.databases.query({
        database_id: DATABASE_ID,
        sorts: [
          {
            property: 'Created',
            direction: 'descending'
          }
        ]
      });

      return response.results.map(notionPageToBrand);
    } catch (error) {
      console.error('Error fetching brands from Notion:', error);
      return [];
    }
  }

  static async getBrandById(id: string): Promise<Brand | null> {
    try {
      const response = await notion.pages.retrieve({ page_id: id });
      return notionPageToBrand(response);
    } catch (error) {
      console.error('Error fetching brand from Notion:', error);
      return null;
    }
  }

  static async searchBrands(query: string): Promise<Brand[]> {
    try {
      const response = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
          or: [
            {
              property: 'Name',
              title: {
                contains: query
              }
            },
            {
              property: 'Description',
              rich_text: {
                contains: query
              }
            }
          ]
        }
      });

      return response.results.map(notionPageToBrand);
    } catch (error) {
      console.error('Error searching brands in Notion:', error);
      return [];
    }
  }

  static async getBrandsByCategory(category: string): Promise<Brand[]> {
    try {
      const response = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
          property: 'Category',
          select: {
            equals: category
          }
        }
      });

      return response.results.map(notionPageToBrand);
    } catch (error) {
      console.error('Error fetching brands by category from Notion:', error);
      return [];
    }
  }

  static async getBrandsByPricePoint(pricePoint: string): Promise<Brand[]> {
    try {
      const response = await notion.databases.query({
        database_id: DATABASE_ID,
        filter: {
          property: 'Price Point',
          select: {
            equals: pricePoint
          }
        }
      });

      return response.results.map(notionPageToBrand);
    } catch (error) {
      console.error('Error fetching brands by price point from Notion:', error);
      return [];
    }
  }
}