import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, incrementQty, decrementQty, removeFromCart }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>🧺 Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} style={{ marginBottom: '1rem' }}>
                <strong>{item.name}</strong> – {item.price} €
                <br />
                Quantité : <strong>{item.quantity}</strong>
                <div style={{ marginTop: '0.5rem' }}>
                  <button
                    onClick={() => {
                      if (item.quantity < item.stock) {
                        incrementQty(item.id);
                      } else {
                        alert("Stock maximum atteint pour ce produit.");
                      }
                    }}
                  >
                    ➕
                  </button>
                  <button onClick={() => decrementQty(item.id)} style={{ margin: '0 0.5rem' }}>➖</button>
                  <button onClick={() => removeFromCart(item.id)} style={{ color: 'red' }}>🗑️ Supprimer</button>
                </div>
              </li>
            ))}
          </ul>

          <h3>Total : {total.toFixed(2)} €</h3>

          <Link to="/checkout">
            <button
              style={{
                marginTop: '1rem',
                backgroundColor: '#7209b7',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Passer commande 🧾
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
