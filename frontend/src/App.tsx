import './App.css';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import BooksPage from './pages/BooksPage';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartSummary from './components/CartSummary'; 

function App() {
  return (
    <CartProvider>
      <Router>

        <CartSummary />
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
      
    </CartProvider>
  );
}

export default App;