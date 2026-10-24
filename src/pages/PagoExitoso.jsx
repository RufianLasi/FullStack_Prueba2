// src/pages/PagoExitoso.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const PagoExitoso = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="container py-5">
      <div className="card max-w-700 mx-auto border-0 shadow p-4 text-center">
        <i className="bi bi-check-circle-fill text-success display-1 mb-3"></i>
        <h2 className="fw-bold text-success">¡Pago Realizado con Éxito!</h2>
        <p className="text-secondary">Código de Orden: <strong>{order?.id || 'ORDER-20261023'}</strong></p>

        {order?.customer && (
          <div className="bg-light p-3 rounded text-start my-3">
            <h6 className="fw-bold border-bottom pb-1">Datos del Envío</h6>
            <p className="mb-1"><strong>Cliente:</strong> {order.customer.nombre} {order.customer.apellidos}</p>
            <p className="mb-1"><strong>Correo:</strong> {order.customer.correo}</p>
            <p className="mb-0"><strong>Dirección:</strong> {order.customer.calle}, {order.customer.comuna}</p>
          </div>
        )}

        <div className="mt-3">
          <Link to="/" className="btn btn-warning fw-bold">
            Volver a la Tienda
          </Link>
        </div>
      </div>
    </div>
  );
};