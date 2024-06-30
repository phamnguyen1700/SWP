import React, { useState, useRef } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import './History.css';
import { useReactToPrint } from 'react-to-print';
import Logo from './../../constant/logo.png';
import StaffNav from './StaffNav';
// Sample data for Orders, Customers, and Users
const orderDetails = {
    OD001: [
        { productName: 'Product A', quantity: 1, price: 100.00 },
        { productName: 'Product B', quantity: 2, price: 106.22 }
    ],
    OD002: [
        { productName: 'Product C', quantity: 3, price: 200.00 },
        { productName: 'Product D', quantity: 1, price: 66.99 }
    ],
    OD003: [
        { productName: 'Product E', quantity: 1, price: 100.81 }
    ],
    OD004: [
        { productName: 'Product F', quantity: 1, price: 654.39 }
    ],
    OD005: [
        { productName: 'Product G', quantity: 1, price: 100.00 },
        { productName: 'Product H', quantity: 1, price: 112.79 }
    ],
};

const paymentData = [
    { orderID: 'OD001', customerID: 'C001', totalPrice: 312.44, deposit: 50, amountPaid: 262.44, datePaid: '2023-06-10' },
    { orderID: 'OD002', customerID: 'C002', totalPrice: 866.99, deposit: 100, amountPaid: 766.99, datePaid: '2023-06-11' },
    { orderID: 'OD003', customerID: 'C003', totalPrice: 100.81, deposit: 20, amountPaid: 80.81, datePaid: '2023-06-12' },
    { orderID: 'OD004', customerID: 'C004', totalPrice: 654.39, deposit: 150, amountPaid: 504.39, datePaid: '2023-06-13' },
    { orderID: 'OD005', customerID: 'C005', totalPrice: 212.79, deposit: 50, amountPaid: 162.79, datePaid: '2023-06-14' },
];

const customerData = [
    { customerID: 'C001', userID: 'U001', dateJoined: '2023-01-10' },
    { customerID: 'C002', userID: 'U002', dateJoined: '2023-02-15' },
    { customerID: 'C003', userID: 'U003', dateJoined: '2023-03-20' },
    { customerID: 'C004', userID: 'U004', dateJoined: '2023-04-25' },
    { customerID: 'C005', userID: 'U005', dateJoined: '2023-05-30' },
];

const userData = [
    { userID: 'U001', Name: 'John Doe', phoneNumber: '123-456-7890', address: '123 Main St', email: 'john@example.com' },
    { userID: 'U002', Name: 'Jane Smith', phoneNumber: '987-654-3210', address: '456 Elm St', email: 'jane@example.com' },
    { userID: 'U003', Name: 'Alice Johnson', phoneNumber: '456-123-7890', address: '789 Maple St', email: 'alice@example.com' },
    { userID: 'U004', Name: 'Robert Brown', phoneNumber: '321-654-9870', address: '101 Oak St', email: 'robert@example.com' },
    { userID: 'U005', Name: 'Michael White', phoneNumber: '654-987-3210', address: '202 Pine St', email: 'michael@example.com' },
];

const combinedData = paymentData.map(payment => ({
    ...payment,
    orderDetails: orderDetails[payment.orderID] || [],
    customerDetails: customerData.find(customer => customer.customerID === payment.customerID) || {},
    userDetails: userData.find(user => user.userID === (customerData.find(customer => customer.customerID === payment.customerID) || {}).userID) || {}
}));

