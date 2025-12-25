import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import Produits from './pages/Produits';
import ProductDetail from './pages/ProductDetail';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/produits' element={<Produits />} />          
          <Route path="/produits/:type/:id" element={<ProductDetail />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
