import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomerRouters from "./routers/CustomerRouters.jsx";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/*' element={<CustomerRouters />} ></Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;