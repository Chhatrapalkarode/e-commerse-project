import React, { useEffect, useState } from "react";
import axios from "axios";
function VenderMgt(){
    const [venderlist,setVenderList]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:9669/vender/getvendercount").then((res)=>{
            setVenderList(res.data);
        }).catch(err=>{
            alert(err);
        });
    },[]);
    const handleActivebutton=(vid)=>{
        var newstatus="Active";
    axios.put("http://localhost:9669/vender/vendermanage/"+vid+"/"+newstatus).then((res)=>{
        alert(res.data);
    }).catch((err)=>{
        alert(err);
    })
    }
    const handleInactiveButton=(vid)=>{

        var  newstatus="Incative";
        axios.put("http://localhost:9669/vender/vendermanage/"+vid+"/"+newstatus).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        })

    }
    return(
        <div>
            <center>

                <h4> vender list </h4>
                <table border={1}>
                   <tr>
                   <th> Vid</th>
                    <th> vender name</th>
                    <th> status</th>
                    <th></th>
                    <th></th>
                   </tr>
                   {
                    venderlist.map((item)=>(
                        <tr>
                            <td>{item.Vid}</td>
                            <td>{item.VenderName}</td>
                            <td>{item.Status}</td>
                            <td> <button type="submit" onClick={()=>handleActivebutton(item.Vid)}>Active</button></td>
                            <td>
                                <button type="submit" onClick={()=>handleInactiveButton(item.Vid)}> Inactive</button>
                            </td>
                        </tr>
                    ))
                   }
                </table>
            </center>
        </div>
    );

    } export default VenderMgt;
