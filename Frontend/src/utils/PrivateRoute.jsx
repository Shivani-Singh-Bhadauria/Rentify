import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { checkAuthentication } from '../redux/auth/authActions'; 

const PrivateRoute = () => {
  
  const [loading, setLoading] = useState(true);
  const currentPath = location.pathname;
  const isCreatePropertyPage = currentPath.includes('/create-property');  
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user =  useSelector((state) => state.auth.user)
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(checkAuthentication());
      setLoading(false); 
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if(isAuthenticated && user){
    const isAuthenticatedSeller = isAuthenticated && user && user.role === 'seller';
    if(isCreatePropertyPage&&!isAuthenticatedSeller){
        return <Navigate to="/" />
      }
  }
      
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
