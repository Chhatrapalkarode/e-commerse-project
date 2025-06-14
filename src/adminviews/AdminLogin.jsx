import React ,{useState} from "react"
// import {Link , Outlet} from "react-router-dom"
import AdminHome from "./AdminHome"
import ReactDOM from "react-dom/client"

function AdminLogin(){

    const[uid , setUId]=useState()
    const[upass , setUPass]=useState()

    const handleUIdText = (evt) => {
        setUId(evt.target.value)
    }
    const handleUPassText = (evt) => {
        setUPass(evt.target.value)
    }
    const handleLoginButton = () =>{
        if(uid=="admin" && upass=="abc@123"){
            alert("Login Success")
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(<AdminHome/>)
    }else{
        alert("Invalid ID or Password")
    }
}
return(
    <div>
        <center>
            <h4 style={{backgroundColor:"sky blue"}} >Administrator Login</h4>
            <table>
                <tr>
                    <td>User Id</td>
                    <td><input type="text" onChange={handleUIdText} className="form-control"/></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td> <input type="password" onChange={handleUPassText} className="form-control"/></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button type="submit" className="btn btn-success" onClick={handleLoginButton}>  
                            Login
                        </button>
                    </td>
                </tr>
            </table>
        </center>
    </div>
)


}export default AdminLogin ;
