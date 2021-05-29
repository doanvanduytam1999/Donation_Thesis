import './App.css';
import Header from './components/Header';
import 'antd/dist/antd.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Detail from './pages/Detail';
function App() {
  return (
    
      <Router>
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/thong-tin-chi-tiet">
          <Detail />
        </Route>
        <Footer />
      </Router>
   
  );
}

export default App;
