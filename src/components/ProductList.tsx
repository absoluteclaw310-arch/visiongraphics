"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type ProductOption = {
  size: string;
  price: number;
  stripePriceId: string | null;
};

type ProductItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  photo: string;
  options: ProductOption[];
  status?: string;
};

type CartItem = {
  cartId: string;
  productId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  stripePriceId: string | null;
};

function DigitalPlaceholder() {
  return (
    <div className="w-full h-56 md:h-72 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl mb-6 flex items-center justify-center shadow-lg overflow-hidden relative">
      <div className="text-center text-white px-6">
        <svg
          className="w-16 h-16 mx-auto mb-3 text-blue-100"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-lg font-semibold">Digital PDF Download</p>
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start">
      <svg
        className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      {children}
    </li>
  );
}

export default function ProductList({ items }: { items: ProductItem[] }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [configWarning, setConfigWarning] = useState<string | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("vision_graphics_cart_v2");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("vision_graphics_cart_v2", JSON.stringify(cart));
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
      return [
        ...prev,
        {
          cartId,
          productId: product.id,
          name: product.name,
          size: option.size,
          price: option.price,
          quantity: 1,
          stripePriceId: option.stripePriceId,
        },
      ];
    });

    setAddedId(cartId);
    setCartOpen(true);
    setTimeout(() => setAddedId(null), 1200);
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQuantity = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const removeItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data);
        setConfigWarning(data.error || "Checkout failed. Please try again.");
        setIsCheckingOut(false);
      }
    } catch (err) {
      console.error(err);
      setConfigWarning("An error occurred during checkout.");
      setIsCheckingOut(false);
    }
  };

  const cartTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  if (!items || items.length === 0) {
    return (
      <div className="py-12 px-6 text-center max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <h2 className="text-2xl mb-2 text-gray-600">No products found.</h2>
          <p className="text-gray-500">
            The product catalog is currently being configured.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 text-blue-600 hover:underline font-medium"
          >
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const product = items[0];
  const option = product.options[0] || {
    size: "Digital PDF",
    price: 29.99,
    stripePriceId: null,
  };

  const hasPriceId = Boolean(option.stripePriceId);

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
          {product.photo ? (
            <div className="relative w-full h-56 md:h-72 bg-gray-100">
              <Image
                src={product.photo}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : (
            <DigitalPlaceholder />
          )}

          <div className="p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-primary text-blue-900">
              {product.name}
            </h1>

            <p className="text-lg text-gray-700 mb-6">{product.description}</p>

            <ul className="space-y-2 text-gray-700 mb-8">
              <Bullet>60-page actionable playbook</Bullet>
              <Bullet>Instant PDF download after purchase</Bullet>
              <Bullet>No shipping — access anywhere</Bullet>
              <Bullet>One-time payment, lifetime access</Bullet>
            </ul>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6">
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-500">One-time digital download</p>
                <p className="text-4xl font-bold text-blue-700">
                  ${option.price.toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => addToCart(product, option)}
                  disabled={!hasPriceId}
                  className="bg-white border-2 border-blue-700 text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    addToCart(product, option);
                    setCartOpen(true);
                  }}
                  disabled={!hasPriceId}
                  className="bg-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now — ${option.price.toFixed(2)}
                </button>
              </div>
            </div>

            {!hasPriceId && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
                ⚠️ Checkout is not yet configured. Please set{" "}
                <strong>STRIPE_PDF_PRICE_ID</strong> in your Vercel
                environment variables.
              </div>
            )}

            {configWarning && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                {configWarning}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Added-to-cart toast */}
      {addedId && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Added to cart ✓
        </div>
      )}

      {/* Slide-out Cart Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 flex justify-end"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold font-primary">Your Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                  <p>Your cart is empty.</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-4 text-blue-600 hover:underline"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      key={item.cartId}
                      className="flex justify-between items-start"
                    >
                      <div className="flex-grow pr-4">
                        <h4 className="font-bold text-gray-800">{item.name}</h4>
                        <p className="text-gray-500 text-sm">
                          {item.size} download
                        </p>
                        <p className="text-gray-500 text-sm">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.cartId, -1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className="w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.cartId)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-600">Total</span>
                  <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Instant digital delivery. No shipping.
                </p>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition shadow-md disabled:bg-blue-400"
                >
                  {isCheckingOut ? "Redirecting..." : "Checkout"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
