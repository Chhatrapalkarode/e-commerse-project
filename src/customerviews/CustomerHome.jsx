

import React, { useEffect, useState } from "react";
import ProductList from "../productviews/ProductList";
import BillByID from "./BillByID";
import ReactDOM from "react-dom/client";
import CustomerLogin from "./CustomerLogin";
import custpic from "./custpic.png";

function CustomerHome(props) {
  const [custname, setCustName] = useState();
  const [isshowplist, setIsShowPlist] = useState(false);
  const [isshowbill, setIsShowBill] = useState(false);
  useEffect(() => {
    var obj = JSON.parse(sessionStorage.getItem("sessionauth"));
    if (obj != undefined && obj != null) {
      //alert(obj.username)
      setCustName(obj.userfullname);
    } else {
      alert("session expires");
    }
  });
  const handleShopingButton = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    alert("cid=" + props.data.cid);
    var cid = props.data.cid;
    root.render(<ProductList data={cid}></ProductList>);
  };
  const handleShowBills = () => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    var cid = props.data.cid;
    root.render(<BillByID data={cid}></BillByID>);
  };
  const handleLogOut = () => {
    sessionStorage.removeItem("sessionauth");
    alert("Customer Session Closed");
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<CustomerLogin />);
  };
  function togleShoping() {
    setIsShowPlist((isshowplist) => !isshowplist);
  }
  function togleBill() {
    setIsShowBill((isshowbill) => !isshowbill);
  }
  return (
    <div>
      <p>Current Session Running For {custname}</p>
      Customer Id{props.data.cid}
      <h4 style={{ backgroundColor: "yellow" }}>Customer Home Page</h4>
      <h5>Welcome {props.data.cfname}</h5>
       <img
        src={"http://localhost:9669/customerr/getimage/"+props.data.cpic}height={100} width={100}
      //  style={{ borderRadius: 10 }}
       /> 
        {/* <img src={custpic}  height={100} width={100} /> */}
      
      <button type="submit" onClick={togleShoping}>
        Shopping
      </button>
      <button type="submit" onClick={togleBill}>
        Show Bill
      </button>
      <button type="submit" onClick={handleLogOut}>
        Logout
      </button>
      {/* below code to show hide product list component */}
      {isshowplist && <ProductList data={props.data.cid} />}
      {/* below code to show hide bill component */}
      {isshowbill && <BillByID data={props.data.cid} />}
      <h4 style={{ backgroundColor: "yellow", fontSize: 10 }}>
        <marquee> www.sabkuchmiltahai.com</marquee>
      </h4>
    </div>
  );
}
export default CustomerHome;
