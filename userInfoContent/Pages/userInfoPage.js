// src/pages/userInfoPage.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavUserInfo from '../navUserInfo';
import HoSo from './hoSoNguoiDung';
import NganHang from './nganHang';
import DoiMatKhau from './matkhaumoi';
import ThongBao from './notice';
import LichSuMuaHang from './lichsumuahang';
import NavBar from '../../navBar'; // Assuming you have a NavBar component
import Footer from '../../footer';

const UserInfoPage = () => {
    return (
        <div>
            <NavBar />
            <div className="userinfo-container">
                <NavUserInfo />
                <div className="content">
                    <Routes>
                        <Route path="hoso" element={<HoSo />} />
                        <Route path="nganhang" element={<NganHang />} />
                        <Route path="doimatkhau" element={<DoiMatKhau />} />
                        <Route path="thongbao" element={<ThongBao />} />
                        <Route path="lichsumuahang" element={<LichSuMuaHang />} />
                        <Route path="/" element={<Navigate to="hoso" />} />
                    </Routes>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserInfoPage;
