import './App.css';
import Header from './components/Header';
import 'antd/dist/antd.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Detail from './pages/Detail';
//import Login from './pages/Login';
import Resgister from './pages/Resgister';
import Profile from './pages/Profile'
import React, { useState, useEffect } from 'react';
//import ScrollToTop from "react-scroll-to-top";
import firebase from 'firebase';
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit';
import { getMe } from './redux/reducer/UserSlice';
import Contact from './pages/Contact';
import AllDonate from './pages/AllDonate';
import ScrollToTop from './Api/ScrollToTop';
import ListDonator from './pages/ListDonator';
// Configure Firebase.
const config = {
  apiKey: 'AIzaSyBuvMsY6qXN0XOR2pjo9g0YJ9JC5yfh9rE',
  authDomain: 'fashionshop-11d42.firebaseapp.com',
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
      try {
        const actionResult = await dispatch(getMe());
        const currentUser = unwrapResult(actionResult);
        localStorage.setItem("user", JSON.stringify(currentUser));
        console.log('Logged in user: ', currentUser);

      } catch (error) {
        console.log('Failed to login ', error.message);
        // show toast error
      }
      console.log("Đã đăng nhập");
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.

  }, []);
  if (isLoggedIn) {
    <Redirect to="/" />

  }
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
