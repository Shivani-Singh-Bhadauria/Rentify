import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { connect } from 'react-redux';
import { logout } from '../redux/auth/authActions';

const Navigation = (props) => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#0f3963' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button component={RouterLink} color="inherit" to="/">Rentify</Button>
          </Typography>
          {
            user && isAuthenticated ? (
              <>
                {user.role === 'seller' && (
                  <Button component={RouterLink} color="inherit" to="/create-property">Add Property</Button>
                )}
                <Button color="inherit" onClick={() => { props.logout() }}>Logout</Button>
              </>
            ) : (
              <>
                <Button component={RouterLink} color="inherit" to="/register">Register</Button>
                <Button component={RouterLink} color="inherit" to="/login">Login</Button>
              </>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default connect(null, { logout })(Navigation);
