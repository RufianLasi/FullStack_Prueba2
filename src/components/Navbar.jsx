// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export const Navbar = () => {
  const { cart, getTotal } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        {/* Logo / Nombre de la Tienda */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <i className="bi bi-controller text-warning me-2 fs-3"></i>
          <span>GameStore</span>
        </Link>

        {/* Botón Hamburguesa Responsivo */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Enlaces de Navegación del Cliente */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categorias">Categorías</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ofertas">Ofertas</Link>
            </li>
          </ul>

          {/* Botón de Acceso al Panel de Administración */}
          <div className="d-flex align-items-center gap-2">
            <Link to="/admin" className="btn btn-outline-light btn-sm">
              <i className="bi bi-speedometer2 me-1"></i> Admin Panel
            </Link>

            {/* Carrito de Compras */}
            <Link to="/carrito" className="btn btn-success position-relative">
              <i className="bi bi-cart-fill me-1"></i>
              Carrito
              <span className="badge bg-warning text-dark ms-2">
                ${getTotal().toLocaleString('cl-CL')}
              </span>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};