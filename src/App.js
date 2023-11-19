import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './components/SecurePage/Login'
import Signup from './components/SecurePage/Signup'
import SecurePage from './components/SecurePage/SecurePage'
import 'bootstrap/dist/css/bootstrap.min.css'
import List from "./pages/list/List";
import FavoriteDestinations from "./components/favoriteDestination/FavoriteDestination";
import FeaturedHome from "./components/featuredHome/FeaturedHome"

function App(){
  return (
   <BrowserRouter>
      <Routes>
      <Route path ='/featuredhome' element={<FeaturedHome />} ></Route> 
        <Route path ='/favdes' element={<FavoriteDestinations />} ></Route> 
        <Route path ='/' element={<SecurePage />} ></Route>  
        <Route path ='/Login' element={<Login />} ></Route>
        <Route path ='/signup' element={<Signup />} ></Route> 
        <Route path ='/list' element = {<List />}></Route>
      </Routes>
   </BrowserRouter>
  );
}

export default App