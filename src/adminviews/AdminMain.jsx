import React from "react";
// import adminpic from "../adminpic.jpg";
// import "../index.css";
import AdminLogin from "./AdminLogin";
import { Link, Outlet } from "react-router-dom";
function AdminMain(){
    return(
        <div>
            <center>
                {/* <img src={adminpic} height={200} width={800}/> */}
                <nav>
                    <ul>
                        <li>
                            <Link to ="adminlogin">Login</Link>
                        </li>
                        <li>
                            <Link to ="adminreg"> Registration</Link>
                        </li>
                    </ul>
                   
                </nav>
                <Outlet/>
            </center>
        </div>
    )
} export default AdminMain;

