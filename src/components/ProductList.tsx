"use client";

import React, { useState } from 'react';

// Define standard item type from Stripe catalog format
type ProductItem = {
  id: string;
  name: string;
  description: string | null;
  price: string;
  image: string | null;
};

// Define cart item type
type CartItem = ProductItem & {
  quantity: number;
};

export default function ProductList({ items }: { items: ProductItem[] }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter((item) => item.quantity > 0);
    });
  };

  const cartTotal = cart.reduce((total, item) => {
    return total + (parseFloat(item.price) * item.quantity);
  }, 0);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-primary text-blue-900">Our Catalog</h1>
        <button 
          onClick={() => setCartOpen(true)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center transition"
        >
          🛒 Cart ({cartItemCount})
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center border">
          <h2 className="text-2xl mb-2 text-gray-600">No products found.</h2>
          <p className="text-gray-500">Your Stripe catalog might be empty or syncing.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-md border hover:border-blue-400 transition flex flex-col">
              <h3 className="text-xl font-bold mb-2 font-primary">{item.name || 'Unnamed Item'}</h3>
              {item.description && (
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                  {item.description}
                </p>
              )}
              <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-bold text-green-700">${item.price}</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-500 transition text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide-out Cart Overlay */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 flex justify-end transition-opacity" onClick={() => setCartOpen(false)}>
          <div 
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-50 animate-slide-in-right" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cart Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold font-primary">Your Cart</h2>
              <button 
                onClick={() => setCartOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-grow pr-4">
                        <h4 className="font-bold text-gray-800">{item.name}</h4>
                        <p className="text-gray-500 text-sm">${item.price} each</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                        >-</button>
                        <span className="w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                        >+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-600">Subtotal</span>
                  <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition shadow-md">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}