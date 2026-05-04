import React from 'react';
import Link from 'next/link';
import ProductList from '@/components/ProductList';

// Force dynamic rendering so it pulls fresh catalog data
export const dynamic = 'force-dynamic';

async function getProducts() {
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  // Use VERCEL_URL if available, otherwise fallback
  const host = process.env.VERCEL_URL || 'localhost:3000';
  
  try {
    const res = await fetch(`${protocol}://${host}/api/catalog`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch catalog');
    return res.json();
  } catch (error) {
    console.error(error);
    return { items: [] };
  }
}

export default async function ProductsPage() {
  const { items } = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-secondary flex flex-col">
      <nav className="bg-white shadow-sm border-b py-4 px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-700 font-primary">
          Vision Graphics
        </Link>
        <div className="space-x-6 hidden md:flex">
          <Link href="/products" className="text-blue-600 transition">Products</Link>
          <Link href="/membership" className="hover:text-blue-600 transition">Membership</Link>
        </div>
      </nav>

      <main className="flex-grow py-12 px-6 max-w-6xl mx-auto w-full">
        <ProductList items={items} />
      </main>
    </div>
  );
}