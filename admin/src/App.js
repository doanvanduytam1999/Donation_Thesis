import Addpost from "./Pages/Addpost/Addpost.js";
import Navigation from "./Components/Navigation.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard.js"
import Listpost from "./Pages/ListPost/Listpost.js"
import "./styles/bootstrap-grid.min.css";
import 'antd/dist/antd.css';
import Header from "./Components/Header"
import Footer from "./Components/Footer"

function App() {
  return (
    <> <Router>
      <div className="container-fluid">
        <div className="row">
          <Header />
          <div className="col-2">
            <Navigation />
          </div>
          <div className="col-10">
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/them-bai-viet">
              <Addpost />
            </Route>
            <Route path="/danh-sach-bai-viet">
              <Listpost />
            </Route>

          </div>
          <Footer />
        </div>
      </div>
    </Router>
    </>
  );
}

export default App;
