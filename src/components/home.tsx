import axios from 'axios'
import { useEffect } from 'react'
import { myRecipe } from '../classes/myRecipe'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import '../bootstrap.css'
const Home = () => {
    let recipesList: Array<myRecipe> = useSelector((l: any) => l.recipyList);
    let myDispatch = useDispatch();
    // var n=document.getElementById('search')
    // if(n!=undefined)
    //    n.style={{display:'none'}}
    
    useEffect(() => {
        axios.get("http://localhost:27017/recipe/getAll").then((k) => {
            myDispatch({ type: "setMyRecipie", payload: k.data });
        });
    });
    let password = useSelector((k:any)=>k.user.password)
    let manager = useSelector((k:any)=>k.manager)
    let isManager = password==manager.password
    const dell=(id:any, ownerId:any, e:any)=>
    {
        e.preventDefault();
        if(password==manager.password || password==ownerId)
            axios.delete(`http://localhost:27017/recipe/dell/${id}/${password}`)
        else
            alert('אין לך הרשאה למחיקת קבצים שמורים!'+"\n"+"(פעולת מחיקה מתאפשרת למנהל או לבעלי המתכון)")
    }
    let navi=useNavigate()


    const edit=(name:any, ownerId:any, e:any)=>
    {
        e.preventDefault();
        if(password==manager.password || password==ownerId)
            {
                navi(`../myedit/${name}`)
            }
        else
            alert('אין לך הרשאה לעריכת קבצים שמורים!'+"\n"+"(עריכה מתאפשרת למנהל או לבעלי המתכון)")
    }
    debugger

    return <>
         <audio src="01 - Santorini.mp3" controls></audio>

        {recipesList?.map((l: myRecipe) =>
            <div id={l.name} className="gallery">
                <Link to={`myditailes/${l.name}/${l.time}`}>
                    <div className='containe'>
                        <div className="flip-box">
                            <div className="flip-box-inner">
                                <div className="flip-box-front">
                                <img src={`http://localhost:27017/pic/${l.img}.jpg`} width="600" height="400"></img>
                                </div>
                                <div className="flip-box-back">
                                <img src={`http://localhost:27017/pic/${l.img}.jpg`} width="600" height="400"></img>
                                </div>
                            </div>
                        </div>
                        <div style={{display:(isManager || l.ownerId==password)?'block':'none'}} className="topright"><span onClick={(e)=>edit(l.name,l.ownerId, e)}>📝</span>
                        <span onClick={(e)=>dell(l._id,l.ownerId, e)}>❌</span>
                        <p className="dropdown-content2">
                </p>
                    </div></div>
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

{/* <footer>
            <div className="foot1">
                <h3>About</h3>
                <small><a href="About.html">HOME DECOR</a></small>
                <br/><br/>
                <small><a href="">נגישות</a></small>
                <br/><br/>
                <b><small><a href="סניפים.html" style={{color: 'rgb(205, 128, 128)'}}><img src="As.png" width="15" height="20"/>איתור סניף </a></small></b>
                <br/><br/>
            </div>
            <div className="foot2">
                <h3>Customer Service</h3>
                <small><a href="">שאלות ותשובות</a></small>
                <br/><br/>
                <small><a href="">משלוחים</a></small>
                <br/><br/>
                <small><a href="">החלפות והחזרות</a></small>
                <br/><br/>
                <small><a href="">ביטול עסקה</a></small>
                <br/><br/>
                <small><a href="">צור קשר</a></small>
                <br/><br/>
                <small><a href="">Gift card</a></small>
                <br/><br/>
                <small><a href="">רכישה באתר עם שוברי קניה/ Gift card </a></small>
                <br/><br/>
            </div>
            <div className="foot3">
                <h3>DREAM CARD</h3>
                <small><a href="">הטבות מועדון</a></small>
                <br/><br/>
                <small><a href="">דרים קארד עסקים</a></small>
                <br/><br/>
                <small><a href="">הצטרפות ל Dream Card VIP</a></small>
                <br/><br/>
            </div>
            <div className="foot4">
                <h3>תקנון האתר</h3>
                <small><a href="">תקנון</a></small>
                <br/><br/>
                <small><a href="">תקנון גיפט קראד דיגיטלי</a></small>
                <br/><br/>
                <small><a href="">תנאי שימוש ומדיניות פרטיות</a></small>
                <br/><br/>
                <small><a href="">תנאי שימוש ומולטיפס</a></small>
                <br/><br/>
            </div>
            <br/>
        </footer>
        <div className="foot5">
            <br/>
            &nbsp; &nbsp; &nbsp; &nbsp;  
            <a href="">  <img src={`http://localhost:27017/pic/yutyub.png`} width="50"  height="40"/></a>
            &nbsp; &nbsp; &nbsp; 
            <a href="">  <img src={`http://localhost:27017/pic/instegram.png`} width="40"  height="40"/></a>
            &nbsp; &nbsp; &nbsp;
            <a href="">  <img src={`http://localhost:27017/pic/fes.png`} width="40"  height="40"/></a>
            &nbsp; &nbsp; &nbsp;
            <b><sup>  :עקבו אחרינו </sup></b>
            <br/>
        </div> */}

{/* <h5 >Top Tutorials</h5>
<a href="../html/default.html">HTML Tutorial</a><br/>
<a href="../css/default.html">CSS Tutorial</a><br/>
<a href="../js/default.html">JavaScript Tutorial</a><br/>
<a href="../howto/default.html">How To Tutorial</a><br/>
<a href="../sql/default.html">SQL Tutorial</a><br/>
<a href="../python/default.html">Python Tutorial</a><br/>
<a href="../../www.w3schools.com_443/w3css/default.html">W3.CSS Tutorial</a><br/>
<a href="../bootstrap/bootstrap_ver.html">Bootstrap Tutorial</a><br/>
<a href="../php/default.html">PHP Tutorial</a><br/>
<a href="../java/default.html">Java Tutorial</a><br/>
<a href="../cpp/default.html">C++ Tutorial</a><br/>
<a href="../jquery/default.html">jQuery Tutorial</a><br/>

<div className="w3-col l3 m6 s12">
<div className="top10">
<h5 >Top References</h5>
<a href="default.html">HTML Reference</a><br/>
<a href="../cssref/default.html">CSS Reference</a><br/>
<a href="../jsref/default.html">JavaScript Reference</a><br/>
<a href="../sql/sql_ref_keywords.html">SQL Reference</a><br/>
<a href="../python/python_reference.html">Python Reference</a><br/>
<a href="../w3css/w3css_references.html">W3.CSS Reference</a><br/>
<a href="../bootstrap/bootstrap_ref_all_classes.html">Bootstrap Reference</a><br/>
<a href="../php/php_ref_overview.html">PHP Reference</a><br/>
<a href="../colors/colors_names.html">HTML Colors</a><br/>
<a href="../java/java_ref_keywords.html">Java Reference</a><br/>
<a href="../angular/angular_ref_directives.html">Angular Reference</a><br/>
<a href="../jquery/jquery_ref_overview.html">jQuery Reference</a><br/>
</div>
</div>
<div className="w3-col l3 m6 s12">
<div className="top10">
<h5>Top Examples</h5>
<a href="../html/html_examples.html">HTML Examples</a><br/>
<a href="../css/css_examples.html">CSS Examples</a><br/>
<a href="../js/js_examples.html">JavaScript Examples</a><br/>
<a href="../howto/default.html">How To Examples</a><br/>
<a href="../sql/sql_examples.html">SQL Examples</a><br/>
<a href="../python/python_examples.html">Python Examples</a><br/>
<a href="../w3css/w3css_examples.html">W3.CSS Examples</a><br/>
<a href="../bootstrap/bootstrap_examples.html">Bootstrap Examples</a><br/>
<a href="../php/php_examples.html">PHP Examples</a><br/>
<a href="../java/java_examples.html">Java Examples</a><br/>
<a href="../xml/xml_examples.html">XML Examples</a><br/>
<a href="../jquery/jquery_examples.html">jQuery Examples</a><br/>
</div>
</div>


<h4>Web Certificates</h4>
<a href="/cert/default.asp">HTML Certificate</a><br/>
<a href="/cert/default.asp">CSS Certificate</a><br/>
<a href="/cert/default.asp">JavaScript Certificate</a><br/>
<a href="/cert/default.asp">SQL Certificate</a><br/>
<a href="/cert/default.asp">Python Certificate</a><br/>
<a href="/cert/default.asp">PHP Certificate</a><br/>
<a href="/cert/default.asp">Bootstrap Certificate</a><br/>
<a href="/cert/default.asp">XML Certificate</a><br/>
<a href="/cert/default.asp">jQuery Certificate</a><br/>
<a href="//www.w3schools.com/cert/default.asp" className="w3-button w3-margin-top w3-dark-grey">
Get Certified &raquo;</a> */}




    </>
}
export default Home


