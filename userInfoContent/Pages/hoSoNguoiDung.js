import React, { useState, useEffect } from 'react';
import '../css/hoso.css';
import { useAuth } from '../../authcontext';
import { Box, Breadcrumbs, Button, SnackbarContent, TextField, Typography } from '@mui/material';
import CustomizedSnackbars from '../../snackBar';
import AutohideSnackbar from '../../snackBar';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';

export default function HoSo() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    email: "",
    phoneNumber: "",
    gender: "Nam",
    dob: ""
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user || !user.token) {
        console.error('User or token is null');
        return;
      }

      try {
        const response = await fetch('https://localhost:7251/api/Users/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSave = async () => {
    if (!user || !user.token) {
      console.error('User or token is null');
      return;
    }

    try {
      const response = await fetch('https://localhost:7251/api/Users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(userInfo)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('User information saved:', result);
    } catch (error) {
      console.error('Error saving user information:', error);
    }
  };

  return (
    <div>
      <div style={{ paddingLeft: '5%', paddingBottom: '2%' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to={routes.homePage}>
            Home Page
          </Link>
          <Typography color="text.primary">User Profile</Typography>
        </Breadcrumbs>
        <Typography variant="h4" gutterBottom>
          Personal Information
        </Typography>
      </div>
      <div className="user-info">
        <div className="form-group">
          <TextField
            id="standard-read-only-input"
            label="User Name:"
            value={userInfo.username}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
            className="custom-text-field"
          />
          <small>Username can only be changed once.</small>
        </div>
        <div className="form-group">
          <TextField
            required
            id="standard-required"
            label="Name:"
            name="name"
            value={userInfo.name}
            variant="standard"
            onChange={handleChange}
            className="custom-text-field"
          />
        </div>
        <div className="form-group">
          <TextField
            required
            id="standard-required"
            label="Email:"
            type="email"
            name="email"
            value={userInfo.email}
            variant="standard"
            onChange={handleChange}
            className="custom-text-field"
          />
        </div>
        <div className="form-group">
          <TextField
            required
            id="standard-required"
            label="Phone Number:"
            type="text"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            variant="standard"
            onChange={handleChange}
            className="custom-text-field"
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label><input type="radio" name="gender" value="Nam" checked={userInfo.gender === "Nam"} onChange={handleChange} /> Male</label>
            <label><input type="radio" name="gender" value="Nữ" checked={userInfo.gender === "Nữ"} onChange={handleChange} /> Female</label>
            <label><input type="radio" name="gender" value="Khác" checked={userInfo.gender === "Khác"} onChange={handleChange} /> Others</label>
          </div>
        </div>
        <div className="form-group">
          <label>DOB:</label>
          <TextField
            required
            id="standard-required"
            type="date"
            name="dob"
            value={userInfo.dob}
            variant="standard"
            onChange={handleChange}
            className="custom-text-field"
          />
        </div>
        <AutohideSnackbar
          variant="contained"
          onClick={handleSave}
          text='Save' message='User profile saved successfully!'
        />
      </div>
    </div>
  );
}
