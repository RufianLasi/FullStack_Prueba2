import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { cart, getTotal, getItemCount } = useCart();

  // Obtiene el total asegurando compatibilidad con la función del contexto o con el estado directo
  const calculateTotal = () => {
    if (typeof getTotal === 'function') {
      return getTotal();
    }
    if (Array.isArray(cart)) {
      return cart.reduce((acc, item) => {
        const price = item.isOffer && item.offerPrice !== undefined && item.offerPrice !== null
          ? item.offerPrice
          : (item.price || 0);
        return acc + price * (item.quantity || 1);
      }, 0);
    }
    return 0;
  };

  const total = calculateTotal();
  const count = typeof getItemCount === 'function' 
    ? getItemCount() 
    : (Array.isArray(cart) ? cart.reduce((acc, item) => acc + (item.quantity || 1), 0) : 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary px-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-warning" to="/">
          GameStore
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold text-warning' : ''}`} end to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold text-warning' : ''}`} to="/categorias">
                Categorías
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold text-warning' : ''}`} to="/ofertas">
                Ofertas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold text-warning' : ''}`} to="/admin">
                Admin Panel
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-2">
            <Link to="/carrito" className="btn btn-outline-warning position-relative">
              <i className="bi bi-cart3 me-1"></i> Carrito
              <span className="ms-1">${total}</span>
              {count > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;