// src/pages/Carrito.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export const Carrito = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => {
    const price = item.isOffer && item.offerPrice ? item.offerPrice : item.price;
    return acc + price * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="card p-5 border-0 shadow-sm mx-auto" style={{ backgroundColor: '#171226', maxWidth: '600px' }}>
          <i className="bi bi-cart-x text-warning display-1 mb-3"></i>
          <h2 className="h4 fw-bold text-white mb-3">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">Parece que aún no has añadido ningún videojuego a tu carrito.</p>
          <Link to="/" className="btn btn-primary fw-bold btn-lg">
            Explorar Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="h3 fw-bold mb-4 text-white">
        <i className="bi bi-cart-fill me-2 text-warning"></i>Carrito de Compras
      </h1>

      <div className="row g-4">
        {/* Tabla de Productos en el Carrito */}
        <div className="col-lg-8">
          <div className="card p-4 border-0 shadow-sm overflow-hidden" style={{ backgroundColor: '#171226' }}>
            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle mb-0" style={{ backgroundColor: '#171226' }}>
                <thead>
                  <tr className="border-bottom border-secondary text-warning">
                    <th>Producto</th>
                    <th>Precio</th>
                    <th className="text-center">Cantidad</th>
                    <th>Subtotal</th>
                    <th className="text-end">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const itemPrice = item.isOffer && item.offerPrice ? item.offerPrice : item.price;
                    const subtotal = itemPrice * item.quantity;

                    return (
                      <tr key={item.id} className="border-bottom border-secondary">
                        <td>
                          <div className="fw-bold text-white">{item.title}</div>
                          <small className="badge bg-secondary">{item.platform}</small>
                        </td>
                        <td className="fw-semibold text-light">
                          ${itemPrice.toLocaleString('cl-CL')}
                        </td>
                        <td>
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <button
                              className="btn btn-sm btn-outline-light"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="fw-bold px-2 text-white">{item.quantity}</span>
                            <button
                              className="btn btn-sm btn-outline-light"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="fw-bold text-success">
                          ${subtotal.toLocaleString('cl-CL')}
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeFromCart(item.id)}
                            title="Eliminar producto"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-2 border-top border-secondary d-flex justify-content-between align-items-center">
              <button
                className="btn btn-outline-warning btn-sm fw-bold"
                onClick={clearCart}
              >
                <i className="bi bi-trash me-1"></i> Vaciar Carrito
              </button>
              <Link to="/" className="btn btn-outline-light btn-sm">
                <i className="bi bi-arrow-left me-1"></i> Seguir Comprando
              </Link>
            </div>
          </div>
        </div>

        {/* Resumen del Pedido */}
        <div className="col-lg-4">
          <div className="card p-4 border-0 shadow-sm" style={{ backgroundColor: '#171226' }}>
            <h2 className="h5 fw-bold mb-3 text-warning">Resumen del Pedido</h2>

            <div className="d-flex justify-content-between align-items-center mb-2 text-light">
              <span>Productos:</span>
              <span className="fw-bold">{cart.reduce((acc, item) => acc + item.quantity, 0)} items</span>
            </div>

            <hr className="border-secondary my-3" />

            <div className="d-flex justify-content-between align-items-center fs-5 fw-bold text-white mb-4">
              <span>Total:</span>
              <span className="text-warning">${total.toLocaleString('cl-CL')}</span>
            </div>

            <Link to="/checkout" className="btn btn-success btn-lg w-100 fw-bold">
              Proceder al Pago <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};