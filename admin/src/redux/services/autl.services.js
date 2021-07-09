import axios from "axios";
import { message } from 'antd';

const API_URL = "http://localhost:4000/admin";
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
      if (response.data.status ==="success") {
        message.success("Đăng nhập thành công!")
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        //Cookies.set('userKaca', response.data.data, {path: '/', maxAge: 30000, httpOnly: true });

      }

      return response.data.data.user;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios
    .get(API_URL + "/logout", {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
     
    })
    .then((response) => {
      if (response.data.status ==="success") {
        message.error("Đã đăng xuất")
        window.location.reload()

      }

      //return response.data.data.user;
    });
  

};

export default {
  register,
  login,
  logout,
};
