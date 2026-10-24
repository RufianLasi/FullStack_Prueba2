// src/data/mockData.js

const INITIAL_GAMES = [
  {
    id: 1,
    title: 'The Witcher 3: Wild Hunt',
    platform: 'PC',
    price: 19990,
    offerPrice: 9990,
    isOffer: true,
    stock: 15,
    category: 'RPG',
    description: 'Conviértete en Geralt de Rivia, un cazador de monstruos a sueldo en un mundo abierto masivo.',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg'
  },
  {
    id: 2,
    title: 'Elden Ring',
    platform: 'PS5',
    price: 54990,
    offerPrice: null,
    isOffer: false,
    stock: 3,
    category: 'Acción',
    description: 'Levántate, Sinluz, y déjate guiar por la gracia para esgrimir el poder del Círculo de Elden.',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg'
  },
  {
    id: 3,
    title: 'Halo Infinite',
    platform: 'Xbox',
    price: 39990,
    offerPrice: 24990,
    isOffer: true,
    stock: 12,
    category: 'FPS',
    description: 'La legendaria saga de Halo regresa con la campaña del Jefe Maestro más amplia hasta la fecha.',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1240440/header.jpg'
  },
  {
    id: 4,
    title: 'The Legend of Zelda: Tears of the Kingdom',
    platform: 'Switch',
    price: 59990,
    offerPrice: null,
    isOffer: false,
    stock: 2,
    category: 'Aventura',
    description: 'Una épica aventura a través de la superficie y los cielos de Hyrule te espera.',
    image: 'https://upload.wikimedia.org/wikipedia/en/f/fb/The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg'
  },
  {
    id: 5,
    title: 'Cyberpunk 2077',
    platform: 'PC',
    price: 34990,
    offerPrice: 17490,
    isOffer: true,
    stock: 20,
    category: 'RPG',
    description: 'Un RPG de acción y aventura en mundo abierto ambientado en la megalopolis de Night City.',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg'
  },
  {
    id: 6,
    title: 'God of War Ragnarök',
    platform: 'PS5',
    price: 59990,
    offerPrice: null,
    isOffer: false,
    stock: 8,
    category: 'Acción',
    description: 'Kratos y Atreus deben viajar a cada uno de los nueve reinos en búsqueda de respuestas.',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/header.jpg'
  }
];

export const getStoredGames = () => {
  try {
    const stored = localStorage.getItem('gamestore_products');
    if (!stored) {
      localStorage.setItem('gamestore_products', JSON.stringify(INITIAL_GAMES));
      return INITIAL_GAMES;
    }
    return JSON.parse(stored) || INITIAL_GAMES;
  } catch (error) {
    return INITIAL_GAMES;
  }
};

export const getProducts = getStoredGames;

export const saveStoredGames = (games) => {
  try {
    localStorage.setItem('gamestore_products', JSON.stringify(games));
  } catch (error) {
    console.error("Error guardando productos en localStorage", error);
  }
};

export const saveProducts = saveStoredGames;

export const addProduct = (newProduct) => {
  const products = getStoredGames();
  const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const productToAdd = { ...newProduct, id };
  const updated = [...products, productToAdd];
  saveStoredGames(updated);
  return productToAdd;
};

export const updateProduct = (id, updatedProduct) => {
  const products = getStoredGames();
  const updated = products.map(p => p.id === id ? { ...p, ...updatedProduct } : p);
  saveStoredGames(updated);
  return updated;
};

export const deleteProduct = (id) => {
  const products = getStoredGames();
  const updated = products.filter(p => p.id !== id);
  saveStoredGames(updated);
  return updated;
};

export const createOrder = (orderData) => {
  try {
    const orders = JSON.parse(localStorage.getItem('gamestore_orders') || '[]');
    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      ...orderData
    };
    orders.push(newOrder);
    localStorage.setItem('gamestore_orders', JSON.stringify(orders));
    return newOrder;
  } catch (error) {
    console.error("Error al crear la orden", error);
    return null;
  }
};

export const getOrders = () => {
  try {
    const stored = localStorage.getItem('gamestore_orders');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error obteniendo órdenes", error);
    return [];
  }
};