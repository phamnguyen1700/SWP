import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './StaffNav';
import OrderPage from '../dashboard/dashboardContent/OrderPage';
import ProductManage from '../dashboard/dashboardContent/ProductManage';
import History from './History';
export default function StaffSite() {
  return (
    <div className='container-fuild'>
      <Nav/>
        <Routes>
          <Route path='/orderPage' element={<OrderPage/>}></Route>
          <Route path='/productManage' element={<ProductManage/>}></Route>
          <Route path='/history' element={<History/>}></Route>
        </Routes>
    </div>
)
}
