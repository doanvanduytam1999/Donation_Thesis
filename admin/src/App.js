import Addpost from "./Pages/Addpost/Addpost.js";
import Navigation from "./Components/Navigation.js";
import  "./styles/bootstrap-grid.min.css";
import 'antd/dist/antd.css';

function App() {
  return (
    <>
      <div className="row">
        <div className="col-2">
          <Navigation/>        </div>
        <div className="col-8"> <Addpost /> 
        </div>
      </div>
     
    </>
  );
}

export default App;
