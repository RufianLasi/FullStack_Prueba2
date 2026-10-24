// src/pages/Home.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { getStoredGames } from '../data/mockData';
import { CartContext } from '../context/CartContext';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("TODOS");
  const { addToCart } = useContext(CartContext);
  const location = useLocation();

  useEffect(() => {
    const loadedGames = getStoredGames();
    setProducts(Array.isArray(loadedGames) ? loadedGames : []);
  }, []);

  // Detectar cambios en la URL (/ofertas, /categorias, /)
  useEffect(() => {
    if (location.pathname === '/ofertas') {
      setFilterCategory("OFERTAS");
    } else if (location.pathname === '/categorias') {
      setFilterCategory("TODOS");
      const catalogElement = document.getElementById('catalogo');
      if (catalogElement) {
        catalogElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setFilterCategory("TODOS");
    }
  }, [location.pathname]);

  const platformMap = {
    "PlayStation 5": "PS5",
    "Xbox Series X/S": "Xbox",
    "Nintendo Switch": "Switch",
    "PC Gaming": "PC"
  };

  const filteredProducts = products.filter(p => {
    if (filterCategory === "OFERTAS") {
      return p.isOffer && p.offerPrice;
    }
    if (filterCategory === "TODOS") {
      return true;
    }
    return p.platform === platformMap[filterCategory] || p.category === filterCategory;
  });

  return (
    <div className="container py-4">
      {/* Banner Principal */}
      <div className="p-5 mb-4 bg-dark text-white rounded-3 text-center shadow-lg position-relative overflow-hidden border border-secondary">
        <div className="py-2">
          <h1 className="display-4 fw-bold text-warning">
            {filterCategory === "OFERTAS" ? "¡Especial de Ofertas!" : "¡Bienvenido a GameStore!"}
          </h1>
          <p className="fs-5 text-light">
            {filterCategory === "OFERTAS"
              ? "Aprovecha los mejores descuentos en tus videojuegos favoritos antes de que se agoten."
              : "Encuentra los mejores títulos para PS5, Xbox, Switch y PC al mejor precio."}
          </p>
        </div>
      </div>

      {/* Filtro por categorías y plataformas */}
      <div id="catalogo" className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2 pt-2">
        <h2 className="h4 fw-bold m-0 text-white">
          <i className="bi bi-grid-fill me-2 text-warning"></i>
          {filterCategory === "OFERTAS" ? "Juegos en Oferta" : "Catálogo de Videojuegos"}
        </h2>
        <div className="btn-group flex-wrap" role="group">
          {["TODOS", "PlayStation 5", "Xbox Series X/S", "Nintendo Switch", "PC Gaming", "OFERTAS"].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm ${filterCategory === cat ? 'btn-warning text-dark fw-bold' : 'btn-outline-light'}`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat === "OFERTAS" ? "Ofertas" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grilla de Productos */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredProducts.map((product) => {
          const isSale = product.isOffer && product.offerPrice;
          const finalPrice = isSale ? product.offerPrice : (product.price || 0);

          return (
            <div className="col" key={product.id}>
              <div className="card h-100 shadow-sm border-0 position-relative">
                {/* Etiqueta de Oferta */}
                {isSale && (
                  <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 rounded small fw-bold z-1">
                    ¡OFERTA!
                  </span>
                )}
                
                {/* Etiqueta de Stock Crítico */}
                {product.stock <= 5 && (
                  <span className="position-absolute top-0 end-0 bg-warning text-dark px-2 py-1 m-2 rounded small fw-bold z-1">
                    Stock Crítico
                  </span>
                )}

                {/* Imagen del juego tipo portada */}
                <img
                  src={product.image || 'https://upload.wikimedia.org/wikipedia/en/f/fb/The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg'}
                  className="card-img-top bg-dark"
                  alt={product.title}
                  style={{ height: "280px", objectFit: "cover" }}
                />

                {/* Información de la tarjeta */}
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="badge bg-secondary">{product.category || 'Juego'}</span>
                    <span className="badge bg-dark border border-secondary">{product.platform || 'General'}</span>
                  </div>

                  <h5 className="card-title h6 fw-bold text-center my-2">{product.title}</h5>

                  <div className="mt-auto pt-2">
                    <div className="d-flex justify-content-center align-items-baseline gap-2 mb-3">
                      <span className="fs-5 fw-bold text-success">
                        ${finalPrice.toLocaleString('cl-CL')}
                      </span>
                      {isSale && product.price && (
                        <span className="text-muted text-decoration-line-through small">
                          ${product.price.toLocaleString('cl-CL')}
                        </span>
                      )}
                    </div>

                    <button
                      className="btn btn-dark w-100 btn-sm fw-bold"
                      onClick={() => addToCart(product)}
                    >
                      <i className="bi bi-cart-plus me-1"></i> Añadir al Carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="col-12 text-center py-5">
            <p className="text-muted fs-5">No se encontraron juegos para esta sección.</p>
          </div>
        )}
      </div>
    </div>
  );
};