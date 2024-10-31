import { useParams } from "react-router"
import { myRecipe } from "../classes/myRecipe"
import { useState, useContext, useEffect, useRef } from "react"
import axios from "axios"
import { useSelector } from "react-redux";
import { myUser } from "../classes/myUser";
import usersContext from '../context';


const Details = () => {
    debugger
    let params = useParams()
    const [recipe, setRecipe] = useState<myRecipe>()

    useEffect(() => 
    {
        axios.get(`http://localhost:27017/recipe/getbyname/${params.myname}`).then(v => 
                    {
                      setRecipe(v.data[0])
                    })
    }, [])

    //@ts-ignore
    const usersList = useContext(usersContext).UsersList
    
    let name = useSelector((k: any) => k.user.name)
    let password = useSelector((k: any) => k.user.password)

    const imgStyle = { width: '500px', height: '330px', align: "center", color: 'white', borderRadius: "5%" }
    let str = ''; let index = 0
    if (recipe?.degree)
        for (; index != recipe?.degree; str += '🔴', index++);
    for (; index < 5; str += '⚪', index++);
    let level;
    switch (recipe?.degree) {
        case 1: level = 'קל'; break;
        case 2: level = 'בינוני'; break;
        case 3: level = 'בינוני+'; break;
        case 4: level = 'קשה'; break;
        default: level = 'למומחים בלבד'; str = '🔴🔴🔴🔴🔴'
    }
    var a = usersList.filter((i: myUser) => i.name == name && i.password == password)[0];
    var b = a?.favorites
    var c = b?.filter((u: string) => u == recipe?.name)
    if (c == undefined ||
        c.length == 0) {
        var ch = '🤍';
        var massage = 'הוספה למועדפים';
    }
    else 
    {
        var ch = '💗';
        var massage = 'הסר מהמועדפים';
    }

    const addToFavories = () => 
    {
        if (name == 'default') 
        {
            alert("you don't connected!")
            return;
        }
        if (ch == '💗') 
        {
            let u:myUser= usersList.filter((i: myUser) => i.name == name && i.password == password)[0];
            u.favorites=u.favorites.filter((s: string) => s != recipe?.name)
            let id = usersList.filter((i: myUser) => i.name == name && i.password == password)[0]._id
            axios.put(`http://localhost:27017/user/removeRecipe/${id}/${recipe?.name}`)
        }
        else 
        {
            usersList.filter((i: myUser) => i.name == name && i.password == password)[0].favorites
                .push(recipe?.name)
            let id = usersList.filter((i: myUser) => i.name == name && i.password == password)[0]._id
            axios.put(`http://localhost:27017/user/addRecipe/${id}/${recipe?.name}`)
        }
        ch = ch == '💗' ? '🤍' : '💗';
        massage = massage === 'הוספה למועדפים' ? 'הסר מהמועדפים' : 'הוספה למועדפים';
        document.getElementsByTagName('span')[0].innerText = ch;
        document.getElementsByClassName('massage')[0].innerHTML = massage;
    }

    return <div className="details">
        <h2>{recipe?.name}/{recipe?.type}
            <p className="dropdown">
                <span id="heart" className="detailsLine" onClick={() => addToFavories()}>{ch}</span>
                <p className="dropdown-content2">
                    <p className="massage">{massage}</p>
                </p>
            </p>
        </h2>
        <h3>{recipe?.description}</h3>
        <span id="detailsLine">
            <span className="list">
                <h4 id="inngredients" >ingredients:</h4>
                <ol>
                {
                    recipe?.ingredient?.length == 0 ? 'no ingredients' :
                        recipe?.ingredient?.map((n: { name: string, amount: number }) =>
                            <li className="myList">{n.amount} {n.name}</li>)
                }
                </ol>
            </span> </span>
        <img  src={`http://localhost:27017/pic/${recipe?.img}.jpg`} style={imgStyle}></img>

        <p className="dropdown">
            <h3 id="level">{str}</h3>
            <p className="dropdown-content">
                <p>{level}</p>
            </p>
        </p>
        <h4>⏰ {recipe?.time != undefined ? (recipe?.time).toString() : 30} second</h4>

        
        <br></br>
    </div>
}
export default Details