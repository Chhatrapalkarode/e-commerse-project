import React, { useEffect, useState } from "react";
import axios from "axios";

function Product(props) {
    const [pid, setPid] = useState();
    const [pname, setPName] = useState();
    const [pprice, setPPrice] = useState();
    const [oprice, setOPrice] = useState();
    const [ppicname, setPPicName] = useState();
    const [pcatgid, setPCatgId] = useState();
    const [pcatglist, setPCatgList] = useState([]);
    const [plist, setPList] = useState([]);
    const [image, setImage] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState();
    const [pcatgname, setPCatgName] = useState();
    var cname = "";
    var catgname = "";
    var venderid = props.data == undefined ? 0 : props.data;
    const handlePid = (evt) => {
        setPid(evt.target.value);

    }
    const handleOPrice = (evt) => {
        setOPrice(evt.target.value);
    }

    const handlePName = (evt) => {
        setPName(evt.target.value);
    }

    const handlePPrice = (evt) => {
        setPPrice(evt.target.value);
    }

    const handlePcatgSelect = (evt) => {
        setPCatgId(evt.target.value);
    }
  

    useEffect(() => {
        alert("VID=" + venderid);
        axios.get("http://localhost:9669/product/getmaxpid").then((res) => {
            setPid(res.data.length + 1);
        }).catch((err) => {
            alert(err);

        });
        axios.get("http://localhost:9669/productcatg/show").then((res) => {
            setPCatgList(res.data);
        }).catch((err) => {
            alert(err);
        });
    }, [])
    const handleSaveButton = () => {
        alert("save")
        var obj = {
            pid: pid,
            pname: pname,
            pprice: pprice,
            oprice: oprice,
            ppicname: ppicname,
            pcatgid: pcatgid,
            vid: venderid,
        //    status:status="active"
            status:"Active"


            //
        };
        axios.post("http://localhost:9669/product/saveproduct/", obj).then((res) => {
            alert("product saved ")
        }).catch((err) => {
            alert(err);
        });
    }
    const handleShowButton = () => {
        axios.get("http://localhost:9669/product/showproductvender/" + venderid).then((res) => {
        
            setPList(res.data);
        }).catch((err) => {
            alert(err);
        });
    }
  // brower and save the image code 
const handleSubmit = async (evt) => {
        evt.preventDefault();
        let formData = new FormData();
        formData.append('file', image.data);
    
        try {
            const response = await axios.post('http://localhost:9669/product/saveproductimage' ,formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 200) {
               // setStatus("File uploaded successfully");
               setStatus(status);
                alert("file is uploaded susscessfully ")
            } else {
               // setStatus("Failed to upload file");
               setStatus(status);
                alert("Failed to upload file")
            }
        } catch (error) {
            setStatus("Failed to upload file");
            alert("Failed to upload file 22")
        }
    }



        //also do this type
        // if (response && response.statusText === "OK") {
        //     setStatus("File uploaded successfully");
        // } else {
        //     setStatus("Failed to upload file");
        // }
    const handleFilechange = (evt) => {
        const img = {
            preview: URL.createObjectURL(evt.target.files[0]),
            data: evt.target.files[0]
        };
        setImage(img)
        setPPicName(evt.target.files[0].name);
    }
    // new botton 
    const handleNewButton = () => {
        axios.get("http://localhost:9669/product/getmaxpid").then((res) => {
            setPid(res.data.length + 1);
            setPName("");
            setPCatgId("");
            setPPrice("");
            setOPrice("");
            setOPrice("");
            setPPicName("");
            setImage("");
        }).catch((err) => {
            alert(err);
        });
    }
    return (
        <div>
            <center>
                <p> vendor id  {venderid}</p>
                <p style={{ backgroundColor:"green",color:"wheat"}}> product form </p>
                <div className="jumbotron">
                    <table>
                        <tr>
                            <td> product id </td>
                            <td> {pid}</td>

                        </tr>
                        <tr>
                            <td>
                                Product name
                            </td>
                            <td> <input type="text " onChange={handlePName} value={pname} /></td>
                        </tr>
                        <tr>
                            <td>
                                price
                            </td>
                            <td> <input type="number" onChange={handlePPrice} value={pprice} /></td>
                        </tr>
                        <tr>
                            <td> offer price </td>
                            <td> <input type=" number" onChange={handleOPrice} value={oprice} /> </td>
                        </tr>
                      
                        <tr>
                            <td> select photo </td>
                            <td> <input type="file" onChange={handleFilechange} name="file" />
                                <img src={image.preview} width="100" height="100" /></td>
                        </tr>
                        <tr>
                            <td> click to upload product photo </td>
                            <td> <button type="submit" onClick={handleSubmit}>upload </button></td>
                        </tr>
                        <tr>
                            <td> category </td>
                            <td>
                                <select onClick={handlePcatgSelect}>
                                    {
                                        pcatglist.map((item) => (
                                            <option value={item.PCatgId}>{item.PCatgName}</option> //
                                            // <option value={item.pcatgid}>{item.pcatgname}</option> 
                                            
                                        ))
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type=" submit" onClick={handleNewButton}>new</button>
                            </td>
                            <td>
                                <button type=" submit" onClick={handleSaveButton}>save</button>
                            </td>
                            <td>
                                <button type=" submit" onClick={handleShowButton}>show</button>
                            </td>

                        </tr>
                    </table>

                </div>
                <p> product list </p>
                <div className=" jumbotron">
                    <table border={0}>
                        <tr>
                            <th>Sno
                            </th>
                            <th> Product Id</th>
                            <th> Product name</th>
                            <th> Price</th> 
                            <th> offer price </th>
                           <th> status </th>
                            <th> category name</th>
                            <th> photo</th>
                           

                        </tr>
                        {
                            plist.map((item,index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td> {item.pid}</td>
                                    <td>{item.pname}</td>
                                    <td>{item.pprice}</td>
                                    <td> {item.oprice}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        {
                                            pcatglist.map((citem) => {
                                                if (item.pcatgid == citem.PCatgId) {
                                                    // catgname=citem.PCatgId
                                                    cname = citem.PCatgName // 
                                                }
                                            })
                                        }
                                        {cname}
                                    </td>
                                    {/* /getproductimage/:picname  /getproductimage/ */}

                                    <td>
                                        <img src={"http://localhost:9669/product/getproductimage/" + item.ppicname} width="100" height="100" />
                                    </td>
                        
                                </tr>
                            ))
                        }
                    </table>
                </div>
            </center>
        </div>
    );
} export default Product;



{/* <td>
    {
        pcatglist.find((citem) => citem.pcatgid === item.pcatgid)?.pcatgname || "Unknown"
    }
</td> */}



