"use client";

import React, { useState, useEffect } from 'react';

type ProductOption = {
  size: string;
  price: number;
};

type ProductItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  photo: string;
  options: ProductOption[];
};

type CartItem = {
  cartId: string;
  productId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
};

// Component to handle individual product rendering to manage its own selected size state
function ProductCard({ item, onAddToCart }: { item: ProductItem, onAddToCart: (item: ProductItem, option: ProductOption) => void }) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  
  // Safe fallback if options are missing or empty
  if (!item.options || item.options.length === 0) return null;
  
  const selectedOption = item.options[selectedOptionIndex];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border hover:border-blue-400 transition flex flex-col">
      <h3 className="text-xl font-bold mb-2 font-primary">{item.name}</h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
        {item.description}
      </p>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Size</label>
        <select 
          className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          value={selectedOptionIndex}
          onChange={(e) => setSelectedOptionIndex(Number(e.target.value))}
        >
          {item.options.map((opt, idx) => (
            <option key={idx} value={idx}>
              {opt.size}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-lg font-bold text-green-700">${selectedOption.price.toFixed(2)}</span>
        <button 
          onClick={() => onAddToCart(item, selectedOption)}
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-500 transition text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function ProductList({ items }: { items: ProductItem[] }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('vision_graphics_cart_v2');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('vision_graphics_cart_v2', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: ProductItem, option: ProductOption) => {
    const cartId = `${product.id}-${option.size}`;
    
    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) => 
          i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { 
        cartId,
        productId: product.id,
        name: product.name,
        size: option.size,
        price: option.price,
        quantity: 1 
      }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.cartId === cartId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter((item) => item.quantity > 0);
    });
  };

  const cartTotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        alert('Checkout via Stripe requires product price IDs. (Currently mock setup).');
        setIsCheckingOut(false);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during checkout.');
      setIsCheckingOut(false);
    }
  };

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

            {(!items || items.length === 0) ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center border">
          <h2 className="text-2xl mb-2 text-gray-600">No products found.</h2>
          <p className="text-gray-500">The local shop directory might be empty.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {["Die-Cut Vinyl", "Printable Vinyl", "Laminate", "Window Film", "Tools"].map(category => {
            const categoryItems = items
              .filter(item => item.categoryId === category)
              .sort((a, b) => {
                const minPriceA = Math.min(...a.options.map(o => o.price));
                const minPriceB = Math.min(...b.options.map(o => o.price));
                return minPriceA - minPriceB;
              });

            if (categoryItems.length === 0) return null;

            return (
              <div key={category}>
                <h2 className="text-2xl font-bold font-primary text-blue-800 mb-6 border-b pb-2">{category}</h2>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categoryItems.map((item) => (
                    <ProductCard key={item.id} item={item} onAddToCart={addToCart} />
                  ))}
                </div>
              </div>
            );
          })}
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
                    <div key={item.cartId} className="flex justify-between items-center">
                      <div className="flex-grow pr-4">
                        <h4 className="font-bold text-gray-800">{item.name}</h4>
                        <p className="text-gray-500 text-sm">Size: {item.size}</p>
                        <p className="text-gray-500 text-sm">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                        >-</button>
                        <span className="w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartId, 1)}
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
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition shadow-md disabled:bg-blue-400"
                >
                  {isCheckingOut ? 'Redirecting...' : 'Checkout'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}