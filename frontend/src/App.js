
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Header from './components/header';
import React from 'react';
import ProductCard from './components/Product_component/ProductCard';
import MainPage from './pages/Main_page/main';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'element={<Header />}>
            <Route index element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
