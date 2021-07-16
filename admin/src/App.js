import Addpost from "./Pages/Addpost/Addpost.js";
import Navigation from "./Components/Navigation.js";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.js"
import Listpost from "./Pages/ListPost/Listpost.js"
import "./styles/bootstrap-grid.min.css";
import 'antd/dist/antd.css';
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import ListUser from "./Pages/ListUser/ListUser"
import EditAccount from "./Pages/EditAccount/EditAccount.js";
import EditPost from "./Pages/EditPost/EditPost.js";
function App() {
  const islogin = JSON.parse(localStorage.getItem("user"))

  return (
    <>

      <Router>

        {islogin ? (<>

          <div className="container-fluid">

            <div className="row">
              <Header />
              <div className="col-2">
                <Navigation />
              </div>
              <div className="col-10">
              <Switch>
                <Route path="/admin/dashboard">
                  {islogin ? <Redirect to="/admin/dashboard" /> : <Redirect to="/" />}
                  <Dashboard />
                </Route>
                <Route path="/admin/them-bai-viet">
                  {islogin ? <Redirect to="/admin/them-bai-viet" /> : <Redirect to="/" />}
                  <Addpost />
                </Route>
                <Route path="/admin/danh-sach-bai-viet">
                  {islogin ? <Redirect to="/admin/danh-sach-bai-viet" /> : <Redirect to="/" />}
                  <Listpost />
                </Route>
                <Route path="/admin/dang-ki-tai-khoan">
                  {islogin ? <Redirect to="/admin/dang-ki-tai-khoan" /> : <Redirect to="/" />}
                  <Register />
                </Route>
             {/*    <Route path="/admin/dang-ki-tai-khoan">
                  {islogin ? <Redirect to="/admin/dang-ki-tai-khoan" /> : <Redirect to="/" />}
                  <Register />
                </Route> */}
                <Route path="/admin/danh-sach-tai-khoan">
                  {islogin ? <Redirect to="/admin/danh-sach-tai-khoan" /> : <Redirect to="/" />}
                  <ListUser />
                </Route>
                <Route exact path="/admin/chinh-sua-tai-khoan/:_id">
                 {/*  {islogin ? <Redirect to="/admin/chinh-sua-tai-khoan/:_id" /> : <Redirect to="/" />} */}
                  <EditAccount />
                </Route>
                <Route exact path="/admin/chinh-sua-bai-viet/:_id">
                 {/*  {islogin ? <Redirect to="/admin/chinh-sua-tai-khoan/:_id" /> : <Redirect to="/" />} */}
                  <EditPost />
                </Route>
                </Switch>
              </div>
              <Footer />
            </div>
          </div>

        </>) : (<> <Route  path='/' component={Login} /></>)}







      </Router>
    </>
  );
}

export default App;
