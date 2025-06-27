import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container mt-4">
      <div className="jumbotron text-center">
        <h1 className="display-4">Welcome to Our E-Commerce Store</h1>
        <p className="lead">
          Discover amazing products at great prices.
        </p>
        <hr className="my-4" />
        <p>
          Browse through our collection and find exactly what you're looking for.
        </p>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Quality Products</h5>
              <p className="card-text">We offer only the highest quality products for our customers.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Fast Shipping</h5>
              <p className="card-text">Get your orders delivered quickly and efficiently.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">24/7 Support</h5>
              <p className="card-text">Our customer support team is always here to help you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;