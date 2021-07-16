import React from 'react';
//import { useDispatch,useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
    //const { isLoggedIn } = useSelector(state => state.auth);
    const islogin= JSON.parse(localStorage.getItem("user"))
    
    return (
       
        <div>
             {islogin ? <Redirect to="/admin/dashboard" /> : <Redirect to="/" />}
            Helloo
        </div>
    );
}

export default Dashboard;
