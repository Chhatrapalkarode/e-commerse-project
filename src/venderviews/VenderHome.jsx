import React, { useEffect, useState } from "react";
import VenderLogin from "./VenderLogin";
import ReactDOM from 'react-dom/client'
import Product from "../productviews/Product";
function VenderHome(props){
    const [vendname,setVendName]=useState();
    useEffect(()=>{
    var obj=JSON.parse(sessionStorage.getItem('vsessionauth'));
    if(obj!=undefined&&obj!=null)
    {
        setVendName(obj.vuserfullname);
    }
    else{
        alert('vender session expired');
    }
})
    const handleAddProductButton=()=>{
    const root=ReactDOM.createRoot(document.getElementById('root'))
    root.render(<Product data={props.data.vid}/>)//
 }
const handleLogout=()=>{
sessionStorage.removeItem('vsessionauth');
alert("vender session closed ");
const root =ReactDOM.createRoot(document.getElementById('root'));
root.render(<VenderLogin/>);

}
return(
    <div>
        <p> current session running for {vendname}</p>
        <h4> Vender Home page </h4>
        <h5> vender id {props.data.vid}</h5>
        <h5> welcome {props.data.vfname} </h5>
        <img src={"http://localhost:9669/vender/getimage/"+props.data.vpicname}  heigth={100} width={100}/>
       
       
        <button onClick={handleAddProductButton}> manage product </button>
        <button type="submit" className="btn btn-secondary" onClick={handleLogout}>logout</button>
    </div>
);
}export default VenderHome;
