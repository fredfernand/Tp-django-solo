import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenue sur mon exercice TP solo ⚡</h1>
        <Link to="/catalogue">
          <button style={{ marginLeft: '10px', padding: '10px 15px', cursor: 'pointer' }}>
            Aller au Catalogue
          </button>
        </Link>
    </div>
  );
};

export default Home;
