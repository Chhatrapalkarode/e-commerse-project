import React, {useState} from "react";
import StateMgt from "./StateMgt";
import CityMgt from "./CityMgt";
import ProductCatgMgt from "./ProductCatg";
import VenderMgt from "./VenderMgt";
import "../index.css";
import ShowBills from "./ShowBills";
// import AdminMain from "./AdminMain";

import ReactDOM from "react-dom/client";

import MainPage from "../MainPage";

import ProductList from "./ProductList";

import CustomerMgt from "./CustomerMgt";
// import ReactDOM from "react-dom/client";


function AdminHome()
{
    const[isstateshow,setIsStateShow]=useState(false);
    const[iscityshow,setIsCityShow]=useState(false);
    const[ispcatgshow,setIsPCatgShow]=useState(false);
    const[isvendershow,setIsVenderShow]=useState(false);
    const[isbillshow,setIsBillShow]=useState(false);
    const[isproductlistshow,setIsProductListShow]=useState(false);
    const[iscustomershow,setIsCustomerShow]=useState(false);
    function togleState(){
        setIsStateShow((isstateshow)=>!isstateshow);
    }

    function togleCity(){
        setIsCityShow((iscityshow)=>!iscityshow);
    }

    function togleProductCatg(){
        setIsPCatgShow((ispcatgshow)=>!ispcatgshow);
    }

    function togleVender(){
        setIsVenderShow((isvendershow)=>!isvendershow);
    }

    function togleBill(){
        setIsBillShow((isbillshow)=>!isbillshow);
    }

    function togleProductList(){
        setIsProductListShow((isproductlistshow)=>!isproductlistshow);
    }

    function togleCustomerList(){
        setIsCustomerShow((iscustomershow)=>!iscustomershow);
    }

    function LogOutButtonClick(){
        const root=ReactDOM.createRoot(document.getElementById("root"));
       
       
    root.render(<MainPage/>)
      
    }
    return(
        <div>
            <center>
                <h4>Admin Home Page</h4>
                <div style={{backgroundColor:"gray"}}>
                    <button type="submit" onClick={togleState}>State</button>

                    <button type="submit" onClick={togleCity} style={{marginLeft:10}}>City</button>

                    <button type="submit" onClick={togleProductCatg} style={{marginLeft:10}}>Product Category</button>

                    <button type="submit" onClick={togleVender} style={{marginLeft:10}}>Vender</button>

                    <button type="submit" onClick={togleBill} style={{marginLeft:10}}>Bill</button>

                    <button type="submit" onClick={togleProductList} style={{marginLeft:10}}>Product</button>

                    <button type="submit" onClick={togleCustomerList} style={{marginLeft:10}}>Customer</button>

                    <button type="submit" onClick={LogOutButtonClick} style={{marginLeft:10}}>Logout</button>
                </div>
                {
                    isstateshow &&
                     <StateMgt/>
                }
                {
                    iscityshow &&
                    <CityMgt/>
                }
                {
                    ispcatgshow &&
                    <ProductCatgMgt/>
                }
                {
                    isvendershow &&
                    <VenderMgt/>
                }
                {
                    isbillshow &&
                    <ShowBills/>
                }
                {
                    isproductlistshow &&
                    <ProductList/>
                }
                {
                    iscustomershow &&
                    <CustomerMgt/>
                }
            </center>
        </div>
    );
}export default AdminHome;
