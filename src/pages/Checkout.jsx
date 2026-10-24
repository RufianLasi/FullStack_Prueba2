import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { createOrder } from '../data/mockData';

export const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos',
    comentarios: ''
  });

  const [errors, setErrors] = useState({});
  const [cartAlert, setCartAlert] = useState('');

  const total = cart.reduce((acc, item) => {
    const price = item.isOffer && item.offerPrice ? item.offerPrice : item.price;
    return acc + price * item.quantity;
  }, 0);

  // Validación de los campos
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio.';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres.';
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es obligatorio.';
    } else if (formData.apellido.trim().length < 2) {
      newErrors.apellido = 'El apellido debe tener al menos 2 caracteres.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Ingresa un correo válido (ej. usuario@email.com).';
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es obligatoria.';
    } else if (formData.direccion.trim().length < 5) {
      newErrors.direccion = 'La dirección debe tener al menos 5 caracteres.';
    }

    if (!formData.comuna.trim()) {
      newErrors.comuna = 'La comuna es obligatoria.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSimulatePayment = (success) => {
    setCartAlert('');

    if (cart.length === 0) {
      setCartAlert('Tu carrito está vacío. Agrega juegos antes de procesar la compra.');
      return;
    }

    const isValid = validateForm();
    if (!isValid) return;
    
    if (success) {
      const order = createOrder({
        customer: formData,
        items: cart,
        total: total
      });
      clearCart();
      navigate('/pago-exito', { state: { orderId: order?.id || 'ORD-123456' } });
    } else {
      navigate('/pago-error');
    }
  };

  return (
    <div className="container py-4">
      <h1 className="h3 fw-bold mb-4 text-white">
        <i className="bi bi-credit-card-fill me-2 text-warning"></i>Finalizar Compra
      </h1>

      {cartAlert && (
        <div className="alert alert-warning d-flex align-items-center justify-content-between mb-4 shadow-sm" role="alert">
          <div>
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {cartAlert}
          </div>
          <Link to="/" className="btn btn-sm btn-dark">Ir al Catálogo</Link>
        </div>
      )}

      <div className="row g-4">
        {/* Formulario Datos de Envío */}
        <div className="col-lg-8">
          <div className="card shadow-sm p-4 border-0" style={{ backgroundColor: '#171226' }}>
            <h2 className="h5 fw-bold mb-3 text-warning">Datos de Despacho</h2>
            
            <form onSubmit={(e) => e.preventDefault()} noValidate>
              <div className="row g-3">
                {/* Nombre */}
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className={`form-control ${errors.nombre ? 'is-invalid border-danger' : ''}`}
                    placeholder="Ej. Juan"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  {errors.nombre && (
                    <div className="invalid-feedback d-block text-danger fw-semibold mt-1">
                      {errors.nombre}
                    </div>
                  )}
                </div>

                {/* Apellido */}
                <div className="col-md-6">
                  <label className="form-label">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    className={`form-control ${errors.apellido ? 'is-invalid border-danger' : ''}`}
                    placeholder="Ej. Pérez"
                    value={formData.apellido}
                    onChange={handleChange}
                  />
                  {errors.apellido && (
                    <div className="invalid-feedback d-block text-danger fw-semibold mt-1">
                      {errors.apellido}
                    </div>
                  )}
                </div>

                {/* Correo Electrónico */}
                <div className="col-12">
                  <label className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid border-danger' : ''}`}
                    placeholder="juan.perez@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback d-block text-danger fw-semibold mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Dirección */}
                <div className="col-12">
                  <label className="form-label">Dirección de Calle y Número</label>
                  <input
                    type="text"
                    name="direccion"
                    className={`form-control ${errors.direccion ? 'is-invalid border-danger' : ''}`}
                    placeholder="Av. Pedro Aguirre Cerda 1234, Depto 502"
                    value={formData.direccion}
                    onChange={handleChange}
                  />
                  {errors.direccion && (
                    <div className="invalid-feedback d-block text-danger fw-semibold mt-1">
                      {errors.direccion}
                    </div>
                  )}
                </div>

                {/* Región */}
                <div className="col-md-6">
                  <label className="form-label">Región</label>
                  <select
                    name="region"
                    className="form-select"
                    value={formData.region}
                    onChange={handleChange}
                  >
                    <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                    <option value="Valparaíso">Valparaíso</option>
                    <option value="Bío Bío">Bío Bío</option>
                  </select>
                </div>

                {/* Comuna */}
                <div className="col-md-6">
                  <label className="form-label">Comuna</label>
                  <input
                    type="text"
                    name="comuna"
                    className={`form-control ${errors.comuna ? 'is-invalid border-danger' : ''}`}
                    value={formData.comuna}
                    onChange={handleChange}
                  />
                  {errors.comuna && (
                    <div className="invalid-feedback d-block text-danger fw-semibold mt-1">
                      {errors.comuna}
                    </div>
                  )}
                </div>

                {/* Comentarios */}
                <div className="col-12">
                  <label className="form-label">Notas adicionales / Indicaciones de entrega</label>
                  <textarea
                    name="comentarios"
                    className="form-control"
                    rows="3"
                    placeholder="Dejar con el conserje..."
                    value={formData.comentarios}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Resumen de la Orden */}
        <div className="col-lg-4">
          <div className="card shadow-sm p-4 border-0 sticky-top" style={{ backgroundColor: '#171226', top: '20px' }}>
            <h2 className="h5 fw-bold mb-3 text-warning">Resumen del Pedido</h2>

            {cart.length === 0 ? (
              <p className="text-muted small">No hay juegos seleccionados.</p>
            ) : (
              cart.map((item) => {
                const itemPrice = item.isOffer && item.offerPrice ? item.offerPrice : item.price;
                return (
                  <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
                    <div>
                      <span className="fw-bold d-block text-white">{item.title}</span>
                      <small className="text-muted">Cant: {item.quantity}</small>
                    </div>
                    <span className="fw-bold text-success">${(itemPrice * item.quantity).toLocaleString('cl-CL')}</span>
                  </div>
                );
              })
            )}

            <div className="d-flex justify-content-between align-items-center fs-5 fw-bold mt-2 pt-2 text-white">
              <span>Total a pagar:</span>
              <span className="text-warning">${total.toLocaleString('cl-CL')}</span>
            </div>

            <hr className="border-secondary my-4" />

            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-success btn-lg fw-bold"
                onClick={() => handleSimulatePayment(true)}
              >
                <i className="bi bi-check-circle-fill me-2"></i>Simular Pago Exitoso
              </button>

              <button
                type="button"
                className="btn btn-outline-danger fw-bold"
                onClick={() => handleSimulatePayment(false)}
              >
                <i className="bi bi-x-circle-fill me-2"></i>Simular Pago Fallido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};