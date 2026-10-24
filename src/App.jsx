// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import './App.css'; // Importación de estilos globales Gamer Violeta

import { Home } from './pages/Home';
import { Carrito } from './pages/Carrito';
import { Checkout } from './pages/Checkout';
import { PagoExitoso } from './pages/PagoExitoso';
import { PagoError } from './pages/PagoError';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100 bg-dark text-white">
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categorias" element={<Home />} />
              <Route path="/ofertas" element={<Home />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/pago-exito" element={<PagoExitoso />} />
              <Route path="/pago-error" element={<PagoError />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;