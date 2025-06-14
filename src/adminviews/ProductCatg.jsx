import React,{useState} from "react";
import axios from "axios";
import { useEffect } from "react";
function ProductCatg(){
    const [pcatgid,setPCatgId]=useState();
    const[pcatgname,setPCatgName]=useState();
    const [pcatglist,setPcatgList]=useState([])
    const handlePCatgName=(evt)=>{
        setPCatgName(evt.target.value);
    }
    useEffect(()=>{
        axios.get("http://localhost:9669/productcatg/show").then((res)=>{
            setPCatgId(res.data.length+1);// this code will set product category id automatically

        }).catch((err)=>{
            alert(err);
        })
        
    
    });
  
    const handleSaveButton=()=>{
        var obj={
            PCatgId:pcatgid,
            PCatgName:pcatgname
        }
        axios.post("http://localhost:9669/productcatg/save",obj).then((res)=>{
            alert(res.data)


        }).catch((err)=>{
            alert(err)
        })
    }
    const handleshowbutton=()=>{
        axios.get("http://localhost:9669/productcatg/show").then((res)=>{
            setPcatgList(res.data)


        }).catch((err)=>{
            alert(err)
        })

    }
    return(
        <div>
            <center>
                <h4> manage product category</h4>
                <table>
                    <tr>
                        <td>
                            product category id
                        </td>
                        <td> {pcatgid}</td>
                    </tr>
                    <tr>
                        <td>
                            product category name
                        </td>
                        <td><input type=" text" onChange={handlePCatgName}/></td>

                    </tr>
                    <tr>
                        <td></td>
                        <td><button type=" submit" onClick={handleSaveButton}>save </button></td>
                        <td> <button type="submit" onClick={handleshowbutton}>show</button></td>
                    </tr>
                    
                </table>
                <h4> product category list</h4>
                <table>
                    <tr>
                        <th> category id</th>
                        <th> category name</th>
                    </tr>
                    {
                        pcatglist.map((item)=>(
                            <tr>
                                <td>{item.PCatgId}</td>
                                <td> {item.PCatgName}</td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    )
    
}
export default ProductCatg;