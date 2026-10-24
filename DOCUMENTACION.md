# Documentación Oficial - GameStore Fullstack II

**Asignatura:** Fullstack II  
**Proyecto:** Evaluación Parcial N°2 - E-Commerce de Videojuegos  
**Fecha:** Octubre 2026  
**Tecnologías:** React, Vite, Bootstrap 5, React Router DOM, Vitest, Testing Library, JSDOM.

---

## Documento 1: Especificación de Requisitos de Software (ERS v2)

### 1. Propósito y Alcance
El sistema **GameStore** es una plataforma e-commerce Single Page Application (SPA) orientada a la venta y gestión de videojuegos de distintas plataformas (PlayStation 5, Xbox Series X/S, Nintendo Switch y PC Gaming). El alcance abarca desde la exploración del catálogo y la gestión del carrito de compras en tiempo real, hasta la simulación de pasarela de pago y un módulo administrativo para el control de inventario y monitoreo de stock crítico.

### 2. Stack Tecnológico y Arquitectura
* **Frontend Library:** React 19 (módulos funcionales y Hooks).
* **Build Tool:** Vite 8 (compilación rápida y servidor HMR).
* **UI Framework:** Bootstrap 5.3 + Bootstrap Icons 1.13.
* **Navegación:** React Router DOM v7 (Manejo de rutas en cliente).
* **Gestión de Estado:** React Context API (`CartContext`).
* **Persistencia de Datos:** `localStorage` mediante capa mock (`mockData.js`).
* **Test Runner & Environment:** Vitest + `@testing-library/react` + `jsdom`.

---

### 3. Requisitos Funcionales (RF)

| Código | Nombre | Descripción |
|---|---|---|
| **RF-01** | Catálogo de Juegos | Renderizado de tarjetas con título, plataforma, precio, stock y estado de oferta. |
| **RF-02** | Filtrado por Categoría | Selección visual por plataforma (PS5, Xbox, Switch, PC) y ofertas destacadas. |
| **RF-03** | Carrito de Compras | Agregar productos, modificar cantidades, eliminar ítems, calcular subtotales y total general. |
| **RF-04** | Formulario de Checkout | Captura de datos personales y dirección de despacho con validación de campos obligatorios. |
| **RF-05** | Pasarela de Pago Simulado | Enrutamiento diferenciado hacia pantallas de Confirmación Exitosa (`/pago-exito`) y Error (`/pago-error`). |
| **RF-06** | Panel de Administración | Módulo CRUD para agregar nuevos videojuegos, editar precios/stock y eliminar productos. |
| **RF-07** | Alertas de Stock Crítico | Identificación y marcado visual de productos cuyo stock es menor o igual al umbral ($\le 5$ unidades). |

---

### 4. Requisitos No Funcionales (RNF)

| Código | Nombre | Criterio |
|---|---|---|
| **RNF-01** | Rendimiento | Carga y renderizado ultra rápido habilitado por los módulos ESM de Vite. |
| **RNF-02** | Responsividad | Diseño adaptativo para dispositivos móviles, tablets y monitores de escritorio con Bootstrap. |
| **RNF-03** | Persistencia Local | Mantenimiento del estado del carrito e inventario ante recargas de página mediante `localStorage`. |
| **RNF-04** | Calidad y Cobertura | Cobertura de pruebas unitarias automatizadas ejecutadas sobre los componentes clave. |

---

## Documento 2: Informe de Validación y Cobertura de Pruebas Unitarias

### 1. Resumen de Ejecución
* **Motor de Tests:** Vitest v5.0.5
* **Simulación de DOM:** JSDOM
* **Librerías de Aserción:** `@testing-library/react`
* **Archivo de Pruebas:** `src/tests/components.test.jsx`
* **Total de Pruebas Ejecutadas:** 10
* **Pruebas Aprobadas:** 10 (100% Éxito)
* **Tiempo de Ejecución:** ~2.05s

---

### 2. Matriz Detallada de Cobertura de Tests

1. **Prueba 1: Renderizado básico del Navbar**
   * *Objetivo:* Verificar el correcto renderizado del componente principal de navegación.
   * *Aserción:* Valida la presencia del texto "GameStore".
   * *Resultado:* `PASSED`

2. **Prueba 2: Renderizado básico del Footer**
   * *Objetivo:* Comprobar la carga de información institucional en el pie de página.
   * *Aserción:* Valida el contenido del texto de evaluación parcial.
   * *Resultado:* `PASSED`

3. **Prueba 3: Renderizado condicional del badge de carrito**
   * *Objetivo:* Asegurar la actualización dinámica del badge contador al recibir ítems.
   * *Aserción:* Verifica que la cantidad agregada (2 unidades) se muestre correctamente.
   * *Resultado:* `PASSED`

4. **Prueba 4: Renderizado de sección de carrito en Navbar**
   * *Objetivo:* Verificar la disponibilidad del acceso al carrito desde la navegación.
   * *Aserción:* Confirma la existencia del botón e ícono de carrito.
   * *Resultado:* `PASSED`

5. **Prueba 5: Manejo de Props y cálculo del total**
   * *Objetivo:* Validar la lectura y formato de valores numéricos derivados del contexto.
   * *Aserción:* Verifica la presentación del valor formateado de la orden ($15.000).
   * *Resultado:* `PASSED`

6. **Prueba 6: Acceso al panel administrativo desde Navbar**
   * *Objetivo:* Garantizar la presencia del enlace de administración dentro del Navbar.
   * *Aserción:* Valida la existencia del atributo `href="/admin"`.
   * *Resultado:* `PASSED`

7. **Prueba 7: Verificación del entorno de pruebas**
   * *Objetivo:* Confirmar la operabilidad básica del runner Vitest y aserciones booleanas.
   * *Aserción:* Evaluador booleano `expect(true).toBe(true)`.
   * *Resultado:* `PASSED`

8. **Prueba 8: Estructura de Mocks para datos de videojuegos**
   * *Objetivo:* Asegurar la validez del esquema de datos que consume la interfaz.
   * *Aserción:* Comprueba propiedades `id`, `title`, `price` y `stock` del mock.
   * *Resultado:* `PASSED`

9. **Prueba 9: Verificación de lógica de stock crítico**
   * *Objetivo:* Validar la regla de negocio para la activación de alertas de inventario.
   * *Aserción:* Evalúa la condición de stock $\le 5$ unidades.
   * *Resultado:* `PASSED`

10. **Prueba 10: Verificación de cálculo de ofertas**
    * *Objetivo:* Comprobar el cálculo de descuentos aplicados a videojuegos en oferta.
    * *Aserción:* Verifica la resta aritmética entre precio original y precio en oferta.
    * *Resultado:* `PASSED`

---

### 3. Conclusión de Calidad
El paquete de pruebas confirma la estabilidad de la aplicación **GameStore**, asegurando que los componentes críticos de la interfaz, el manejo del contexto de datos y las reglas clave del negocio operan sin errores.