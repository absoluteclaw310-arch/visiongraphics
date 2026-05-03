import { NextResponse } from 'next/server';
import { squareClient } from '@/lib/square/client';

export async function GET() {
  try {
    const response = await squareClient.catalog.list();
    
    // Extract items from the catalog response
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let items: any[] = [];
    for await (const obj of response) {
      if (obj.type === 'ITEM') {
        items.push(obj);
      }
    }
    
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching Square catalog:', error);
    return NextResponse.json({ error: 'Failed to fetch catalog' }, { status: 500 });
  }
}
