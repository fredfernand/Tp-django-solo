import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductPage({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}/`)
      .then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/catalogue">⬅️ Retour au catalogue</Link>
      <h2>{product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <p style={{ marginTop: '1rem' }}>{product.description}</p>
      <p><strong>{product.price} €</strong></p>
      <button
        onClick={() => addToCart(product)}
        style={{
          backgroundColor: '#28a745',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        Ajouter au panier 🛒
      </button>
    </div>
  );
}

export default ProductPage;
