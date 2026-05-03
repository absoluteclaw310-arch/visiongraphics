"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function MembershipPage() {
  const [memberType, setMemberType] = useState<'retail' | 'wholesale'>('retail');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-secondary flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b py-4 px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-700 font-primary">
          Vision Graphics
        </Link>
        <div className="space-x-6 hidden md:flex">
          <Link href="/#products" className="hover:text-blue-600 transition">Products</Link>
          <Link href="/#about" className="hover:text-blue-600 transition">About</Link>
          <Link href="/#contact" className="hover:text-blue-600 transition">Contact</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-6">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border max-w-2xl w-full">
          <h1 className="text-3xl font-bold mb-8 text-center font-primary text-blue-800">Become a Member</h1>
          
          {/* Toggle Buttons */}
          <div className="flex justify-center mb-8 bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setMemberType('retail')}
              className={`flex-1 py-3 rounded-md font-bold transition-colors ${memberType === 'retail' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Retail Member
            </button>
            <button 
              onClick={() => setMemberType('wholesale')}
              className={`flex-1 py-3 rounded-md font-bold transition-colors ${memberType === 'wholesale' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Wholesale Member
            </button>
          </div>

          {/* Forms */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {memberType === 'wholesale' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Business Name *</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>
            )}
            
            {memberType === 'wholesale' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tax ID / EIN *</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{memberType === 'wholesale' ? 'Contact Name' : 'Full Name'} *</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
              <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
            </div>

            {memberType === 'wholesale' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password *</label>
                <input type="password" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>
            )}

            <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition shadow-md mt-4">
              Register as {memberType === 'wholesale' ? 'Wholesale' : 'Retail'} Member
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}