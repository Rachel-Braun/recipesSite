import { useNavigate } from "react-router-dom";
import { useState, useContext, useRef } from "react"
import axios from "axios"
import usersContext from "../context"
import { useDispatch } from "react-redux"
import setUser from "../store/actions1"

export const AddUserToList=()=>
{
    const [user, setuser]=useState({})
    //@ts-ignore
    const usersList=useContext(usersContext).UsersList
    //@ts-ignore
    const setUsersList=useContext(usersContext).setUsersList   
    let dispatcher = useDispatch()

    const isExsist=(name, password)=>
    {
        debugger
        return usersList?.find((n)=>n.name==name && n.password==password)
    }

    let navigation=useNavigate()
    let ptrName=useRef(null)
    let ptrPassword=useRef(null)
    const save=()=>
    {
        let n=ptrName.current;
        if(n.value=='')
        {
            ptrName.current.style.borderColor='red'
            return;
        }
        if(ptrPassword.current.value=='')
        {
            ptrPassword.current.style.borderColor='red'
            return;
        }
        //@ts-ignore
        let b=isExsist(user.name,user.password)
        if(b)
        {
            alert('אתה רשום כאן כבר!!')
            navigation('myImg');
            dispatcher(setUser(user))
        }
        else
        {
            if(usersList.find(i=>i.password==user.password))
            {
                ptrPassword.current.value=''
                ptrPassword.current.placeholder='נסה סיסמה אחרת'
                return;
            }
            axios.put('http://localhost:27017/user/adduser', user).then(j=> setUsersList(j.data))
            alert('user added successfully!!')
            dispatcher(setUser(user))
            navigation('myImg');  
        } 
    }
    
    return <div className="centered">
        <div className="input">
        <h3>welcome our site!</h3>
        <br></br>
        <label>Enter your name:</label>
        <br />
        <input ref={ptrName} placeholder="name" type="text" id="name" onChange={(e)=> setuser({...user,name:e.target.value})}></input>
        <br />
        <br />
        <label>Enter your password:</label>
        <br />
        <input ref={ptrPassword} placeholder="password" type="password" onChange={(e)=> setuser({...user,password:e.target.value})} />
        <br />
        <br />
        <input className="btn" type="button" value='save' onClick={()=> save()}></input> 
        </div>
    </div>
}