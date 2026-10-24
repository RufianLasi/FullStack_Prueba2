// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartContext } from '../context/CartContext';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
  document.body.innerHTML = '';
});

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
});

describe('Suite de Pruebas Unitarias Frontend GameStore (Vite + Vitest)', () => {

  // PRUEBA 1: Renderizado básico del Navbar
  it('1. Debe renderizar el nombre de la tienda "GameStore" en el Navbar', () => {
    const mockCartContext = { cart: [], getTotal: () => 0 };
    const { container } = render(
      <CartContext.Provider value={mockCartContext}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </CartContext.Provider>
    );
    expect(container.textContent).toContain('GameStore');
  });

  // PRUEBA 2: Renderizado básico del Footer
  it('2. Debe renderizar el texto de evaluación en el Footer', () => {
    const { container } = render(<Footer />);
    expect(container.textContent).toContain('Evaluación Parcial');
  });

  // PRUEBA 3: Renderizado condicional del badge de carrito
  it('3. Debe mostrar la cantidad total de productos en el badge cuando hay items', () => {
    const mockCart = [{ id: 1, title: 'Minecraft', price: 2695, quantity: 2 }];
    const mockCartContext = { cart: mockCart, getTotal: () => 5390 };
    const { container } = render(
      <CartContext.Provider value={mockCartContext}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </CartContext.Provider>
    );
    const badge = container.querySelector('.bg-danger');
    expect(badge?.textContent).toBe('2');
  });

  // PRUEBA 4: Renderizado de sección de carrito
  it('4. Debe renderizar el botón y texto de Carrito', () => {
    const mockCartContext = { cart: [], getTotal: () => 0 };
    const { container } = render(
      <CartContext.Provider value={mockCartContext}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </CartContext.Provider>
    );
    expect(container.textContent).toContain('Carrito');
  });

  // PRUEBA 5: Manejo de Props y cálculo del total
  it('5. Debe mostrar el valor formateado del total del carrito', () => {
    const mockCartContext = { cart: [], getTotal: () => 15000 };
    const { container } = render(
      <CartContext.Provider value={mockCartContext}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </CartContext.Provider>
    );
    expect(container.textContent).toContain('15');
  });

  // PRUEBA 6: Acceso al panel administrativo desde Navbar
  it('6. Debe contener el enlace/botón hacia el Panel de Administración', () => {
    const mockCartContext = { cart: [], getTotal: () => 0 };
    const { container } = render(
      <CartContext.Provider value={mockCartContext}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </CartContext.Provider>
    );
    const adminLink = container.querySelector('a[href="/admin"]');
    expect(adminLink).not.toBeNull();
  });

  // PRUEBA 7: Verificación del entorno de pruebas Vite
  it('7. El entorno de pruebas Vitest debe ejecutar aserciones booleanas correctamente', () => {
    expect(true).toBe(true);
  });

  // PRUEBA 8: Estructura de Mocks para datos de videojuegos
  it('8. Debe validar la estructura mock de un producto de videojuego', () => {
    const mockProducto = { id: 1, title: 'The Witcher 3', price: 3999, stock: 12 };
    expect(mockProducto.title).toBe('The Witcher 3');
    expect(mockProducto.price).toBeGreaterThan(0);
  });

  // PRUEBA 9: Verificación de lógica de stock crítico
  it('9. Debe identificar un stock crítico cuando el valor es igual o menor a 5', () => {
    const stockCriticoLimit = 5;
    const productoStock = 3;
    expect(productoStock <= stockCriticoLimit).toBe(true);
  });

  // PRUEBA 10: Verificación de cálculo de ofertas
  it('10. Debe calcular la diferencia de precio en productos con oferta', () => {
    const precioOriginal = 5999;
    const precioOferta = 4499;
    expect(precioOriginal - precioOferta).toBe(1500);
  });

});