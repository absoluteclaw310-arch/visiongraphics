import { NextResponse } from 'next/server';
import { squareClient } from '@/lib/square/client';

export async function GET() {
  try {
    const response = await squareClient.catalogApi.listCatalog();
    
    // Extract items from the catalog response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = response.result.objects?.filter((obj: any) => obj.type === 'ITEM') || [];
    
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching Square catalog:', error);
    return NextResponse.json({ error: 'Failed to fetch catalog' }, { status: 500 });
  }
}