const History = () => {
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const componentRef = useRef();

    const handleView = (order) => {
        setSelectedOrder(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="container-fluid">
            <StaffNav/>
            <div className='container-fluid-2'>
            <TableContainer component={Paper} className="table-container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className="table-head-cell">Order ID</TableCell>
                            <TableCell align="center" className="table-head-cell">Product Name</TableCell>
                            <TableCell align="center" className="table-head-cell">Quantity</TableCell>
                            <TableCell align="center" className="table-head-cell">Price ($)</TableCell>
                            <TableCell align="center" className="table-head-cell">Total Price ($)</TableCell>
                            <TableCell align="center" className="table-head-cell">Deposit ($)</TableCell>
                            <TableCell align="center" className="table-head-cell">Amount Paid ($)</TableCell>
                            <TableCell align="center" className="table-head-cell">Date Paid</TableCell>
                            <TableCell align="center" className="table-head-cell">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {combinedData.map((payment, index) => (
                            <React.Fragment key={index}>
                                {payment.orderDetails.map((detail, idx) => (
                                    <TableRow key={idx}>
                                        {idx === 0 && (
                                            <TableCell align="center" rowSpan={payment.orderDetails.length} className="table-cell">
                                                {payment.orderID}
                                            </TableCell>
                                        )}
                                        <TableCell align="center" className="table-cell">{detail.productName}</TableCell>
                                        <TableCell align="center" className="table-cell">{detail.quantity}</TableCell>
                                        <TableCell align="center" className="table-cell">{detail.price.toFixed(2)}</TableCell>
                                        {idx === 0 && (
                                            <>
                                                <TableCell align="center" rowSpan={payment.orderDetails.length} className="table-cell">
                                                    {payment.totalPrice.toFixed(2)}
                                                </TableCell>
                                                <TableCell align="center" rowSpan={payment.orderDetails.length} className="table-cell">
                                                    {payment.deposit.toFixed(2)}</TableCell>
                                                <TableCell align="center" rowSpan={payment.orderDetails.length} className="table-cell">
                                                    {payment.amountPaid.toFixed(2)}</TableCell>
                                                <TableCell align="center" rowSpan={payment.orderDetails.length} className="table-cell">
                                                    {payment.datePaid}</TableCell>
                                                <TableCell align="center" rowSpan={payment.orderDetails.length} className="table-cell">
                                                    <Button
                                                        variant="contained"
                                                        className="view-button"
                                                        onClick={() => handleView(payment)}
                                                    >
                                                        View
                                                    </Button>
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>

            <Dialog className='billform' open={open} onClose={handleClose} maxWidth="md" fullWidth ref={componentRef}>
                <DialogTitle style={{ backgroundColor: 'white' }} align='center' className="dialog-title">
                    <div style={{marginBottom:'-50px'}} className='logo'>
                        <img src={Logo} alt="Logo" />
                    </div>
                    <h2 style={{ color: 'black',marginBottom:'-10px'}}>Luxe Jewel House</h2>
                    <div style={{ color: 'black', fontWeight:'bolder'  }}>INVOICE</div>
                </DialogTitle>
                <DialogContent className="dialog-content">
                    {selectedOrder && (
                        <div className="bill-container">
                            <div className="bill-header">Order ID: {selectedOrder.orderID}</div>
                            <div className="user-details">
                                <div><strong>Name:</strong> {selectedOrder.userDetails.Name}</div>
                                <div><strong>Phone Number:</strong> {selectedOrder.userDetails.phoneNumber}</div>
                                <div><strong>Address:</strong> {selectedOrder.userDetails.address}</div>
                                <div><strong>Email:</strong> {selectedOrder.userDetails.email}</div>
                            </div>
                            <TableContainer component={Paper} className="bill-table-container">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Product Name</TableCell>
                                            <TableCell align="center">Quantity</TableCell>
                                            <TableCell align="center">Price ($)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedOrder.orderDetails.map((detail, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center">{detail.productName}</TableCell>
                                                <TableCell align="center">{detail.quantity}</TableCell>
                                                <TableCell align="center">{detail.price.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className="bill-summary">
                                <div className="bill-summary-item">
                                    <span className="bill-summary-label">Total Price:</span>
                                    <span>${selectedOrder.totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="bill-summary-item">
                                    <span className="bill-summary-label">Deposit:</span>
                                    <span>${selectedOrder.deposit.toFixed(2)}</span>
                                </div>
                                <div className="bill-summary-item">
                                    <span className="bill-summary-label">Amount Paid:</span>
                                    <span>${selectedOrder.amountPaid.toFixed(2)}</span>
                                </div>
                                <div className="bill-summary-item">
                                    <span className="bill-summary-label">Date Paid:</span>
                                    <span>{selectedOrder.datePaid}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
                <DialogActions className="dialog-actions">
                    <Button onClick={handleClose} color="primary" className="dialog-button">
                        Close
                    </Button>
                    <Button onClick={handlePrint} color="primary" className="dialog-button">
                        Print
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default History;
