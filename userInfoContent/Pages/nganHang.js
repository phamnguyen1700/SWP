// src/pages/nganHang.js
import React from 'react';
import '../css/nganhang.css'
import { Breadcrumbs, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';
export default function NganHang() {
    return (
        <div>
            <div style={{paddingLeft: '10%', paddingBottom: '2%'}}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to={routes.homePage}>
                    Home Page
                </Link>
                <Typography color="text.primary">Bank</Typography>
            </Breadcrumbs>
            </div>
            <div className="bank-link-page">
                <h2>Credit/Debit Cards</h2>
                <div className="card-link-section">
                    <p style={{ textAlign: 'left' }}>You have not linked your bank card yet.</p>
                    <Button
                        className="add-bank-account-button"
                        variant="contained"
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'gray', // Màu khi di chuột vào nút
                            }
                        }}
                    >
                        + Add New Bank Card
                    </Button>
                </div>
                <hr />
                <h2>My Bank Account</h2>
                <div className="bank-account-link-section">
                    <p style={{ textAlign: 'left' }}>You don't have a bank account yet.</p>
                    <Button
                        className="add-bank-account-button"
                        variant="contained"
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'gray',
                            }
                        }}
                    >
                        + Add Linked Bank Account
                    </Button>
                </div>
            </div>
        </div>
    );
}
