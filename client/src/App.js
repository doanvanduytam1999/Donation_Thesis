import './App.css';
import Header from './components/Header';
import 'antd/dist/antd.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Detail from './pages/Detail';
import Login from './pages/Login';
import Resgister from './pages/Resgister';

import React, { useEffect, useState } from 'react';
import ScrollToTop from "react-scroll-to-top";

function App() {
  
  return (
   
    <Router>
       <ScrollToTop smooth />
        <Header />
        <Route exact path="/">
          <Home />

        </Route>
        <Switch>
        <Route exact path="/thong-tin-chi-tiet/:_id">
          <Detail />
        </Route>
        <Route exact path="/dang-nhap">
          <Login />
        </Route>
        <Route exact path="/dang-ki">
          <Resgister />
        </Route>
        </Switch>
        <Footer />
     
    </Router>

  );
}

export default App;
