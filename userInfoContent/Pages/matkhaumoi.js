// src/pages/doimatkhau.js
import React, { useState } from 'react';
import '../css/matkhaumoi.css';
import { Breadcrumbs, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';
export default function DoiMatKhau() {
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
    };

    const handleSave = () => {
        // Handle save logic here
        if (passwords.newPassword !== passwords.confirmNewPassword) {
            alert('New passwords do not match.');
            return;
        }
        console.log('Passwords updated:', passwords);
    };

    return (
        <div>
            <div style={{ paddingLeft: '20%', paddingBottom: '2%' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" to={routes.homePage}>
                        Home Page
                    </Link>
                    <Typography color="text.primary">Change Password</Typography>
                </Breadcrumbs>
            </div>
            <div className="change-password-page">
                <h2>Account Password:</h2>
                <div className="change-password-form">
                    <div className="form-group">
                        <label>Current Password:</label>
                        <input
                            type="password"
                            name="oldPassword"
                            value={passwords.oldPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>New Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm New Password:</label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            value={passwords.confirmNewPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <Button
                        variant="contained"
                        onClick={handleSave}>
                        Save Account Password
                    </Button>
                </div>
            </div>
        </div>
    );
}
