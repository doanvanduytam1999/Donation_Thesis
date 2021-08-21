import { unwrapResult } from '@reduxjs/toolkit';
import 'antd/dist/antd.css';
//import ScrollToTop from "react-scroll-to-top";
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import AllDonate from './pages/AllDonate';
import Contact from './pages/Contact';
import Detail from './pages/Detail';
import Home from './pages/Home';
import ListDonator from './pages/ListDonator';
import Profile from './pages/Profile';
//import Login from './pages/Login';
import Resgister from './pages/Resgister';
import { getMe } from './redux/reducer/UserSlice';
import UserApi from './Api/UserApi';
// Configure Firebase.
const config = {  
  apiKey: 'AIzaSyDFlce1nx_WeDvvyQFoQY_VnLVXQMOdk7o',
  authDomain: 'donate-d9fdf.firebaseapp.com',
  // ...
};
firebase.initializeApp(config);
function App() {
  
  const [/* isSignedIn */, setIsSignedIn] = useState(false); // Local signed-in state.
  const { isLoggedIn } = useSelector(state => state.login);
  const dispatch = useDispatch();
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      setIsSignedIn(!!user);
      if (!user) {
        console.log("Chưa đăng nhập");
        return
      }
      else{
        try {
          const actionResult = await dispatch(getMe());
          const currentUser = await unwrapResult(actionResult);
          UserApi.postLoginGoogle(currentUser).then((res)=>{
            if(res.data.status ==="success"){
               let user=  res.data.data.user;
               dispatch({
                type: "LOGIN_SUCCESS",
                payload: { user: user },
              });
               console.log(user);
              localStorage.setItem("user", JSON.stringify(user));

              //window.location.reload();
            }
          })
          
          
          console.log('Logged in user: ', currentUser);
         //window.location.reload()
  
        } catch (error) {
          console.log('Failed to login ', error.message);
          // show toast error
        }
      }
      console.log("Đã đăng nhập", user);
     
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.

  }, []);
  
/*   if (isLoggedIn) {
    <Redirect to="/" />

  } */
  return (

    <Router>
     
        <Header />
        <Route onUpdate={() => window.scrollTo(0, 0)} exact path="/">
          <Home onUpdate={() => window.scrollTo(0, 0)} />

        </Route>
        <Route exact path="/lien-he">
          <Contact />

        </Route>
        <Route onUpdate={() => window.scrollTo(0, 0)} exact path="/tat-ca-chuong-trinh">
          <AllDonate />

        </Route>
        <Switch>
          <Route exact path="/thong-tin-chi-tiet/:_id">
            <Detail />
          </Route>
          <Route exact path="/xem-tat-ca-nguoi-ung-ho/:_id">
            <ListDonator />
          </Route>
          
          <Route exact path="/thong-tin-tai-khoan">
            <Profile />
          </Route>
          {/* <Route exact path="/dang-nhap">
            <Login />
          </Route> */}
          <Route exact path="/dang-ki">
            <Resgister />
          </Route>
        </Switch>
        <Footer  onUpdate={() => window.scrollTo(0, 0)} />
    
    </Router>

  );
}

export default App;
