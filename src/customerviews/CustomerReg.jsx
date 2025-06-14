import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import CustomerLogin from "./CustomerLogin";


function CustomerReg(){
    const [cuserid,setCUserId]=useState();
    const [cuserpass,setCUserPass]=useState();
    const [customername,setCustomerName]=useState();
    const [stid,setStId]=useState();
    const [ctid,setCtId]=useState();
    const [caddress,setCAddress]=useState();
    const [ccontact,setCContact]=useState();
    const [cemail,setCEmail]=useState();
    const [cpicname,setCPicName]=useState();
    const [cid,setCId]=useState();
    const [image,setImage]=useState({preview:'',data:''});
    const [status,setStatus]=useState();
    const [stlist,setStList]=useState([]);
    const [ctlist,setCtList]=useState([]);
    const handleUseridText=(evt)=>{
        setCUserId(evt.target.value);
    }
    const handleCuserpass=(evt)=>{
        setCUserPass(evt.target.value);
    }
    const handleCustomername=(evt)=>{
        setCustomerName(evt.target.value);
    }
    const handleStidSelect=(evt)=>{
        setStId(evt.target.value);
        axios.get("http://localhost:9669/city/showallcitybystate/"+evt.target.value).then((res)=>{
            setCtList(res.data);  // /showallcitybystate/    showcitybystate/
        }).catch((err)=>{
            alert(err);
        });
    }
    const handleCtIdselect=(evt)=>{
        setCtId(evt.target.value);
    }
    const handleCaddress=(evt)=>{
        setCAddress(evt.target.value);
    }
    const handleCContact=(evt)=>{
        setCContact(evt.target.value)
    }
    const handleCEmail=(evt)=>{
        setCEmail(evt.target.value);
    }
    const handleCidText=(evt)=>{
        setCId(evt.target.value);
    }
    useEffect(()=>{
        axios.get("http://localhost:9669/customer/getcustomercount/").then((res)=>{
            setCId(res.data.length+1);
        }).catch((err)=>{
            alert(err)
        });
        axios.get("http://localhost:9669/state/show/").then((res)=>{
            setStList(res.data);
        }).catch((err)=>{
            alert(err);
        });
    },[])
    const handleRigistrationButton=async()=>{
        var obj={
            CUserId:cuserid,
            CUserPass:cuserpass,
            CustomerName:customername,
            StId:stid,
            CtId:ctid,
            CAddress:caddress,
            CContact:ccontact,
            CEmail:cemail,
            CPicName:cpicname,
            Cid:cid,
            Status:"active"
           
        }
        // let formData = new FormData();
        // formData.append('file', image.data);
    
        // try {
        //     const response = await axios.post('http://localhost:9669/customer/savecustomerimage',formData, {
        //         headers: { 'Content-Type': 'multipart/form-data' }
        //     });
        //     if (response.status === 200) {
        //         setStatus("File uploaded successfully");
        //         alert("file is uploaded susscessfully ")
        //     } else {
        //         setStatus("Failed to upload file");
        //         alert("Failed to upload file")
        //     }
        // } catch (error) {
        //     setStatus("Failed to upload file");
        //     alert("Failed to upload file 22")
        // }
        axios.post("http://localhost:9669/customer/register/",obj).then((res)=>{
            alert(res.data);
            
           
            if(res.data=="registration successfully"){
               
                axios.post("http://localhost:9669/email/sendemails/"+cemail).then((res)=>{
                   
                   // alert(res.data);
                    
                }).catch((err)=>{
                    alert(err);
                })
            }
           
        }).catch((err)=>{
            alert(err);
        });
    }  

    
    




   // browser and save image code
    const handleSubmit=async (evt)=>{
        evt.preventDefault()
        let formData=new FormData()
        formData.append('file',image.data);
        const response=await fetch('http://localhost:9669/customer/savecustomerimage',{
            method:'POST',
            body:formData,
        })
        if(response){
            if(response.status==200){
                setStatus("file uploaded successfully");
                alert("file uploaded successfully");
            }
            else{
                alert("failed to upload file ");
                setStatus("failed to upload file ")
            }
        }

    }
    
    // file change 
    const handleFilechange = (evt) => {
        const img = {
            preview: URL.createObjectURL(evt.target.files[0]),
            data: evt.target.files[0]
        };
        setImage(img)
        setCPicName(evt.target.files[0].name);
        
    }
    const handleLogin=()=>{
      
        const root=ReactDOM.createRoot(document.getElementById('root'));
        root.render(<CustomerLogin/>)
   }
    return(
        <div>
            <center>
                { <p style={{backgroundColor:"yellow",color:"blue"}}>customer form </p> }
                <table>
                    <tr>
                        <td> customer id</td>
                        <td>{cid}</td>

                    </tr>
                    <tr>
                        <td> user id </td>
                        <td> <input type="text" onChange={handleUseridText} className="form-control"/></td>
                    </tr>
                    <tr>
                        <td> password</td>
                        <td> <input type="password" onChange={handleCuserpass} className="form-control"/></td>
                    </tr>
                    <tr>
                        <td> customer name </td>
                        <td> <input type="text" onChange={handleCustomername} className="form-control"/></td>
                    </tr>
                    <tr>
                        <td> state </td>
                        <select onClick={handleStidSelect}>
                            {
                                stlist.map((items)=>(
                                    <option value={items.StId}>{items.StName}</option>
                               ))
                            }
                        </select>
                    </tr>
                    <tr>
                        <td>
                            city
                        </td>
                        <td>
                            <select onClick={handleCtIdselect}>
                                {
                                    ctlist.map((items)=>(
                                        <option value={items.ctid}>{items.ctname}</option>
                                    ))
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td> address </td>
                        <td> <input type="text" onChange={handleCaddress} className="form-control"/></td>
                    </tr>
                    <tr>
                        <td> contact </td>
                        <input type="number" maxLength={10} minLength={10} onChange={handleCContact} className="form-control"/>
                    </tr>
                    <tr>
                        <td> email</td>
                        <td> <input type="email" onChange={handleCEmail} className="form-control"/></td>
                    </tr>
                    <tr>
                        <td> select photo </td>
                        <td>
                            <input type="file" onChange={handleFilechange} name="file"/>
                            { <img src={image.preview}width="100" height="100"/> }
                            {/* {image.preview && <img src={image.preview} width="100" height="100" />} */}

                        </td>
                    </tr>
                <tr>
                <td> click to upload customer photo </td>
                <td> <button type="submit" onClick={handleSubmit}>submit</button></td>
                <td> <button type="submit" onClick={handleRigistrationButton}>registration </button></td>
                <td> <button type="submit "onClick={handleLogin} className="btn btn-danger">login </button></td>
                </tr>
                </table>
            </center>
        </div>
    );
}export default CustomerReg;

//const handleSubmit=async (evt)=>{
 //  evt.preventDefault();
        //         let formData = new FormData();
        //         formData.append('file', image.data);
            
        //         try {
        //             const response = await axios.post('http://localhost:9669/customer/savecustomerimage',formData, {
        //                 headers: { 'Content-Type': 'multipart/form-data' }
        //             });
        //             if (response.status === 200) {
        //                 setStatus("File uploaded successfully");
        //                 alert("file is uploaded susscessfully ")
        //             } else {
        //                 setStatus("Failed to upload file");
        //                 alert("Failed to upload file")
        //             }
        //         } catch (error) {
        //             setStatus("Failed to upload file");
        //             alert("Failed to upload file 22")
        //         }
    


