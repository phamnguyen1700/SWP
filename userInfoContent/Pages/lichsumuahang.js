import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, Tabs, Tab, Breadcrumbs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { routes } from '../../../routes';
import { Stepper, Step, StepLabel } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledTabs = styled(Tabs)({
  '& .MuiTab-root': {
    color: 'black',
    '&.Mui-selected': {
      color: 'blue',
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: 'blue',
  },
});

function OrderHistory() {
  const [value, setValue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [orderLog, setOrderLog] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://localhost:7251/api/Orders'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`https://localhost:7251/api/Orders/${orderId}`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      const data = await response.json();
      setOrderDetails(data.orderDetails || []);
      setSelectedOrder(data);
      fetchProductDetails(data.orderDetails || []);
      fetchOrderLog(orderId); // Fetch order log after fetching order details
      setOpen(true);
    } catch (err) {
      console.error('Error fetching order details:', err);
    }
  };

  const fetchProductDetails = async (orderDetails) => {
    try {
      const productDetails = await Promise.all(orderDetails.map(async (detail) => {
        const response = await fetch(`https://localhost:7251/api/Products/${detail.productId}`);
        console.log('Detail Product ID:', detail.productId); 
  
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const productData = await response.json();
        console.log('Product DATA:', productData); 
        // Access the nested product property
        const { product } = productData;
  
        return {
          productId: detail.productId,
          quantity: detail.quantity,
          productName: product.productName,
          productPrice: product.price,
          image1: product.image1
        };
      }));
      setProductDetails(productDetails);
    } catch (err) {
      console.error('Error fetching product details:', err);
    }
  };
  
  

  const fetchOrderLog = async (orderId) => {
    try {
      const response = await fetch(`https://localhost:7251/api/OrderLogs/order/${orderId}`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch order log');
      }
      const data = await response.json();
      setOrderLog(data);
    } catch (err) {
      console.error('Error fetching order log:', err);
    }
  };

  const handleOrderClick = (orderId) => {
    fetchOrderDetails(orderId);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderTags = () => {
    const log = orderLog;
    const tags = [];
    if (log?.phase1) tags.push({ label: 'Ordered', date: log.timePhase1 });
    if (log?.phase2) tags.push({ label: 'Created', date: log.timePhase2 });
    if (log?.phase3) tags.push({ label: 'Received', date: log.timePhase3 });
    if (log?.phase4) tags.push({ label: 'Finished', date: log.timePhase4 });

    return tags.map((tag, index) => (
      <Paper key={index} className="tag-container">
        <div className="tag-label">{tag.label}</div>
        <div className="tag-date">{new Date(tag.date).toLocaleString()}</div>
      </Paper>
    ));
  };

  const filterOrders = () => {
    switch (value) {
      case 1:
        return orders.filter(order => orderLog?.phase1 || orderLog?.phase2 || orderLog?.phase3 || !orderLog?.phase4);
      case 2:
        return orders.filter(order => orderLog?.phase4);
      default:
        return orders;
    }
  };

  const filteredOrders = filterOrders();

  return (
    <Box sx={{ padding: '20px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to={routes.homePage}>
          Home Page
        </Link>
        <Typography color="text.primary">Purchase history</Typography>
      </Breadcrumbs>
      <Typography variant="h4" gutterBottom>
        Order
      </Typography>
      <StyledTabs value={value} onChange={handleChange} aria-label="order tabs">
        <Tab label="All" />
        <Tab label="In Process" />
        <Tab label="Completed" />
      </StyledTabs>
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="h6">Latest orders</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">OrderID</TableCell>
                <TableCell align="center">Total Price ($)</TableCell>
                <TableCell align="center">Order Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                order.orderDetails ? order.orderDetails.map((detail, index) => (
                  <TableRow key={`${order.orderId}-${index}`}>
                    <TableCell align="center">{index === 0 ? order.orderId : ''}</TableCell>
                    <TableCell align="center">
                      {detail.product && (
                        <img src={detail.product.image1} alt={detail.product.productName} style={{ width: '50px', height: '50px' }} />
                      )}
                    </TableCell>
                    <TableCell align="center">{detail.product ? detail.product.productName : 'N/A'}</TableCell>
                    <TableCell align="center">{order.totalPrice ? order.totalPrice.toFixed(2) : 'N/A'}</TableCell>
                    <TableCell align="center">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOrderClick(order.orderId)}
                        style={{ marginRight: '8px' }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow key={order.orderId}>
                    <TableCell align="center">{order.orderId}</TableCell>
                    <TableCell align="center">{order.totalPrice}</TableCell>
                    <TableCell align="center">{order.orderDate}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOrderClick(order.orderId)}
                        style={{ marginRight: '8px' }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && productDetails.length > 0 ? (
            <div>
              <Typography variant="h6">Order Details</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Product ID</TableCell>
                      <TableCell align="center">Product Name</TableCell>
                      <TableCell align="center">Product Image</TableCell>
                      <TableCell align="center">Price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productDetails.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{item.productId}</TableCell>
                        <TableCell align="center">{item.productName}</TableCell>
                        <TableCell align="center">
                          <img src={item.image1} style={{ width: '50px', height: '50px' }}></img>
                        </TableCell>
                        <TableCell align="center">{item.productPrice}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} align="left">Total Price</TableCell>
                      <TableCell align="center">
                        {orderDetails.reduce((acc, item) => acc + item.productPrice * item.quantity, 0).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="h6" style={{ marginTop: '20px' }}>Order Status</Typography>
              {orderLog && (
                <div>
                  <Stepper alternativeLabel className="stepper">
                    <Step completed={orderLog.phase1}>
                      <StepLabel>Ordered</StepLabel>
                    </Step>
                    <Step completed={orderLog.phase2}>
                      <StepLabel>Created</StepLabel>
                    </Step>
                    <Step completed={orderLog.phase3}>
                      <StepLabel>Received</StepLabel>
                    </Step>
                    <Step completed={orderLog.phase4}>
                      <StepLabel>Finished</StepLabel>
                    </Step>
                  </Stepper>
                  <div className="tags-container">
                    {renderTags()}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default OrderHistory;
