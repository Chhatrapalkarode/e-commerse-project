import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import VenderReg from './venderviews/VenderReg.jsx'
import CustomerReg from './customerviews/CustomerReg.jsx'
import CustomerHome from './customerviews/CustomerHome.jsx'
import Product from './productviews/Product.jsx'
import VenderMgt from './adminviews/VenderMgt.jsx'
import ShowBills from './adminviews/ShowBills.jsx'
import ProductList from './adminviews/ProductList.jsx'
import CustomerMgt from './adminviews/CustomerMgt.jsx'
import AdminHome from './adminviews/AdminHome.jsx'
import BillByID from './customerviews/BillByID.jsx'
import AdminLogin from './adminviews/AdminLogin.jsx'
import AdminReg from './adminviews/AdminReg.jsx'
import VenderMain from './venderviews/VenderMain.jsx'
import MainPage from './MainPage.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    {/* <App /> */}
    {/* <VenderReg/> */}
    {/* <CustomerLogin/> */}
    {/* <CustomerHome/> */}
    {/* <Product/> */}

  
  {/* <CustomerReg/> */}
  {/* <BillByID/> */}
  {/* <VenderMgt/> */}
  {/* <ShowBills/> */}
  {/* <ProductList/> */}
  {/* <CustomerMgt/> */}
  {/* <AdminHome/> */}
  {/* <VenderReg/> */}
  <AdminLogin/>
  {/* <AdminReg/> */}
  {/* <VenderMain/> */}
  {/* <MainPage/> */}
  {/* <CustomerMain/> */}
  
 
  </StrictMode>
)
