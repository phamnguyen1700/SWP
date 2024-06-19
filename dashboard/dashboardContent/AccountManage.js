import React, { useState, useEffect } from 'react';
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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TablePagination,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DashboardNav from './DashboardNav';

const AccountManage = () => {
  const [accounts, setAccounts] = useState([]);
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchAccounts();
    fetchRoles();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch('https://localhost:7251/api/Users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      console.log('Error fetching accounts', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch('https://localhost:7251/api/Users/roles');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.log('Error fetching roles', error);
    }
  };

  const handleOpen = (account) => {
    setEditingAccount(account || { username: '', password: '', email: '', roleId: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setEditingAccount(null);
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      if (editingAccount.userId) {
        await fetch(`https://localhost:7251/api/Users/${editingAccount.userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editingAccount)
        });
      } else {
        await fetch('https://localhost:7251/api/Users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editingAccount)
        });
      }
      fetchAccounts();
      handleClose();
    } catch (error) {
      console.log('Error saving account', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await fetch(`https://localhost:7251/api/Users/${userId}`, {
        method: 'DELETE'
      });
      fetchAccounts();
    } catch (error) {
      console.log('Error deleting account', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <DashboardNav />
      <Container className='container'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">UserID</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Password</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">RoleID</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((account) => (
                <TableRow key={account.userId}>
                  <TableCell align="center">{account.userId}</TableCell>
                  <TableCell align="center">{account.username}</TableCell>
                  <TableCell align="center">{account.password}</TableCell>
                  <TableCell align="center">{account.email}</TableCell>
                  <TableCell align="center">{account.roleId}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpen(account)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(account.userId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={accounts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
          Add Account
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editingAccount?.userId ? 'Edit Account' : 'Add Account'}</DialogTitle>
          <DialogContent>
            {editingAccount?.userId && (
              <TextField
                margin="dense"
                label="UserID"
                type="text"
                fullWidth
                value={editingAccount.userId}
                disabled
              />
            )}
            <TextField
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              value={editingAccount?.username || ''}
              onChange={(e) => setEditingAccount({ ...editingAccount, username: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Password"
              type="text"
              fullWidth
              value={editingAccount?.password || ''}
              onChange={(e) => setEditingAccount({ ...editingAccount, password: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={editingAccount?.email || ''}
              onChange={(e) => setEditingAccount({ ...editingAccount, email: e.target.value })}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="role-label">RoleID</InputLabel>
              <Select
                labelId="role-label"
                value={editingAccount?.roleId || ''}
                onChange={(e) => setEditingAccount({ ...editingAccount, roleId: e.target.value })}
                label="RoleID"
              >
                {roles.map((role) => (
                  <MenuItem key={role.roleId} value={role.roleId}>
                    {role.roleId} - {role.roleName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default AccountManage;
