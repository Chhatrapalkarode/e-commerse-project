import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import AdminReg from "./adminviews/AdminReg";
import AdminMain from "./adminviews/AdminMain";
import AdminHome from "./adminviews/AdminHome";
import CustomerReg from "./customerviews/CustomerReg";
import VenderLogin from "./venderviews/VenderLogin";
import VenderReg from "./venderviews/VenderReg";
import CustomerMain from "./customerviews/Customermain";
import VenderMain from "./venderviews/VenderMain";
// import "./index.css";
// import "./Style.css";
import mainpic from './Main page.jpeg';
import CustomerLogin from "./customerviews/CustomerLogin";


const MainPage = () => {
  return (
    <div className="App1">
      <img src={mainpic} height={400} width={1000} />
      <Router>
        <nav>
          <Link to="/adminmain">Admin</Link>
          <span></span>
          <Link to="/customermain">Customer</Link>
          <span></span>
          <Link to="/vendermain">Vendor</Link>
          <span></span>
        </nav>
        <Routes>
          <Route path="/adminmain" element={<AdminMain />} >
          <Route path="adminlogin" element={<AdminHome />} />
          <Route path="adminreg" element={<AdminReg />} />
          </Route>
          <Route path="/customermain" element={<CustomerMain />} >
          <Route path="customerlogin" element={<CustomerLogin />} />
          <Route path="customerreg" element={<CustomerReg />} />
          </Route>
          <Route path="/vendermain" element={<VenderMain />} >
          <Route path="venderlogin" element={<VenderLogin />} />
          <Route path="venderreg" element={<VenderReg />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default MainPage;



