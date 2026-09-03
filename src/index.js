import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* ==================== PWA ==================== */
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  const registerSW = async () => {
    const registration = await navigator.serviceWorker.register(
      `${process.env.PUBLIC_URL}/sw.js`
    );

    if (!navigator.serviceWorker.controller) {
      return; // Premier chargement : le SW contrôle à partir du prochain
    }

    // Une nouvelle version est disponible : recharger
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      return;
    }

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  };

  window.addEventListener('load', registerSW);
}