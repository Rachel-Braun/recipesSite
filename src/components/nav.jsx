import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Nav=()=>{
  let manager = useSelector((k) => k.manager)
  let name = useSelector((k)=>k.user.name)
  let password = useSelector((k)=>k.user.password)
  let str=name;
  let displayManager=name==manager.name && password==manager.password?'block':'none'
  var navi=useNavigate()
  
  const search=(value)=>{ 
    var recipes=document.getElementsByClassName('gallery');
    // for (let i = 0; i < recipes.length; i++) {
    //   if(recipes[i].id.indexOf(value)<0)
    //   recipes[i].style.display='none';
      
    // }  
    var input, filter, td, i, txtValue;
    input = document.getElementById("search");  
    filter = input.value.toUpperCase();    //
    for (i = 0; i < recipes.length; i++) 
    {
        td=recipes[i];
      if (td) 
      {
        txtValue = td.id;
        if (txtValue.toUpperCase().indexOf(filter) > -1)
          recipes[i].style.display = "";	
        else
          recipes[i].style.display = "none";
      }       
    }
  
  }
const go=()=>{
  navi('/myImg')
}


    return <div className="navDiv">
    <nav class="navbar navbar-default">
    <div class="container-fluid">
          <ul class="nav navbar-nav">
      <li><input id="search" placeholder="search...🔍" onFocus={()=>go()} onChange={(e)=>search(e.target.value)}></input></li>
    <li> <Link class="navbar-brand" to="/myImg">WebSiteName</Link></li>   
    <li> <Link to="/myImg">דף הבית</Link></li>  
    <li> <Link to="/mylogin">התחבר </Link></li> 
    <li><Link to="/myadduser">הרשם</Link></li> 
    
    <li> <Link to="/myaddrecipe" style={{display:name=='default'?'none':'block'}}>הוספת מתכון </Link></li>  
   
    <li><Link to="/myuserslist" style={{display:displayManager}}>רשימת משתמשים</Link></li>
    <li><Link to="/myabout">אודות</Link></li>
    <li><Link to="/myFavorites" style={{display:name=='default'?'none':'block'}}>💗</Link></li>
    
    </ul>
    <k id="ppp" style={{float:'right'}} to="/">
      משתמש נוכחי: {str}{name==manager.name && password==manager.password?' (מנהל)':''} 
      </k>
  </div>
</nav>
</div>
}
export default Nav