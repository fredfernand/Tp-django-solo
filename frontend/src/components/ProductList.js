import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories/')
      .then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    let url = 'http://localhost:8000/api/products/?';
    if (selectedCategory) url += `category=${selectedCategory}&`;
    if (minPrice) url += `price__gte=${minPrice}&`;
    if (maxPrice) url += `price__lte=${maxPrice}&`;

    axios.get(url)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Erreur chargement produits :", err));
  }, [selectedCategory, minPrice, maxPrice]);

  return (
    <div>
      <h2>🛒 Nos produits</h2>

      <div style={{ marginBottom: '1rem' }}>
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
          <option value="">Toutes les catégories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Prix min"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          style={{ marginLeft: '1rem' }}
        />
        <input
          type="number"
          placeholder="Prix max"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          style={{ marginLeft: '1rem' }}
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {products.map(product => (
          <div key={product.id} style={{
            border: '1px solid #ccc',
            padding: '10px',
            width: '250px',
            borderRadius: '8px',
            background: '#f0f0f0'
          }}>
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <h3>{product.name}</h3>
            </Link>
            <p>{product.description}</p>
            <p><strong>{product.price} €</strong></p>
            <button
              onClick={() => addToCart(product)}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Ajouter au panier 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
