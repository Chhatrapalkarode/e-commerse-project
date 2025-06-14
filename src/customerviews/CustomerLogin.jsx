import React,{useEffect, useState} from "react";
import axios from "axios";
import ReactDOM from 'react-dom/client';
import CustomerHome from "./CustomerHome";
import Cookies from 'js-cookie';
function CustomerLogin(){
    const [uid,setUId]=useState();
    const [upass,setUPass]=useState();
    const [ischecked,setIsChecked]=useState(false);
    const handleUIdTEXt=(evt)=>{
        setUId(evt.target.value);
    }
    const handleUPass=(evt)=>{
        setUPass(evt.target.value);
    }
    useEffect(()=>{
        var mycookies=Cookies.get('auth');
        if(mycookies!=undefined){
            var obj=JSON.parse(mycookies);
            setUId(obj.username);
            setUPass(obj.password);
        }

    },[])
    const handleLoginButton=()=>{
        
        var obj={
            CUserId:uid,
            CUserPass:upass
        }
        axios.post("http://localhost:9669/customer/login",obj).then((res)=>{
            if(res.data.CUserId!=undefined){
                if(res.data.Status=="Inactive"){
                    alert("user not active please wait for activation process ");
                    return;

                }
                // cookies  handling code
                if(ischecked==true){
                    const userData={
                        username:uid,
                        password:upass

                    };
                    const expirationTime=new Date(new Date().getTime()+6000000);
                    // store data in cookies 
                    Cookies.set('auth',JSON.stringify(userData),{expires:expirationTime});
                   
                }
                // session handling code
                const userSessionData={
                    userfullname:res.data.CustomerName
                };
               const sessionexpirationTime=new Date(new Date().getTime()+60000);
               //store data in session 
              
                sessionStorage.setItem('sessionauth',JSON.stringify(userSessionData),sessionexpirationTime);
               
                const root=ReactDOM.createRoot(document.getElementById("root"));
                var obj={
                    cfname:res.data.CustomerName,
                    cpic:res.data.CPicName,  
                    cid:res.data.Cid
                }
              root.render(<CustomerHome data={obj}/>)
                
               
            }
            else{
                alert("invalid user id/password");
            }
        });
    }
    const handleISRemember=()=>{
        setIsChecked(true);
    }
    return(
        <div>
            <center>
                <div className="jumbotron"></div>
                <h4 style={{backgroundColor:"red",color:"black"}}> customer login page </h4>
                <table>
                    <tr>
                        <td> user id</td>
                       <td> <input type="text" className="form-control" onChange={handleUIdTEXt} value={uid}/></td>
                    </tr>
                    <tr>
                        <td> user password </td>
                        <td> <input type="password" className="form-control" onChange={handleUPass} value={upass}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td> <button  type="submit" onClick={handleLoginButton}> submit</button></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td> <input type="checkbox" onClick={handleISRemember}/><span>remember me </span></td>
                    </tr>
                    
                </table>

            </center>
        </div>
    )
}export default CustomerLogin;



