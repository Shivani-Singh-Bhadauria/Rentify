import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthentication, signup } from "../../redux/auth/authActions";
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Paper, TextField, Button, Typography, Container, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Signup = ({ signup, error }) => {
  const navigateTo = useNavigate();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData, navigateTo);
  };
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(checkAuthentication());
    };

    fetchData();
  }, [dispatch]);
  
  useEffect(() => {
    if (user) {
      navigateTo("/");
    }
  }, [user]);

  return (
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={5}
        style={{
          width: isSmallScreen ? '90%' : 400,
          padding: 20,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create an Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
              required
            >
              <MenuItem value="buyer">Buyer</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20 }}
          >
            Sign Up
          </Button>
          {error && (
            <Typography style={{ color: "red", marginTop: 10, textAlign: 'center' }}>
              {error.message}
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
