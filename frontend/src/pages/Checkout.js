import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    const orderData = {
      items: cartItems.map(item => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    axios.post('http://localhost:8000/api/orders/', orderData)
      .then(() => {
        alert("Commande passée avec succès !");
        clearCart();
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        alert("Erreur lors de la commande. Vérifie les stocks.");
      });
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧾 Résumé de la commande</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} – {item.price} € × {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total : {total.toFixed(2)} €</h3>
      <button
        onClick={handleCheckout}
        style={{ marginTop: '1rem', backgroundColor: '#f72585', color: 'white', padding: '10px 20px' }}
      >
        Valider la commande 🚀
      </button>
    </div>
  );
};

export default Checkout;
