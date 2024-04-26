
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Header from './components/header';
import React from 'react';
import ProductCard from './components/Product_component/ProductCard';
import MainPage from './pages/Main_page/main';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import { AuthProvider } from './context/useAuth';
import ProductPage from './pages/product_page';
import { CartProvider } from './pages/Cart/cart_context';
import CartPage from './pages/Cart/cart';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/'element={<CartProvider><Header /></CartProvider>}>
              <Route index element={<MainPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/bizuteria/product/:id' element={<ProductPage/>} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
