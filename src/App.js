<<<<<<< HEAD
import './App.css';
import Footer from './components/footer/Footer';
import Email from './components/email/Email';
function App() {
  return (
    <div className="App">
      <Email />
      <Footer />
    </div>
    
  );
=======
import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './components/SecurePage/Login'
import Signup from './components/SecurePage/Signup'
import SecurePage from './components/SecurePage/SecurePage'
import 'bootstrap/dist/css/bootstrap.min.css'

function App(){
  return (
   <BrowserRouter>
      <Routes>
        <Route path ='/' element={<SecurePage />} ></Route>  
        <Route path ='/Login' element={<Login />} ></Route>
        <Route path ='/signup' element={<Signup />} ></Route> 
      </Routes>
   </BrowserRouter>
  )
>>>>>>> 32ccdf1f5e2e24fcad61fd0b8dcdbed15c16bc2c
}

export default App