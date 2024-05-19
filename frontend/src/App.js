
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
import ProfilePage from './pages/profile_page';
import EditProfile from './components/editProfile';
import SearchResultsPage from './pages/search_results_page';
import ProductsByCategory from './pages/products_category';


function App() {
  return (
    <div className="App">
      <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path='/'element={<Header />}>
              <Route index element={<MainPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/edit-profile' element={<EditProfile />} />
              <Route path='/bizuteria/product/:id' element={<ProductPage />} />
              <Route path='/search' element={<SearchResultsPage />} />
              <Route path='/category/:category' element={<ProductsByCategory />} />
            </Route>
          </Routes>
        </Router>
        </CartProvider>
      </AuthProvider>
    </div>
  )
}

export default App
