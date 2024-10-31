import axios from 'axios'
import { myUser } from '../classes/myUser'
import { useSelector } from "react-redux"
import { useContext } from "react";
import usersContext from '../context';


export const ListUser=()=>{
    // const [usersList, setUsersList]=useState<Array<myUser>>()
    // useEffect (()=>{
    //     axios.get(`http://localhost:27017/user/getAll`).then(v=>setUsersList(v.data))
    // },[]
    // )

    //@ts-ignore
    const usersList=useContext(usersContext).UsersList
    //@ts-ignore
    const setUsersList=useContext(usersContext).setUsersList
    
    
    const dell=(id:any)=>
    {
      debugger
      axios.delete(`http://localhost:27017/user/dell/${id}`).then(h=> setUsersList(usersList.filter((i:myUser)=>i._id!=id)))
    }

    let name = useSelector((k:any)=>k.user.name)
    let password = useSelector((k:any)=>k.user.password)
    let nameManager = useSelector((k:any)=>k.manager.name)
    let passwordManager = useSelector((k:any)=>k.manager.password)
  
    if(name==nameManager && password==passwordManager)
        return <div>
          <tr><th>name</th><th>password</th></tr> 
        {usersList?.map((h:myUser)=>(<tr key={h.name}><td>{h.name}</td><td>{h.password}</td>
         <td><button onClick={()=>dell(h._id)}>delete</button></td></tr>))}
         <br></br>
        </div>
    else
        return<h4>אין לך הרשאה לצפות בקבצי מערכת 🤐</h4>
}

export default ListUser