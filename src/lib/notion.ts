import { Client } from '@notionhq/client';

const notion = new Client({ auth: import.meta.env.VITE_NOTION_API_KEY });

export async function fetchBrandsFromNotion() {
  const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;
  const response = await notion.databases.query({ database_id: databaseId });

  // Map Notion properties to your Brand type
  return response.results.map((page: any) => ({
    id: page.id,
    name: page.properties.Name?.title?.[0]?.plain_text || '',
    description: page.properties.Description?.rich_text?.[0]?.plain_text || '',
    category: page.properties.Category?.select?.name || '',
    pricePoint: page.properties['Price Point']?.select?.name || '',
    launchYear: page.properties['Launch Year']?.number || 0,
    website: page.properties.Website?.url || '',
    socialMedia: {
      instagram: page.properties['Instagram Followers']?.number || 0,
      twitter: page.properties['Twitter Followers']?.number || 0,
    },
    influencers: page.properties.Influencers?.multi_select?.map((i: any) => i.name) || [],
    retailStores: page.properties['Retail Stores']?.multi_select?.map((s: any) => s.name) || [],
    rating: page.properties.Rating?.number || 0,
    logoUrl: page.properties['Logo URL']?.url || '',
    ingredients: page.properties.Ingredients?.multi_select?.map((i: any) => i.name) || [],
    targetAudience: {
      demographics: page.properties['Demographics']?.rich_text?.[0]?.plain_text || '',
      lifestyle: page.properties['Lifestyle']?.rich_text?.[0]?.plain_text || '',
      values: page.properties['Values']?.rich_text?.[0]?.plain_text || '',
      painPoints: page.properties['Pain Points']?.multi_select?.map((p: any) => p.name) || [],
    },
    isNew: page.properties['Is New']?.checkbox || false,
    createdAt: page.created_time,
    updatedAt: page.last_edited_time,
  }));
}
