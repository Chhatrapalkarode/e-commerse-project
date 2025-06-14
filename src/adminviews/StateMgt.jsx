import React, { useEffect, useState } from "react";
import axios  from "axios";
function StateMgt(){
    const [stid,setStId]=useState();
    const [stname,setStName]=useState();
    const [status,setStatus]=useState();
    const [stlist,setStList]=useState([])
     const handleStNameText=(evt)=>{
        setStName(evt.target.value);
     }
     const handleSttidText=(evt)=>{
        setStId(evt.target.value);
     }
    
     const handleStatusText=(evt)=>{
        setStatus(evt.target.value);
     }
     const handleSaveButton=()=>{
        var obj={
            StId:stid,
            StName:stname,
            Status:status
 
        };
        axios.post("http://localhost:9669/state/save",obj).then((res)=>{
            alert(res.data);

        }).catch((err)=>{
            alert(err)
        })
     }
     const handleButton=()=>{
        axios.get("http://localhost:9669/state/search/"+stid).then((res)=>{
            setStId(res.data.stid)
            setStName(res.data.stname)
            setStatus(res.data.status)
        }).catch((err)=>{
            alert(err);

        })
     }
    //  search data 
     const handlesearchbutton=()=>{
       
        axios.get("http://localhost:9669/state/search/"+stid).then((res)=>{

           if(res.data.StId!==undefined){
            setStId(res.data.StId)
            setStName(res.data.StName)
            setStatus(res.data.Status)

           }
           else{
            alert("data not found")
           }

        }).catch((err)=>{
            alert(err)
        })
     }



    

    
    //  update button

    const handleupdatebutton=()=>{
        var obj={
            StId:stid,
            StName:stname,
            Status:status

        };
       
        axios.put("http://localhost:9669/state/update",obj).then((res)=>{
          alert(res.data);

        }).catch((err)=>{
            alert(err)
        })
     }
    //  delete 
    const handledeletebutton=()=>{
       
       
        axios.delete("http://localhost:9669/state/delete/"+stid).then((res)=>{
          alert(res.data);

        }).catch((err)=>{
            alert(err)
        })
     }
    //   show button 

    const handleshowAllbutton=()=>{
        axios.get("http://localhost:9669/state/show").then((res)=>{
            setStList(res.data);
  
          }).catch((err)=>{
              alert(err)
          })
    }
    // code to set state id automatically 
    useEffect(()=>{
    
        axios.get("http://localhost:9669/state/show").then((res)=>{
            setStId(res.data.length+1);
  
          }).catch((err)=>{
              alert(err)
          })
    },[])
    // useEffect(() => {
    //     axios.get("http://localhost:9669/state/show")
    //         .then((res) => {
    //             setStId(res.data.length + 1); // Consider a better way to manage IDs
    //         })
    //         .catch((err) => {
    //             alert(err);
    //         });
    // });
    return(
        <div>
            <center>
                <h2 style={{backgroundColor:"green",color:"white"}}>  manage state</h2>
                <table>
                   <tr>
                    <td> state id </td>
                    {/* <td> {stid}</td> */}
                    <td> <input type="text" onChange={handleSttidText} value={stid}/></td>
                   </tr>
                   <tr>
                    <td> state name</td>
                    <td> <input type="text"   value={stname}  onChange={handleStNameText}/></td>
                   </tr>
                   <tr>
                    <td> status </td>
                  
                    <select type="submit" value={status} onChange={handleStatusText}>
                    <option>
                select status
                    </option>
                    <option value={"Active"}>
                active
                    </option>
                    <option value={"Inactive"}>Inactive  </option>
                    </select>
                   </tr>
                </table>
                <table>
                    <tr>
                        <td> <button type="submit" onClick={handleSaveButton}> save </button></td>
                        <td> <button type="submit" onClick={handlesearchbutton}> search </button></td>
                        <td> <button type="submit" onClick={handleupdatebutton}> update </button></td>
                        <td> <button type="submit" onClick={handledeletebutton}> delete</button></td>
                        <td> <button type="submit" onClick={handleshowAllbutton}> show  </button></td>
                    </tr>
                </table>
                <h4> list os state</h4>
                <table>
                    <tr>
                        <th> state id </th>
                        <th> state name </th>
                        <th> status </th>
                    </tr>
                    {
                        stlist.map((item)=>(
                            <tr>
                                <td>  {item.StId}</td>
                                <td>  {item.StName}</td>
                                <td>  {item.Status}</td>
                                </tr>
                        ))

                       
                    }
                </table>
            </center>
        </div>
    )
} export default StateMgt;