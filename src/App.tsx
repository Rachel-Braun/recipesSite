import './App.css';
import List from './components/list';
import Home from './components/home';
import About from './components/about';
import Nav from './components/nav';
import './bootstrap.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Ditailes from './components/details';
import Login from './components/login';
import { useContext, useEffect, useState } from "react"
import Add from './components/addRecipe';
import Routing from './components/routing';
import { Provider } from 'react-redux';
import store from './store/store';
import { MyProvider } from './context';
import axios from "axios"



function App() 
{
    const [UsersList,setUsersList]=useState([
      useEffect(function(){
        axios.get(`http://localhost:27017/user/getAll`).then(v=>{
          
        setUsersList(v.data)})
      },[])
    ])
    
    const tranfer={
      UsersList:UsersList,
      setUsersList:setUsersList
    }


  return (
    <div>
      <MyProvider value={tranfer}>
      <Provider store={store}>
     <Routing></Routing>
     </Provider>
</MyProvider>

    </div>
  );
}

export default App;
