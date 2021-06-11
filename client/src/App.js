import './App.css';
import Header from './components/Header';
import 'antd/dist/antd.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Detail from './pages/Detail';
import ScrollToTop from './Api/ScrollToTop';
function App() {
  return (

    <Router>
    
        <Header />
        <Route exact path="/">
          <Home />

        </Route>
        <ScrollToTop />
        <Switch>
        <Route exact path="/thong-tin-chi-tiet/:_id">
          <Detail />
        </Route>
        </Switch>
        <Footer />
     
    </Router>

  );
}

export default App;
