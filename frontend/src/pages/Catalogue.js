import React from 'react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

const Catalogue = ({ cartItems, addToCart, incrementQty, decrementQty, removeFromCart }) => {
  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
      <div style={{ flex: 2 }}>
        <ProductList addToCart={addToCart} />
      </div>
      <div style={{ flex: 1 }}>
        <Cart
          cartItems={cartItems}
          incrementQty={incrementQty}
          decrementQty={decrementQty}
          removeFromCart={removeFromCart}
        />
      </div>
    </div>
  );
};

export default Catalogue;
