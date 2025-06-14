import React from "react";
import {Link,Outlet} from "react-router-dom";
import venderpic from './venderpic.png'
// import "../index.css";
function VenderMain(){
    return(
        <div>
            <center>
                <img src={venderpic}height={200} width={800}/>
                <nav>
                    <ul>
                        <li>
                            <Link to="venderlogin">Login</Link>
                        </li>
                        <li>
                            <Link to="venderreg" >registration</Link>
                        </li>
                    </ul>
                    
                </nav>
                <Outlet/>
            </center>
        </div>
    )
}export default VenderMain;