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
import History from "./pages/user/History";
import UserRoute from "./components/Routes/UserRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/WishList";

import {auth} from './firebase';
import {useDispatch} from 'react-redux';
import { currentUser } from "./functions/auth";


const App = () => {
const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch(err => console.log(err));
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
      <UserRoute exact path="/user/history" component={History}/>
      <UserRoute exact path="/user/password" component={Password}/>
      <UserRoute exact path="/user/wishlist" component={Wishlist}/>
    </Switch>
    </>
  );
};

export default App;
