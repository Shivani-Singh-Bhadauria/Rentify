import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, checkAuthentication } from "../../redux/auth/authActions";
import { Paper, TextField, Button, Typography, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const Login = ({ login, error }) => {
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData, navigateTo);
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
          width: 400,
          padding: 20,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            value={formData.email}
            onChange={handleChange}
            label="Email"
            type="email"
            name="email"
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20 }}
          >
            Log In
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
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
