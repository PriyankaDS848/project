import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    // Get existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingProduct = existingCart.find((item: any) => item.id === product.id);
    
    if (existingProduct) {
      // If product exists, increment quantity
      existingProduct.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(existingCart));
    } else {
      // If product doesn't exist, add it with quantity 1
      const newCart = [...existingCart, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(newCart));
    }

    alert('Product added to cart!');
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Our Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img 
                src={product.image} 
                className="card-img-top" 
                alt={product.title}
                style={{ height: '200px', objectFit: 'contain', padding: '1rem' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description.substring(0, 100)}...</p>
                <p className="card-text"><small className="text-muted">{product.category}</small></p>
                <div className="mt-auto">
                  <p className="card-text"><strong>${product.price}</strong></p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;