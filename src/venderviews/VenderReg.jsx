import React, { useEffect, useState } from "react";
import axios from "axios";
import VenderLogin from './VenderLogin'  

import ReactDOM from "react-dom/client";
// import { preview } from "vite";
function VenderReg(){
    const [vuserid,setVUserId]=useState('');
    const [vuserpass,setVUserPass]=useState();
    const [vendername,setVenderName]=useState();
    const [vaddress,setVAddress]=useState();
    const [vcontact,setVContact]=useState('');
    const [vemail,setVEmail]=useState();
    const [vpicname,setVPicName]=useState();
    const [vid,setVid]=useState();
    const [image,setImage]=useState({preview:'',data:''});
    const [status,setStatus]=useState();
    const handleVuserIdtext=(evt)=>{
        setVUserId(evt.target.value);
    }
    const handleVuserpass = (evt) => {
        setVUserPass(evt.target.value);
    }
    
    const handleVNametext=(evt)=>{
        setVenderName(evt.target.value);
    }
    const handleVadress = (evt) => {
        setVAddress(evt.target.value);
    }
    
    const handleVContact=(evt)=>{
        setVContact(evt.target.value);

    }
    const handleVid=(evt)=>{
        setVid(evt.target.value);
    }
    const handleEmail=(evt)=>{
        setVEmail(evt.target.value);
    }
    useEffect(()=>{
        axios.get("http://localhost:9669/vender/getvendercount/").then((res)=>{
            setVid(res.data.length+1);
        }).catch((err)=>{
            alert(err);
        })
    },[]);
    const handleRegistrationButton=()=>{
        var obj={
            VUserId:vuserid,
            VUserPass:vuserpass,  //VUserPass
            VenderName:vendername,
            VAddress:vaddress,
            VContact:vcontact,
            VEmail:vemail,
            VPicname:vpicname,  // VPicname   VPicName
            Vid:vid,               //Vid
            Status:"Active"   //Status   Inactive
        
        } //

        axios.post("http://localhost:9669/vender/register", obj).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err)
        })
    }
    // browser andn save image code 
    // const handlesubmit=async (evt)=>{
    //     //alert("first")
    //     evt.preventDefault();
    //     let formData=new FormData();
    //     formData.append('file',image.data);
    //     const response=await fetch("http:localhost:9669/vender/savevenderimage",{
    //         method:'POST',
    //         body:formData,
    //     });
       
    //     if(response){

    //         if(response.statusText=="ok"){
    //             setStatus("file is uploaded susscessfully")
    //             alert("file is uploaded susscessfully ")
    //         }
    //         else{
    //             setStatus("failed to upload file  ")
    //             alert("failed to upload file")
    //         }
    //     }

    // }


    
    // chat 
    const handlesubmit = async (evt) => {
    evt.preventDefault();
    let formData = new FormData();
    formData.append('file', image.data);

    try {
        const response = await axios.post("http://localhost:9669/vender/savevenderimage", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.status === 200) {
            setStatus("File uploaded successfully");
            alert("file is uploaded susscessfully ")
        } else {
            setStatus("Failed to upload file");
            alert("Failed to upload file")
        }
    } catch (error) {
        setStatus("Failed to upload file");
        alert("Failed to upload file 22")
    }
}

    
    const handleFileChange=(evt)=>{
        const img={
            preview:URL.createObjectURL(evt.target.files[0]),
            data:evt.target.files[0]
        };
        setImage(img)
        setVPicName(evt.target.files[0].name);
    }

    
    const handleLogin=()=>{
         const root=ReactDOM.createRoot(document .getElementById('root'));
         root.render(<VenderLogin/>)
    }
    return(
        <div>
            <center>
                <p style={{color:"blue"}}> Vender  Registration form </p>
                <div className="jumbotron" style={{marginLeft:20}}>
                    <table>
                        <tr>
                            <td>
                                Vender Id
                            </td>
                            <td> {vid}</td>
                        </tr>
                         <tr>
                            <td>
                               User id 
                            </td>
                            <td> <input type="text" onChange={handleVuserIdtext} className="form-control"/></td>
                        </tr>
                         <tr>
                            <td>
                               password 
                            </td>
                            <td> <input  type="password" onChange={handleVuserpass}className="form-control"/></td>
                        </tr>
                         <tr>
                            <td>
                              vender name  
                            </td>
                            <td> <input  type="text" onChange={handleVNametext}className="form-control"/></td>
                        </tr>
                        <tr>
                            <td>
                              AdDRESS 
                            </td>
                            <td> <input  type="text" onChange={handleVadress}className="form-control"/></td>
                        </tr>
                        <tr>
                            <td>
                              CONTACT  
                            </td>
                            <td> <input  type="number" maxLength={10} minLength={10} onChange={handleVContact}className="form-control"/></td>
                        </tr>
                        <tr>
                            <td>
                             Email 
                            </td>
                            <td> <input  type="email" onChange={handleEmail}className="form-control"/></td>
                        </tr>
                        
                        <tr>
                            <td>
                            select photo  
                            </td>
                            <td> <input  type="file" onChange={handleFileChange}className="form-control"/> 
                            <img src={image.preview} width='100' height='100' alt="preview"/></td>
                        </tr>
                        
                        
                        <tr>
                            <td>
                           click to upload vendor photo 
                            </td>
                            <td><button type="submit" onClick={handlesubmit} className="btn btn-danger">
                                upload </button>  </td>
                        </tr>
                        <tr>
                            
                            <td> <button type="submit" onClick={handleRegistrationButton} className="btn btn-success">registration </button></td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit " onClick={handleLogin} className="btn btn-danger">login </button>
                            </td>
                        </tr>

                    </table>
                </div>
            </center>
        </div>
    );
}export default VenderReg;
//chat 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import VenderLogin from './VenderLogin';  
// import ReactDOM from "react-dom/client";

