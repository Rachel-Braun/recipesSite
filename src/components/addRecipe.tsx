import { useNavigate } from "react-router-dom";
import { useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import '../App.css'
import Row from "./row";

export const AddRecipe=()=>
{    
    const [Recipe, setRecipe]=useState({})
    const navigation=useNavigate();
    const name = useSelector((k:any)=>k.user.name)
    const password = useSelector((k:any)=>k.user.password)
    const save=()=>
    {
        debugger
        let ingredients=[]//:[{name:string, amount:number}]=[]
        let pro=document.getElementsByTagName('input');
        for (let index = 6; index < pro.length-1; index++) 
        {
            if(pro[index].value==='')
            {
                index++;
                continue;
            }

            ingredients.push({name:pro[index++].value, amount:Number.parseInt(pro[index].value)});//((number)());//innerHTML;
        }
        
        let newRecipe={...Recipe, ingredient:ingredients, ownerId:password, img:'default'}
        //@ts-ignore
        axios.put('http://localhost:27017/recipe/addRecipe', newRecipe).then(j=> setRecipe(j.data))
        alert('recipe added successfully!!')  
        navigation('../myImg');
    }
 
    const plus=()=>
    {
        debugger
        let n=document.getElementById("plus");        
        const node=document.getElementById('proc')
        n?.remove();
        const input1 = document.createElement("input");
        input1.className="pro"; input1.type='text'; input1.placeholder='מוצר'
        const input2 = document.createElement("input");
        input2.className="pro"; input2.type='number'; input2.placeholder='כמות';
        const br=document.createElement('br')
        const plusbtn=document.createElement('button'); plusbtn.innerText='+'; plusbtn.id='plus'
        plusbtn.onclick=()=>plus(); 
        node?.appendChild(input1);
        node?.appendChild(input2);
        node?.appendChild(plusbtn);
        node?.appendChild(br);
    }


    if(name!='default' && password!='default')

    return <div className="recipe">
        <div className="input">
        <br/>
        <input type="text" placeholder="name" onChange={(e)=> setRecipe({...Recipe,name:e.target.value})}></input><br></br><br></br><br></br><br></br>
        <input min={1} max={5} type="number" placeholder="level" onChange={(e)=> setRecipe({...Recipe,degree:e.target.value})}></input><br></br><br></br>
        <input type="text" placeholder="description" onChange={(e)=> setRecipe({...Recipe,description:e.target.value})}></input><br></br><br></br>
        <input type="text" placeholder="type" onChange={(e)=> setRecipe({...Recipe,type:e.target.value})}></input><br></br><br></br>
        <input type="number" placeholder="time"  onChange={(e)=> setRecipe({...Recipe,time:e.target.value})}></input><br></br><br></br>
        <input type="file" placeholder="תמונה"  onChange={(e)=> setRecipe({...Recipe,img:e.target.value})}></input><br></br><br></br>
        </div>
        {/* רכיבים */}
        {/* <h4>רכיבים</h4> */}
        <div id="proc">
        <Row></Row><br></br>
        <Row></Row><br></br>
        <Row></Row><br></br>
        <Row></Row><br></br>
        <Row></Row>
        <button id="plus" onClick={()=>plus()}>+</button><br></br>
        </div>
        <input className="btn" type="button" value='save' onClick={()=> save()}></input> 
    </div>
    else
        return <h1>You don't connected...😐</h1>
}
export default AddRecipe
