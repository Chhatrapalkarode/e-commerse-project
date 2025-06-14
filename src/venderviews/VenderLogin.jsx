import React, { useEffect, useState } from "react";
import axios from "axios";
import VenderHome from "./VenderHome";
import ReactDOM from "react-dom/client";
import Cookies from 'js-cookie';//install the cookies = npm install js-cookie --save
import VenderReg from "./VenderReg";
function VenderLogin(){
    const[uid,setUId]=useState();
    const [upass,setUPass]=useState();
    const [ischecked,setISChecked]=useState(false);
    const handleUIdText=(evt)=>{
        setUId(evt.target.value )

    }
    const handleUPass=(evt)=>{
        setUPass(evt.target.value);
    }
    useEffect(()=>{
       var myccokies=Cookies.get('vauth');
       if(myccokies!=undefined){
        var obj=JSON.parse(myccokies);
        setUId(obj.username);
        setUPass(obj.password);
       }
    },[])
    const handleLoginButton=()=>{
        var obj={
            // VUserId:uid,
            // VUpass:upass
            vuid:uid,
            vupass:upass
        };
        axios.post("http://localhost:9669/vender/login",obj).then((res)=>{
            if(res.data.VUserId!=undefined){
                if(res.data.Status=="Inactive"){
                    alert("user not active please wait for admin activation  process");
                    return;
                }
                // cookies handling code 
                if(ischecked==true){
                    const userData={
                        username:uid,
                        password:upass
                    };
                    const expirationTime=new Date
                    (new Date().getTime()+6000000);
                    // store data is cookies
                    Cookies.set('vauth',JSON.stringify(userData),{expires:expirationTime});
                }
                // seassion handling code
                const userSessionData={
                    vuserfullname:res.data.VenderName
                };
                const sessionexpirationTime=new Date(new Date().getTime()+60000);
                //  data store in session 
                sessionStorage.setItem('vsessionauth',JSON.stringify(userSessionData),sessionexpirationTime);
                const root=ReactDOM.createRoot(document.getElementById('root'));
                var obj={
                    vfname:res.data.VenderName,     //VenderName
                    vpicname:res.data.VPicname,  //VPicName
                    vid:res.data.Vid
                }
                // alert("vender Id"+obj.vid)
                root.render(<VenderHome data={obj}/>)
            }
            else{
                alert("invalid id/password ");
            }
        });
    }
    const handleIsRember=()=>{
        setISChecked(true);
     //setIsChecked(!isChecked);

    }
    const handleregistartion=()=>{
        const root=ReactDOM.createRoot(document.getElementById('root'));
        root.render(<VenderReg/>)
    }

return(
    <div>
        <center>
            <h4 style={{backgroundColor:"yellow"}}> Vendor login  form </h4>
            <div className="jumbotron" style={{marginLeft:20,marginRight:20,borderRadius:5}}> 
                <table>
                    <tr>
                        <td>
                            user id 
                        </td>
                        <td><input type="text" className="form-control" onChange={handleUIdText} value={uid}/></td>
                    </tr>
                    <tr>
                        <td>
                            password
                        </td>
                        <td> <input type="password" onChange={handleUPass} value={upass} className="form-control"/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td> <input type="checkbox" onClick={handleIsRember}/> <spane> Remember me </spane></td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit" className="btn btn-success" onClick={handleLoginButton} >login </button>
                        </td>
                        <td>
                            <button type="submit" className="btn btn-danger " onClick={handleregistartion} >registartion </button>
                        </td>

                    </tr>
                </table>

            </div>
        </center>
    </div>
)
}

export default VenderLogin;
//chat
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import VenderHome from "./VenderHome";
// import ReactDom from "react-dom/client";
// import Cookies from 'js-cookie';
// import VenderReg from "./VenderReg";

// function VenderLogin() {
//   const [uid, setUId] = useState('');
//   const [upass, setUPass] = useState('');
//   const [isChecked, setIsChecked] = useState(false); // Updated to store checkbox state

//   const handleUIdText = (evt) => {
//     setUId(evt.target.value);
//   };

//   const handleUPass = (evt) => {
//     setUPass(evt.target.value);
//   };

//   useEffect(() => {
//     var myCookies = Cookies.get('vauth');
//     if (myCookies !== undefined) {
//       var obj = JSON.parse(myCookies);
//       setUId(obj.username);
//       setUPass(obj.password);
//     }
//   }, []);

//   const handleLoginButton = () => {
//     const obj = {
//       VUserId: uid,
//       VUpass: upass
//     };

//     axios.post("http://localhost:9669/vender/login", obj).then((res) => {
//       if (res.data.VUserId !== undefined) {
//         if (res.data.Status === "Inactive") {
//           alert("User not active. Please wait for admin activation process.");
//           return;
//         }
        
//         // Cookies handling
//         if (isChecked) {
//           const userData = {
//             username: uid,
//             password: upass
//           };
//           const expirationTime = new Date(new Date().getTime() + 6000000);
//           Cookies.set('vauth', JSON.stringify(userData), { expires: expirationTime });
//         }

//         // Session handling
//         const userSessionData = {
//           vuserfullname: res.data.VenderName
//         };
//         sessionStorage.setItem('vsessionauth', JSON.stringify(userSessionData));

//         const root = ReactDom.createRoot(document.getElementById('root'));
//         const obj = {
//           vfname: res.data.VenderName,
//           vpicname: res.data.VPicName,
//           vid: res.data.Vid
//         };
//         alert("Vender Id: " + obj.vid);
//         root.render(<VenderHome data={obj} />);
//       } else {
//         alert("Invalid ID/Password.");
//       }
//     });
//   };

//   const handleIsRemember = () => {
//     setIsChecked(!isChecked); // Toggle the checkbox state
//   };

//   const handleRegistration = () => {
//     const root = ReactDom.createRoot(document.getElementById('root'));
//     root.render(<VenderReg />);
//   };

//   return (
//     <div>
//       <center>
//         <h4 style={{ backgroundColor: "yellow" }}>Vendor Login Form</h4>
//         <div className="jumbotron" style={{ marginLeft: 20, marginRight: 20, borderRadius: 5 }}>
//           <table>
//             <tbody>
//               <tr>
//                 <td>User ID</td>
//                 <td><input type="text" className="form-control" onChange={handleUIdText} value={uid} /></td>
//               </tr>
//               <tr>
//                 <td>Password</td>
//                 <td><input type="password" onChange={handleUPass} value={upass} className="form-control" /></td>
//               </tr>
//               <tr>
//                 <td></td>
//                 <td>
//                   <input type="checkbox" onClick={handleIsRemember} checked={isChecked} />
//                   <span> Remember me</span>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <button type="submit" className="btn btn-success" onClick={handleLoginButton}>Login</button>
//                 </td>
//                 <td>
//                   <button type="submit" className="btn btn-danger" onClick={handleRegistration}>Registration</button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </center>
//     </div>
//   );
// }

// export default VenderLogin;
