import React from 'react';
import Link from 'next/link';

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
        <h1 className="text-4xl font-bold mb-8 font-primary text-blue-900">Our Catalog</h1>
        
        {items.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center border">
            <h2 className="text-2xl mb-2 text-gray-600">No products found.</h2>
            <p className="text-gray-500">Your Square catalog might be empty or syncing.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {items.map((item: { id: string; itemData?: any }) => {
              const itemData = item.itemData;
              const priceMoney = itemData?.variations?.[0]?.itemVariationData?.priceMoney;
              const price = priceMoney ? (Number(priceMoney.amount) / 100).toFixed(2) : 'N/A';

              return (
                <div key={item.id} className="bg-white p-6 rounded-xl shadow-md border hover:border-blue-400 transition flex flex-col">
                  <h3 className="text-xl font-bold mb-2 font-primary">{itemData?.name || 'Unnamed Item'}</h3>
                  {itemData?.description && (
                    <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                      {itemData.description}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-green-700">${price}</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-500 transition text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}