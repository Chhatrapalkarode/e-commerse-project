import React, { useEffect, useState } from "react";
import axios from "axios";
function ShowBills(){
    const [custlist,setCustList]=useState([]);
    const [ billdetailslist,setBillDetailsList]=useState([]);
    const [plist,setPList]=useState([]);
    var pname=""
    var oprice=0;
    var total=0;
    var picname="";
    const [prevbillid,setPrevbillid]=useState(0);
    var prbid=0;
    var k=true;
    //const [count,setCount]==useState(0);
    var count=0;
    useEffect(()=>{
        // get customer from db 
        axios.get("http://localhost:9669/customer/getcustomerlist").then((res)=>{
            setCustList(res.data);
        }).catch((err)=>{
            alert(err);
        })
        //get product details from db 
        axios.get("http://localhost:9669/product/showproduct").then((res)=>{
            setPList(res.data);
        }).catch((err)=>{
            alert(err)
        });
        //get total amount from db
        axios.get("http://localhost:9669/paymentdetails/showpaymentdetails").then((res)=>{
            //setPList(res.data);
        }).catch((err)=>{
            alert(err);
        })
    },[]);
    const handleCustomerSelect=(evt)=>{
        axios.get("http://localhost:9669/bill/billshow/"+evt.target.value).then((res)=>{
            // axios.get("http://localhost:9669/bill/billshow").then((res)=>{
           

            setBillDetailsList(res.data);
            setPrevbillid(res.data[0].billid);//
            prbid=res.data[0].billid;
            alert("first bill id"+res.data[0].billid+"k="+k);
        }).catch((err)=>{
           
            alert(err);
        })
    }
   
    return(
        <div>
            <center>
                <p> Bill list Admin view</p>
                <table >
                <tr>
                    <td> customer </td>
                    <td>
                        <select onClick={handleCustomerSelect}>
                            {
                                custlist.map((item)=>(
                                    <option value={item.Cid}>{item.CustomerName+" "+item.Cid}</option>
                                ))
                            }
                        </select>
                    </td>
                </tr>
                
                </table>
                <table border={1}>
                    <tr>
                        <th> bill id</th>
                        <th> customer id</th>
                        <th> bill date</th>
                        <th> product name </th>
                        <th> product image</th>
                    </tr>
                    {
                        billdetailslist.map((bitem)=>(
                            <tr style={{backgroundColor:"beige"}}>
                                <td> {bitem.billid }</td>
                                <td> {bitem.cid}</td>
                                <td>{bitem.billdate}</td>
                                {
                                    plist.filter((pitem)=>{
                                        if(bitem.pid==pitem.pid){

                                            if(bitem.billid!=prbid){
                                                prbid=bitem.billid;
                                                total=0;
                                                k=true;
                                            }
                                            if(bitem.billid==prbid){
                                                k=false;
                                            }
                                            pname=pitem.pname;
                                            oprice=pitem.oprice;
                                            total=total+parseInt(pitem.oprice);
                                            picname=pitem.ppicname
                                        }
                                    })
                                }
                                <td> {pname}</td>
                                <td>{ oprice}</td>
                                <td>
                                    <img src={"http://localhost:9669/product/getproductimage/"+picname}height="100" width="100" />
                                    <p style={{backgroundColor:"yellow"}}> {k==true?'':total}</p>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </center>
        </div>
    )
}export default ShowBills;


