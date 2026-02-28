'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProductList from '@/components/ProductList';
import UserForm from '@/components/UserForm';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [activeTab, setActiveTab] = useState('products');
  // BUG #7: Memory leak - event listeners not cleaned up
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    // BUG #7: Missing cleanup function
    // Missing: return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container">
        {/* BUG #8: Non-responsive navigation tabs */}
        <div className="flex gap-4 py-4" style={{ width: '1200px' }}>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded ${
              activeTab === 'products' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200'
            }`}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 rounded ${
              activeTab === 'form' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200'
            }`}
          >
            Register
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded ${
              activeTab === 'dashboard' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200'
            }`}
          >
            Dashboard
          </button>
        </div>

        <div className="py-8">
          {activeTab === 'products' && <ProductList />}
          {activeTab === 'form' && <UserForm />}
          {activeTab === 'dashboard' && <Dashboard />}
        </div>
      </div>

      {/* BUG #9: Uncontrolled infinite scroll without pagination */}
      <footer className="bg-gray-800 text-white p-4 mt-16">
        <p className="text-center">© 2024 Bug Analysis App. All rights reserved.</p>
      </footer>
    </div>
  );
}
