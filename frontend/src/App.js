import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';

function App() {
  const [cartItems, setCartItems] = useState([]);



  const incrementQty = (productId) => {
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };
  const addToCart = (product) => {
  const exist = cartItems.find(item => item.id === product.id);
  if (exist) {
    if (exist.quantity < product.stock) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      alert("Stock maximum atteint !");
    }
  } else {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  }
  };
  const decrementQty = (productId) => {
    setCartItems(cartItems
      .map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <Link to="/">🏠 Accueil</Link>
        <Link to="/catalogue">🛒 Catalogue</Link>
        <span style={{ marginLeft: 'auto' }}>
          🧺 Total : {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} €
        </span>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={
          <Catalogue
            cartItems={cartItems}
            addToCart={addToCart}
            incrementQty={incrementQty}
            decrementQty={decrementQty}
            removeFromCart={removeFromCart}
          />
        } />
        <Route path="/product/:id" element={
          <ProductPage addToCart={addToCart} />
        } />
        <Route path="/checkout" element={
          <Checkout cartItems={cartItems} clearCart={() => setCartItems([])} />
        } />
      </Routes>
    </Router>
  );
}

export default App;
