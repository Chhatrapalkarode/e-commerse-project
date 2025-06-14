import React from "react";
import custpic from "./custpic.png";
import CustomerLogin from "./CustomerLogin";
import CustomerReg from "./CustomerReg";
import { BrowserRouter, Link , Outlet } from "react-router-dom";
// import "./index.css";

function CustomerMain(){
    return(
        // <BrowserRouter>
        <div>
            <center>
                <img src={custpic}  height={200} width={800} />
               
                <nav>
                    <ul>
                   
                        <li>
                            <Link to="customerlogin"> Login </Link>
                        </li> 
                         <li>
                            <Link to="customerreg"> Registration </Link>
                        </li>
                        
                    </ul>
                   
                </nav>
                <Outlet/>
            </center>
           

        </div>
        // </BrowserRouter>
    )
}
export default  CustomerMain;
 

