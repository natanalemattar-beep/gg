'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // BUG #12: Missing page state for pagination
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []); // BUG #13: Missing dependency - should include 'page'

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // BUG #14: Hardcoded mock data instead of API call
      const mockProducts: Product[] = [
        { id: 1, name: 'Product 1', price: 29.99, description: 'High quality product' },
        { id: 2, name: 'Product 2', price: 49.99, description: 'Premium edition' },
        { id: 3, name: 'Product 3', price: 19.99, description: 'Budget friendly' },
        { id: 4, name: 'Product 4', price: 99.99, description: 'Luxury item' },
      ];
      
      // BUG #15: No error handling for API failures
      setProducts(mockProducts);
      setError('');
    } catch (err) {
      // BUG #16: Generic error message - not user friendly
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <p>Loading...</p>}

      {/* BUG #17: Grid layout not responsive - fixed width */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 280px)', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} className="card">
            {/* BUG #18: Clickable product without proper button semantics */}
            <div onClick={() => alert(`Selected: ${product.name}`)} style={{ cursor: 'pointer' }}>
              <h3>{product.name}</h3>
              {/* BUG #19: Price display without currency formatting */}
              <p className="font-bold">${product.price}</p>
              {/* BUG #20: Truncated text without ellipsis */}
              <p style={{ height: '40px', overflow: 'hidden' }}>
                {product.description}
              </p>
            </div>
            {/* BUG #21: Add to cart button with no validation */}
            <button 
              onClick={() => console.log('Added to cart')}
              style={{ marginTop: '10px', width: '100%' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* BUG #22: Pagination without proper implementation */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: '0 20px' }}>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
