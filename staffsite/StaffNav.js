import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { routes } from './../../routes';
import logo from './../../constant/logo.png';
import './StaffNav.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
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
                        <a href={routes.login} style={{ paddingBottom: '7px'}}>
                            <AccountCircleIcon />
                        </a>
                    </div>
                </div>

                <div className='navbar-body'>
                    <div className='navbar-item'>
                        <Link to={routes.orderPage}><a>Order</a></Link>
                    </div>
                    <div className='navbar-item'>
                        <Link to={routes.productPage}><a>Product</a></Link>
                    </div>
                    <div className='navbar-item'>
                        <Link to={routes.history}><a>History</a></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
