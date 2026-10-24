import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export const Navbar = () => {
  const context = useContext(CartContext);
  const cart = context?.cart || [];
  const getTotal = context?.getTotal;
  const getItemCount = context?.getItemCount;

  // Cantidad total de productos en el carrito
  const totalItems = typeof getItemCount === 'function'
    ? getItemCount()
    : cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Cálculo del total general respetando las pruebas unitarias y el contexto
  const calculateTotal = () => {
    if (typeof getTotal === 'function') {
      const totalFromContext = getTotal();
      if (totalFromContext !== undefined && totalFromContext !== null) {
        return totalFromContext;
      }
    }
    return cart.reduce((acc, item) => {
      const price = item.isOffer && item.offerPrice !== undefined && item.offerPrice !== null
        ? item.offerPrice
        : (item.price || 0);
      return acc + (price * (item.quantity || 1));
    }, 0);
  };

  const totalPrice = calculateTotal();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 border-bottom border-secondary">
      <div className="container">
        {/* Logo de la tienda con ícono */}
        <Link className="navbar-brand fw-bold fs-4 text-warning d-flex align-items-center gap-2" to="/">
          <i className="bi bi-controller"></i> GameStore
        </Link>

        {/* Botón Toggler para Responsive */}
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
          {/* Navegación principal */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}
                end
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}
                to="/categorias"
              >
                Categorías
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}
                to="/ofertas"
              >
                Ofertas
              </NavLink>
            </li>
          </ul>

          {/* Botones de acción del lado derecho */}
          <div className="d-flex align-items-center gap-2">
            {/* Botón Admin Panel */}
            <Link to="/admin" className="btn btn-outline-light btn-sm fw-semibold d-flex align-items-center gap-1">
              <i className="bi bi-speedometer2"></i> Admin Panel
            </Link>

            {/* Botón Carrito */}
            <Link
              to="/carrito"
              className="btn btn-purple-gamestore btn-sm fw-bold position-relative d-flex align-items-center gap-2"
            >
              <i className="bi bi-cart-fill"></i> Carrito
              <span className="badge bg-warning text-dark">
                ${totalPrice.toLocaleString('cl-CL')}
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

export default Navbar;