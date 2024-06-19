import React, { useState } from 'react';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography
} from '@mui/material';
import DashboardNav from './DashboardNav';
const initialData = [
  { InvoiceID: 1, Date: '2024-05-01', Total: 3000 },
  { InvoiceID: 2, Date: '2024-05-02', Total: 4500 },
  { InvoiceID: 3, Date: '2024-05-03', Total: 1200 },
  { InvoiceID: 4, Date: '2024-05-04', Total: 3200 },
  { InvoiceID: 5, Date: '2024-05-05', Total: 2800 }
];

const RevenuePage = () => {
  const [invoices, setInvoices] = useState(initialData);

  const totalRevenue = invoices.reduce((acc, invoice) => acc + invoice.Total, 0);

  return (
    <div>
                <DashboardNav />
    <Container className='container'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Invoice ID</TableCell>
              <TableCell align="center">Total ($)</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.InvoiceID}>
                <TableCell align="center">{invoice.Date}</TableCell>
                <TableCell align="center">{invoice.InvoiceID}</TableCell>
                <TableCell align="center">{invoice.Total}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary">
                    View Invoice
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} align="center">
                <strong>Total Revenue:</strong>
              </TableCell>
              <TableCell align="center" colSpan={2}>
                <strong>${totalRevenue}</strong>
              </TableCell>
            </TableRow>
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

export default RevenuePage;
