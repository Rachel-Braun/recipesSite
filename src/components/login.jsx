import { useDispatch, useSelector } from "react-redux"
import setUser from "../store/actions1"
import { useRef, useState } from "react"
import { useContext } from "react";
import usersContext from '../context';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigation=useNavigate()
    //@ts-ignore
    const usersList = useContext(usersContext).UsersList
    //@ts-ignore
    const setUsersList = useContext(usersContext).setUsersList

    let manager = useSelector((k) => k.manager)
    let ptrName = useRef(null)
    let ptrPassword = useRef(null)
    const [myUser, setMyUser] = useState({})
    let dispatcher = useDispatch()

    const sendToStateUser = (e) => {
        //e.preventDefualt();
        debugger
        if (ptrName.current.value == '') {
            ptrName.current.style.borderColor = 'red'
            return;
        }
        if (ptrPassword.current.value == '') {
            ptrPassword.current.style.borderColor = 'red'
            return;
        }
        if (!usersList?.find((n) => n.name == myUser.name && n.password == myUser.password))
            {
                alert('שם משתמש או סיסמה שגויים')
                navigation('../myadduser')
                return;
            }
        else
            dispatcher(setUser(myUser))
        if (myUser.name == manager.name && myUser.password == manager.password)
            alert('manager ' + manager.name + ', welcome!!')
        navigation('myImg');  
    }


    return <>
             <audio src="01 - Santorini.mp3" controls></audio>

        <div className="centered">
            <div className="input">
        <label>Enter your name:</label>
        <br />
        <input ref={ptrName} placeholder="" type="text" id="name" onChange={(e)=>setMyUser({...myUser, name: e.target.value})}></input>
        <br />
        <br />
        <label>Enter your password:</label>
        <br />
        <input ref={ptrPassword} placeholder="" required type="password" onChange={(e)=>setMyUser({...myUser, password: e.target.value})} />
        <br />
        <br />
        <button  onClick={(e)=>sendToStateUser(e)}>send</button>
        </div>
    </div>



            </>

}
            export default Login