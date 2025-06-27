import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface OrderForm {
  name: string;
  email: string;
  address: string;
  phone: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!orderForm.name || !orderForm.email || !orderForm.address || !orderForm.phone) {
      alert('Please fill in all fields');
      return;
    }

    // Clear cart
    localStorage.removeItem('cart');
    setCartItems([]);

    // Show success message
    alert('Order placed successfully!');
    setShowOrderForm(false);
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <h2>Your cart is empty</h2>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => navigate('/products')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shopping Cart</h2>
      
      {!showOrderForm ? (
        <>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          style={{ width: '50px', marginRight: '10px' }}
                        />
                        {item.title}
                      </div>
                    </td>
                    <td>${item.price}</td>
                    <td>
                      <div className="input-group" style={{ width: '120px' }}>
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <input 
                          type="text" 
                          className="form-control text-center" 
                          value={item.quantity}
                          readOnly
                        />
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row justify-content-end">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Cart Summary</h5>
                  <p className="card-text">Total: ${calculateTotal().toFixed(2)}</p>
                  <button 
                    className="btn btn-primary w-100"
                    onClick={() => setShowOrderForm(true)}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Details</h5>
                <form onSubmit={handleSubmitOrder}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={orderForm.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={orderForm.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={orderForm.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={orderForm.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Place Order
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowOrderForm(false)}
                    >
                      Back to Cart
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;