// function VenderReg() {
//     const [vuserid, setVUserId] = useState('');
//     const [vuserpass, setVUserPass] = useState('');
//     const [vendername, setVenderName] = useState('');
//     const [vaddress, setVAddress] = useState('');
//     const [vcontact, setVContact] = useState('');
//     const [vemail, setVEmail] = useState('');
//     const [vpicname, setVPicName] = useState('');
//     const [vid, setVid] = useState('');
//     const [image, setImage] = useState({ preview: '', data: '' });
//     const [status, setStatus] = useState('');

//     const handleVuserIdtext = (evt) => {
//         setVUserId(evt.target.value);
//     };

//     const handleVuserpass = (evt) => {
//         setVUserPass(evt.target.value);
//     };

//     const handleVNametext = (evt) => {
//         setVenderName(evt.target.value);
//     };

//     const handleVadress = (evt) => {
//         setVAddress(evt.target.value);
//     };

//     const handleVContact = (evt) => {
//         setVContact(evt.target.value);
//     };

//     const handleEmail = (evt) => {
//         setVEmail(evt.target.value);
//     };

//     const handleFileChange = (evt) => {
//         const img = {
//             preview: URL.createObjectURL(evt.target.files[0]),
//             data: evt.target.files[0]
//         };
//         setImage(img);
//         setVPicName(evt.target.files[0].name);
//     };

//     useEffect(() => {
//         axios.get("http://localhost:9669/vender/getvendercount/")
//             .then((res) => {
//                 setVid(res.data.length + 1);
//             }).catch((err) => {
//                 alert(err);
//             });
//     }, []);

//     const handleRegistrationButton = () => {
//         const obj = {
//             VUserId: vuserid,
//             VUserPass: vuserpass,
//             VenderName: vendername,
//             VAddress: vaddress,
//             VContact: vcontact,
//             VEmail: vemail,
//             VPicName: vpicname,
//             Vid: vid,
//             Status: "Inactive"
//         };

//         axios.post("http://localhost:9669/vender/register", obj)
//             .then((res) => {
//                 alert(res.data);
//             }).catch((err) => {
//                 alert("Error: " + err);
//             });
//     };

//     const handlesubmit = async (evt) => {
//         evt.preventDefault();
//         let formData = new FormData();
//         formData.append('file', image.data);

//         try {
//             const response = await axios.post("http://localhost:9669/vender/save", formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });

//             if (response.status === 200) {
//                 setStatus("File uploaded successfully");
//             } else {
//                 setStatus("Failed to upload file");
//             }
//         } catch (error) {
//             setStatus("Failed to upload file");
//         }
//     };

//     const handleLogin = () => {
//         const root = ReactDOM.createRoot(document.getElementById('root'));
//         root.render(<VenderLogin />);
//     };

//     return (
//         <div>
//             <center>
//                 <p style={{ color: "blue" }}>Vendor Registration form</p>
//                 <div className="jumbotron" style={{ marginLeft: 20 }}>
//                     <table>
//                         <tbody>
//                             <tr>
//                                 <td>Vendor Id</td>
//                                 <td>{vid}</td>
//                             </tr>
//                             <tr>
//                                 <td>User Id</td>
//                                 <td><input type="text" onChange={handleVuserIdtext} className="form-control" /></td>
//                             </tr>
//                             <tr>
//                                 <td>Password</td>
//                                 <td><input type="password" onChange={handleVuserpass} className="form-control" /></td>
//                             </tr>
//                             <tr>
//                                 <td>Vendor Name</td>
//                                 <td><input type="text" onChange={handleVNametext} className="form-control" /></td>
//                             </tr>
//                             <tr>
//                                 <td>Address</td>
//                                 <td><input type="text" onChange={handleVadress} className="form-control" /></td>
//                             </tr>
//                             <tr>
//                                 <td>Contact</td>
//                                 <td><input type="number" maxLength={10} minLength={10} onChange={handleVContact} className="form-control" /></td>
//                             </tr>
//                             <tr>
//                                 <td>Email</td>
//                                 <td><input type="email" onChange={handleEmail} className="form-control" /></td>
//                             </tr>
//                             <tr>
//                                 <td>Select Photo</td>
//                                 <td>
//                                     <input type="file" onChange={handleFileChange} className="form-control" />
//                                     <img src={image.preview} width='100' height='100' alt="Preview" />
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>Click to Upload Vendor Photo</td>
//                                 <td><button type="submit" onClick={handlesubmit} className="btn btn-danger">Upload</button></td>
//                             </tr>
//                             <tr>
//                                 <td><button type="submit" onClick={handleRegistrationButton} className="btn btn-success">Register</button></td>
//                             </tr>
//                             <tr>
//                                 <td><button type="submit" onClick={handleLogin} className="btn btn-danger">Login</button></td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </center>
//         </div>
//     );
// }

// export default VenderReg;
