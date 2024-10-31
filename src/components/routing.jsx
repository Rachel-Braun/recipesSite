import '../App.css';
import List from './list';
// import Home from './components/home';
import About from './about';
import Nav from './nav';
import '../bootstrap.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './login';
//import { useState } from "react"
import { AddUserToList } from './AddUserToList';
import Home from './home';
import { AddRecipe } from './addRecipe';
import Favorites from './favorite';
import Details from './details';
import Edit from './edit';

export const Routing = () => {
  // let navi=useNavigate()
  // navi('myImg')
  return <BrowserRouter>
    <Nav></Nav>
    <div id='space'></div>
    <Routes>
      <Route path='mylogin' element={<Login />}></Route>      
      <Route path='mylogin/myImg' element={<Home/>}></Route>      
      <Route path="myuserslist" element={<List></List>}></Route>
      <Route path="myadduser" element={<AddUserToList></AddUserToList>}></Route>
      <Route path="myadduser/myImg" element={<Home></Home>}></Route>
      <Route path="myadduser/myImg/myditailes/:myname/:mytime" element={<Details></Details>}></Route>
      <Route path="mylogin/myImg/myditailes/:myname/:mytime" element={<Details></Details>}></Route>
      <Route path="myaddrecipe" element={<AddRecipe></AddRecipe>}></Route>
      <Route path="myaddrecipe/myhome" element={<Home></Home>}></Route>
      <Route path="myabout" element={<About></About>}></Route>
      <Route path="myImg" element={<Home></Home>}></Route>
      <Route path='myImg/myditailes/:myname/:mytime' element={<Details></Details>}></Route>
      <Route path='myFavorites/myditailes/:myname/:mytime' element={<Details></Details>}></Route>
      <Route path='myedit/:name' element={<Edit></Edit>}></Route>
      <Route path='myFavorites' element={<Favorites></Favorites>}></Route>
    </Routes>
  </BrowserRouter>
}

export default Routing