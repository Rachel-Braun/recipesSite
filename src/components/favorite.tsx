import axios from 'axios'
import { myUser } from '../classes/myUser'
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import usersContext from '../context';
import { myRecipe } from '../classes/myRecipe';
import { Link, Outlet } from "react-router-dom"


const Favorites = () => {

    //@ts-ignore
    const usersList = useContext(usersContext).UsersList
    //@ts-ignore
    const setUsersList = useContext(usersContext).setUsersList
    let myDispatch = useDispatch();
    let recipesList: Array<myRecipe> = useSelector((l: any) => l.recipyList);
    useEffect(() => {
        //if (recipesList?.length === 0)
        axios.get("http://localhost:27017/recipe/getAll").then((k) => {
            myDispatch({ type: "setMyRecipie", payload: k.data });
        });
    });
    let name = useSelector((k: any) => k.user.name)
    let password = useSelector((k: any) => k.user.password)
    let nameManager = useSelector((k: any) => k.manager.name)
    let passwordManager = useSelector((k: any) => k.manager.password)
    let user: any = usersList.filter((i: myUser) => i.name == name && i.password == password)[0];

    if (name == 'default')
        return <h1>אינך רשום עדיין למערכת!!</h1>
    if (user.favorites == null)
        return <div><h1>אין לך מתכונים במועדפים</h1><h2>רוצה להוסיף עכשיו? 😃</h2></div>
    let arr: Array<myRecipe> = [];
    for (let index = 0; index < user.favorites.length; index++) {
        let r:myRecipe=recipesList.filter((o: myRecipe) => o.name == user.favorites[index])[0]
        if(r!=undefined)
            arr.push(r);
    }
    if(arr.length==0)
       return <div><h1>אין לך מתכונים במועדפים</h1><Link to={'../myImg'}><h2><u>רוצה להוסיף עכשיו</u>? 😃</h2></Link></div>
debugger
    return <div><h3>המועדפים שלך:</h3>
        {arr.map((l: myRecipe) =>
            <div className="gallery">
                <Link to={`myditailes/${l.name}/${l.time}`}>
                    <img src={`http://localhost:27017/pic/${l.img}.jpg`}></img>
                </Link>
                <div className="desc">
                    <div className="dropdown">
                        <h4>{l.name}</h4>

                        <div className="dropdown-content">
                            <p>{l.description}</p>
                        </div>    </div>
                </div>
            </div>
        )}
    </div>
}
export default Favorites