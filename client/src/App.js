import './App.css';
import Header from './components/Header';
import 'antd/dist/antd.css';
import Home from './pages/Home';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Detail from './pages/Detail';
function App() {
  return (
    
      <Router>
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/thong-tin-chi-tiet/:_id">
          <Detail />
        </Route>
        <Footer />
      </Router>
   
  );
}

export default App;
