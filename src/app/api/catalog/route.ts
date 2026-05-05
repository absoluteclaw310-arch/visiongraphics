import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const productsDir = path.join(process.cwd(), 'shop', 'products');
    
    // Check if the directory exists
    try {
      await fs.access(productsDir);
    } catch {
      return NextResponse.json({ items: [] });
    }

    const files = await fs.readdir(productsDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    const items = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(productsDir, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
      })
    );
    
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching local catalog:', error);
    return NextResponse.json({ error: 'Failed to fetch catalog' }, { status: 500 });
  }
}
