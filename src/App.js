import React, {useEffect} from "react";
import {Switch, Route} from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home';
import Header from './components/Nav/Header';
import RegisterComplete from './pages/Auth/RegisterComplete';
import ForgotPassword from './pages/Auth/ForgotPassword';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {auth} from './firebase';
import {useDispatch} from 'react-redux';


const App = () => {
const dispatch = useDispatch()

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if(user) {
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email:user.email,
          token:idTokenResult.token,
        },
      });
    }
  });
  return () => unsubscribe();
}, []);

  return(
    <>
    <Header/>
    <ToastContainer />
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/register/registercomplete" component={RegisterComplete}/>
      <Route exact path="/forgot/password" component={ForgotPassword}/>
    </Switch>
    </>
  );
};

export default App;
