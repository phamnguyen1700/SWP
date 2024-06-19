import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { routes } from '../../routes'

const orderData = [
  {
    id: 0,
    customerID: 'Elvis Presley',
    totalPrice: 312.44,
    orderDate: '16 Mar, 2019',
    orderDetailID: 'OD001',
  },
  {
    id: 1,
    customerID: 'Paul McCartney',
    totalPrice: 866.99,
    orderDate: '16 Mar, 2019',
    orderDetailID: 'OD002',
  },
  {
    id: 2,
    customerID: 'Tom Scholz',
    totalPrice: 100.81,
    orderDate: '16 Mar, 2019',
    orderDetailID: 'OD003',
  },
  {
    id: 3,
    customerID: 'Michael Jackson',
    totalPrice: 654.39,
    orderDate: '16 Mar, 2019',
    orderDetailID: 'OD004',
  },
  {
    id: 4,
    customerID: 'Bruce Springsteen',
    totalPrice: 212.79,
    orderDate: '15 Mar, 2019',
    orderDetailID: 'OD005',
  },
];



export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">OrderID</TableCell>
            <TableCell align="center">CustomerID</TableCell>
            <TableCell align="center">Total Price ($)</TableCell>
            <TableCell align="center">Order Date</TableCell>
            <TableCell align="center">Order DetailID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.customerID}</TableCell>
              <TableCell align="center">{row.totalPrice}</TableCell>
              <TableCell align="center">{row.orderDate}</TableCell>
              <TableCell align="center">{row.orderDetailID}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href={routes.orderPage} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
