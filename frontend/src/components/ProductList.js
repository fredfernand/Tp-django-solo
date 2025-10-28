import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Erreur de chargement des produits :", err));
  }, []);

  return (
    <div>
      <h2>🛒 Nos produits</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {products.map(product => (
          <div key={product.id} style={{
            border: '1px solid #ccc',
            padding: '10px',
            width: '250px',
            borderRadius: '8px',
            background: '#f0f0f0'
          }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>{product.price} €</strong></p>
            <p>Stock : {product.stock}</p>
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              style={{
                backgroundColor: product.stock <= 0 ? '#ccc' : '#28a745',
                cursor: product.stock <= 0 ? 'not-allowed' : 'pointer',
                color: 'white',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              {product.stock <= 0 ? 'Stock épuisé' : 'Ajouter au panier 🛒'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
