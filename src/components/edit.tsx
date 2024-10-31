import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import '../App.css'
import Row from "./row";
import { myRecipe } from "../classes/myRecipe";
import { useParams } from "react-router"

export const Edit=()=>
{    
    debugger
    const [Recipe, setRecipe]=useState({})

    let params = useParams()

    // useEffect(() => 
    // {
    //     axios.get(`http://localhost:27017/recipe/getbyname/${params.name}`).then(v => 
    //                 {
    //                     setMyRecipe(v.data[0])
    //                 })
    // }, [])
    let recipesList: Array<myRecipe> = useSelector((l: any) => l.recipyList);
    let myRecipe:myRecipe=recipesList.filter((i:myRecipe)=>i.name==params.name)[0]
    console.log(myRecipe)
    const navigation=useNavigate();
    const name = useSelector((k:any)=>k.user.name)
    const password = useSelector((k:any)=>k.user.password)
    const save=()=>
    {
        debugger
        let ingredients=[]//:{name:string, amount:number}[]=myRecipe.ingredient//:[{name:string, amount:number}]=[]
        let pro=document.getElementsByTagName('input');
        for (let index = 7; index < pro.length-1; index++) 
        {
            if(pro[index].value==='')
            {
                index++;
                continue;
            }

            ingredients.push({name:pro[index++].value, amount:Number.parseInt(pro[index].value)});//((number)());//innerHTML;
        }
        
        let newRecipe={...Recipe, ingredient:ingredients}
        //@ts-ignore
        axios.put(`http://localhost:27017/recipe/updaterecipe/${myRecipe?._id}`, newRecipe).then(j=> setRecipe(j.data))
        alert('recipe saved!!')  
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
    let pro=document.getElementsByTagName('input');
    let n=myRecipe?.ingredient.length
    let r=n==undefined?0:n
    let ing=myRecipe?.ingredient==undefined?[]:myRecipe.ingredient
        debugger
    

        
    return <div className="recipe">
        <div className="input">
        <br/>
        <input type="text" defaultValue={params?.name}  onChange={(e)=> setRecipe({...Recipe,name:e.target.value})}></input><br></br><br></br><br></br><br></br>
        <input min={1} max={5} type="number" defaultValue={myRecipe?.degree?.toString()} onChange={(e)=> setRecipe({...Recipe,degree:e.target.value})}></input><br></br><br></br>
        <input type="text" defaultValue={myRecipe?.description?.toString()} onChange={(e)=> setRecipe({...Recipe,description:e.target.value})}></input><br></br><br></br>
        <input type="text" defaultValue={myRecipe?.type?.toString()} onChange={(e)=> setRecipe({...Recipe,type:e.target.value})}></input><br></br><br></br>
        <input type="number" defaultValue={myRecipe?.time?.toString()}  onChange={(e)=> setRecipe({...Recipe,time:e.target.value})}></input><br></br><br></br>
        <input type="file" placeholder="תמונה"  onChange={(e)=> setRecipe({...Recipe,img:e.target.value})}></input><br></br><br></br>
        </div>
        {/* רכיבים */}
        {/* <h4>רכיבים</h4> */}
        <div id="proc">
        {myRecipe?.ingredient.map((i:{ name: string, amount: number})=>
       <> <input className="pro" type="text" defaultValue={i.name}></input>
        <input type="number" className="pro" defaultValue={i.amount?.toString()}></input><br></br></>
        )}
        <button id="plus" onClick={()=>plus()}>+</button><br></br>
        </div>
        <input className="btn" type="button" value='save' onClick={()=> save()}></input> 
    </div>
    
}
export default Edit
