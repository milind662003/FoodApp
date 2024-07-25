import './App.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import { darkTheme } from './Theme/DarkTheme';
import { Navbar } from './components/Navbar/Navbar'
import { Home } from './components/Home/Home'
import RestaurantDetails from './components/Restaurant/RestaurantDetails';
import Cart from './components/Cart/Cart';
import Profile from './components/Profile/Profile';
import CustomerRoute from './Routers/CustomerRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './components/State/Authentication/Action';
import { findCart } from './components/State/Cart/Action';
function App() {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const {auth} = useSelector(store=>store)

  useEffect(()=>{
    dispatch(getUser(auth.jwt || jwt))
    dispatch(findCart(jwt))
  }, [auth.jwt])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <CustomerRoute/>
    </ThemeProvider>
  );
}

export default App;
