import axios from "axios";


const API_URL = "http://localhost:4000";
//const API_URLRS ="http://localhost:4000/";
const register = (values) => {
  return axios.post(API_URL + "/signup",values);
};

const login = (values) => {
  
  return axios
    .post(API_URL + "/login", values, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
     
    })
    .then((response) => {
      if (response.data.status) {
        
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        //Cookies.set('userKaca', response.data.data, {path: '/', maxAge: 30000, httpOnly: true });

      }

      return response.data.data.user;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
