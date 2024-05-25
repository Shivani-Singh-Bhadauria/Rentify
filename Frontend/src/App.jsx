import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AddNewProperty from "./pages/property/AddNewProperty";
import SingleProperty from "./pages/property/SingleProperty";
import HomeScreen from "./pages/HomeScreen";
import NotFound from "./pages/NotFound";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PrivateRoute from "./utils/PrivateRoute";
import Navigation from "./components/Navigation";
import { Provider } from 'react-redux';
import store from './redux/store'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#2a5298', // Deep blue
    },
    secondary: {
      main: '#e67e22', // Orange
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
  },
});


function App() {

  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation/>
        <Routes>
          {/* @Private Routes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/create-property" element={<AddNewProperty />} />
            <Route path="/property/:id" element={<SingleProperty />} />

          </Route>
          {/* @Public Routes */}
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
