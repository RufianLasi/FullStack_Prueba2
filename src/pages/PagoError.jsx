// src/pages/PagoError.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const PagoError = () => {
  return (
    <div className="container py-5">
      <div className="card max-w-700 mx-auto border-0 shadow p-4 text-center">
        <i className="bi bi-x-circle-fill text-danger display-1 mb-3"></i>
        <h2 className="fw-bold text-danger">No se pudo realizar el pago</h2>
        <p className="text-secondary">Hubo un problema procesando tu transacción bancaria.</p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/checkout" className="btn btn-danger fw-bold">
            Volver a Intentar
          </Link>
          <Link to="/" className="btn btn-outline-secondary">
            Ir al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};