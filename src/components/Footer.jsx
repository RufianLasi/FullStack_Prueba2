// src/components/Footer.jsx
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto border-top border-secondary">
      <div className="container text-center">
        <p className="mb-1 fw-bold">GameStore &copy; 2026 - Evaluación Parcial N°2 Fullstack II</p>
        <small className="text-secondary">
          Desarrollado con React, Bootstrap, Vite y Jasmine/Karma
        </small>
      </div>
    </footer>
  );
};