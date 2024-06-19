import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { routes } from './../../../routes';
import logo from './../../../constant/logo.png';
import './DashboardNav.css';
import { useAuth } from '../../../components/authcontext';

export default function NavBar() {
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
    const { user } = useAuth();


    return (
        <div>
            <div className='navbar-container'>
                <div className='navbar-header'>
                    <div className='navbar-header-left'>
                        <div className='navbar-icon'>
                            <a href={routes.homePage}><img src={logo} alt="logo" /></a>
                        </div>
                    </div>
                    <div className='navbar-header-right'>
                        <a href={routes.login} style={{ paddingBottom: '7px' }}>
                            <AccountCircleIcon />
                        </a>
                    </div>
                </div>

                <div className='navbar-body'>
                    <div className='navbar-item'>
                        <a href={routes.dashboard}>Dashboard</a>
                    </div>
                    <div className='navbar-item'>
                        <a href={routes.orderPage}>Order</a>
                    </div>
                    <div className='navbar-item'>
                        <a href="#">Event</a>
                    </div>
                    <div className='navbar-item'>
                        <a href={routes.productPage}>Product</a>
                    </div>
                    {user && user.roleId !== 2 && ( // Conditional rendering based on user roleId
                        <div className='navbar-item'>
                            <a href={routes.accountPage}>Account</a>
                        </div>
                    )}
                    <div className='navbar-item'>
                        <a href={routes.feedbackPage}>Feedback</a>
                    </div>
                    <div className='navbar-item'>
                        <a href={routes.revenuePage}>Revenue</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
