import React from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Rating from '@mui/lab/Rating';
import DashboardNav from './DashboardNav';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
const FeedbackPage = () => {
    // Example data
    const feedbackData = [
        {
            FeedbackID: 1,
            UserID: 'user001',
            Comment: 'Great product!',
            InvoiceID: 'inv001',
            Rating: 5,
            FeedbackDate: '2023-05-10T14:48:00.000Z'
        },
        {
            FeedbackID: 2,
            UserID: 'user002',
            Comment: 'Fast delivery, but the packaging was damaged.',
            InvoiceID: 'inv002',
            Rating: 3,
            FeedbackDate: '2023-05-11T09:22:00.000Z'
        },
        {
            FeedbackID: 3,
            UserID: 'user003',
            Comment: 'Excellent customer service.',
            InvoiceID: 'inv003',
            Rating: 4,
            FeedbackDate: '2023-05-12T11:35:00.000Z'
        },
        {
            FeedbackID: 4,
            UserID: 'user004',
            Comment: 'Not satisfied with the quality.',
            InvoiceID: 'inv004',
            Rating: 2,
            FeedbackDate: '2023-05-13T16:00:00.000Z'
        }
    ];

    return (
        <div>
            <DashboardNav />
            <Container className='container'>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">FeedbackID</TableCell>
                                <TableCell align="center">UserID</TableCell>
                                <TableCell align="center">Comment</TableCell>
                                <TableCell align="center">InvoiceID</TableCell>
                                <TableCell align="center">Rating</TableCell>
                                <TableCell align="center">FeedbackDate</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {feedbackData.map((row) => (
                                <TableRow key={row.FeedbackID}>
                                    <TableCell align="center">{row.FeedbackID}</TableCell>
                                    <TableCell align="center">{row.UserID}</TableCell>
                                    <TableCell align="center">{row.Comment}</TableCell>
                                    <TableCell align="center">{row.InvoiceID}</TableCell>
                                    <TableCell align="center">
                                        <Rating name="read-only" value={row.Rating} readOnly />
                                    </TableCell>
                                    <TableCell align="center">{new Date(row.FeedbackDate).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Button
                className="add-product-button"
                variant="contained"
                style={{
                    position: 'fixed',
                    bottom: '40px',
                    right: '40px',
                    height: '56px',
                    width: '56px',
                }}

            >
                <LocalPrintshopOutlinedIcon />
            </Button>
        </div>
    );
};

export default FeedbackPage;
