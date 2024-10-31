import { useContext } from "react"
import UsersContext from "../context.js"

export const ShowAll=()=>{
    debugger
   //לחלץ מידע מהספק
   const localList=useContext(UsersContext).Userslist
    
    return <div>
        <thead><th>שם משתמש | </th><th>סיסמה </th></thead>
    { localList.map(l=>(
       <tr key={l.id}><td>{l.name}</td><td>{l.id}</td></tr>
   ))}   
   </div>
}