import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/SecurePage/Login'
import Signup from './components/SecurePage/Signup'
import SecurePage from './components/SecurePage/SecurePage'
import List from './pages/list/List';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SecurePage />} ></Route>
        <Route path='/Login' element={<Login />} ></Route>
        <Route path='/signup' element={<Signup />} ></Route>
        {/* <Route path='/footer' element={<Footer />} ></Route>
        <Route path='/email' element={<Email />} ></Route> */}
        <Route path='/list' element={<List />} ></Route>
        <Route path='/header' element={<Header />} ></Route>
        <Route path='/navbar' element={<Navbar />} ></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App