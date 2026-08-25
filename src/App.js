import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import Produits from './pages/Produits';
import ProductDetail from './pages/ProductDetail';
import Panier from './pages/Panier';
import ChatBot from './components/ChatBot';


function App() {
  return (
    <div className="App">
        <CartProvider>
          <Router>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/produits' element={<Produits />} />
              <Route path="/produits/:type/:id" element={<ProductDetail />} />
              <Route path="/panier" element={<Panier />} />
            </Routes>
            <ChatBot />
          </Router>
        </CartProvider>
    </div>
  );
}

export default App;
