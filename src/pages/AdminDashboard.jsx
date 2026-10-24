import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, getOrders } from '../data/mockData';

export const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const initialFormState = {
    title: '',
    platform: 'PS5',
    price: '',
    offerPrice: '',
    isOffer: false,
    stock: '',
    category: 'Acción',
    description: '',
    image: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const refreshData = () => {
    setProducts(getProducts());
    setOrders(getOrders());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // validar todos los campos del formulario
  const validateForm = () => {
    const newErrors = {};

    // Validar Título
    if (!formData.title.trim()) {
      newErrors.title = 'El título del juego es obligatorio.';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres.';
    }

    // Validar Precio
    if (!formData.price && formData.price !== 0) {
      newErrors.price = 'El precio es obligatorio.';
    } else if (Number(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser un número mayor a 0.';
    }

    // Validar Stock
    if (formData.stock === '' || formData.stock === null) {
      newErrors.stock = 'El stock es obligatorio.';
    } else if (Number(formData.stock) < 0 || !Number.isInteger(Number(formData.stock))) {
      newErrors.stock = 'El stock debe ser un entero mayor o igual a 0.';
    }

    // Validar Categoría
    if (!formData.category.trim()) {
      newErrors.category = 'La categoría es obligatoria.';
    }

    // Validar Imagen
    if (!formData.image.trim()) {
      newErrors.image = 'La URL de la imagen es obligatoria.';
    } else {
      try {
        new URL(formData.image);
      } catch (_) {
        newErrors.image = 'Ingresa una URL válida (ej. https://...)';
      }
    }

    // Validar Oferta (si aplica)
    if (formData.isOffer) {
      if (!formData.offerPrice && formData.offerPrice !== 0) {
        newErrors.offerPrice = 'Ingresa el precio de oferta.';
      } else if (Number(formData.offerPrice) <= 0) {
        newErrors.offerPrice = 'El precio de oferta debe ser mayor a 0.';
      } else if (Number(formData.offerPrice) >= Number(formData.price)) {
        newErrors.offerPrice = 'El precio de oferta debe ser menor al precio normal.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: updatedValue
    });

    // Limpiar mensaje de error del campo que se está modificando
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Detener el envío si hay errores
    }

    const formattedProduct = {
      ...formData,
      price: Number(formData.price),
      offerPrice: formData.isOffer && formData.offerPrice ? Number(formData.offerPrice) : null,
      stock: Number(formData.stock)
    };

    if (editingId) {
      updateProduct(editingId, formattedProduct);
      setEditingId(null);
    } else {
      addProduct(formattedProduct);
    }

    setFormData(initialFormState);
    setErrors({});
    refreshData();
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setErrors({});
    setFormData({
      title: product.title || '',
      platform: product.platform || 'PS5',
      price: product.price || '',
      offerPrice: product.offerPrice || '',
      isOffer: !!product.isOffer,
      stock: product.stock || '',
      category: product.category || 'Acción',
      description: product.description || '',
      image: product.image || ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      deleteProduct(id);
      refreshData();
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setErrors({});
    setFormData(initialFormState);
  };

  const criticalStockCount = products.filter(p => p.stock <= 5).length;

  return (
    <div className="container py-4">
      <h1 className="h3 fw-bold mb-4 text-white">
        <i className="bi bi-speedometer2 me-2 text-warning"></i>Panel de Administración
      </h1>

      {/* Métricas rápidas */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card p-3 border-0 shadow-sm" style={{ backgroundColor: '#171226' }}>
            <span className="text-muted small fw-bold text-uppercase">Total Productos</span>
            <span className="fs-2 fw-bold text-warning">{products.length}</span>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 border-0 shadow-sm" style={{ backgroundColor: '#171226' }}>
            <span className="text-muted small fw-bold text-uppercase">Stock Crítico</span>
            <span className="fs-2 fw-bold text-danger">{criticalStockCount}</span>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 border-0 shadow-sm" style={{ backgroundColor: '#171226' }}>
            <span className="text-muted small fw-bold text-uppercase">Órdenes Realizadas</span>
            <span className="fs-2 fw-bold text-info">{orders.length}</span>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Formulario de agregar/editar */}
        <div className="col-lg-4">
          <div className="card p-4 shadow-sm border-0" style={{ backgroundColor: '#171226' }}>
            <h2 className="h5 fw-bold mb-3 text-warning">
              {editingId ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </h2>

            <form onSubmit={handleSubmit} noValidate>
              {/* Título */}
              <div className="mb-3">
                <label className="form-label">Título del Juego</label>
                <input
                  type="text"
                  name="title"
                  className={`form-control ${errors.title ? 'is-invalid border-danger' : ''}`}
                  placeholder="Ej. Cyberpunk 2077"
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && <small className="text-danger fw-semibold d-block mt-1">{errors.title}</small>}
              </div>

              {/* Plataforma */}
              <div className="mb-3">
                <label className="form-label">Plataforma</label>
                <select
                  name="platform"
                  className="form-select"
                  value={formData.platform}
                  onChange={handleChange}
                >
                  <option value="PS5">PlayStation 5 (PS5)</option>
                  <option value="Xbox">Xbox Series X/S</option>
                  <option value="Switch">Nintendo Switch</option>
                  <option value="PC">PC Gaming</option>
                </select>
              </div>

              {/* Precio y Stock */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label">Precio ($)</label>
                  <input
                    type="number"
                    name="price"
                    className={`form-control ${errors.price ? 'is-invalid border-danger' : ''}`}
                    placeholder="39990"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {errors.price && <small className="text-danger fw-semibold d-block mt-1">{errors.price}</small>}
                </div>

                <div className="col-6">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    className={`form-control ${errors.stock ? 'is-invalid border-danger' : ''}`}
                    placeholder="10"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                  {errors.stock && <small className="text-danger fw-semibold d-block mt-1">{errors.stock}</small>}
                </div>
              </div>

              {/* Categoría */}
              <div className="mb-3">
                <label className="form-label">Categoría</label>
                <input
                  type="text"
                  name="category"
                  className={`form-control ${errors.category ? 'is-invalid border-danger' : ''}`}
                  placeholder="Ej. RPG, Acción, FPS"
                  value={formData.category}
                  onChange={handleChange}
                />
                {errors.category && <small className="text-danger fw-semibold d-block mt-1">{errors.category}</small>}
              </div>

              {/* URL Imagen */}
              <div className="mb-3">
                <label className="form-label">URL de la Imagen</label>
                <input
                  type="url"
                  name="image"
                  className={`form-control ${errors.image ? 'is-invalid border-danger' : ''}`}
                  placeholder="https://..."
                  value={formData.image}
                  onChange={handleChange}
                />
                {errors.image && <small className="text-danger fw-semibold d-block mt-1">{errors.image}</small>}
              </div>

              {/* Switch de Oferta */}
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isOffer"
                  id="isOfferCheck"
                  checked={formData.isOffer}
                  onChange={handleChange}
                />
                <label className="form-check-label text-white" htmlFor="isOfferCheck">
                  ¿Está en Oferta?
                </label>
              </div>

              {/* Precio Oferta si aplica */}
              {formData.isOffer && (
                <div className="mb-3">
                  <label className="form-label">Precio Oferta ($)</label>
                  <input
                    type="number"
                    name="offerPrice"
                    className={`form-control ${errors.offerPrice ? 'is-invalid border-danger' : ''}`}
                    placeholder="19990"
                    value={formData.offerPrice}
                    onChange={handleChange}
                  />
                  {errors.offerPrice && <small className="text-danger fw-semibold d-block mt-1">{errors.offerPrice}</small>}
                </div>
              )}

              {/* Botones de Envío */}
              <div className="d-flex gap-2 mt-4">
                <button type="submit" className="btn btn-primary w-100 fw-bold">
                  {editingId ? 'Guardar Cambios' : 'Agregar Producto'}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-outline-light" onClick={handleCancelEdit}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Tabla de Productos */}
        <div className="col-lg-8">
          <div className="card p-4 shadow-sm border-0 overflow-hidden" style={{ backgroundColor: '#171226' }}>
            <h2 className="h5 fw-bold mb-3 text-warning">Inventario de Productos</h2>

            <div className="table-responsive">
              <table className="table table-dark table-hover align-middle mb-0" style={{ backgroundColor: '#171226' }}>
                <thead>
                  <tr className="border-bottom border-secondary">
                    <th>Título</th>
                    <th>Plataforma</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-bottom border-secondary">
                      <td>
                        <div className="fw-bold">{p.title}</div>
                        <small className="badge bg-secondary">{p.category}</small>
                      </td>
                      <td>
                        <span className="badge bg-dark border border-secondary">{p.platform}</span>
                      </td>
                      <td>
                        {p.isOffer && p.offerPrice ? (
                          <div>
                            <span className="text-success fw-bold me-1">${p.offerPrice.toLocaleString('cl-CL')}</span>
                            <small className="text-muted text-decoration-line-through">${p.price?.toLocaleString('cl-CL')}</small>
                          </div>
                        ) : (
                          <span className="fw-bold text-warning">${p.price?.toLocaleString('cl-CL')}</span>
                        )}
                      </td>
                      <td>
                        {p.stock <= 5 ? (
                          <span className="badge bg-danger">Crítico: {p.stock}</span>
                        ) : (
                          <span className="badge bg-success">{p.stock}</span>
                        )}
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-info me-2"
                          onClick={() => handleEdit(p)}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(p.id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};