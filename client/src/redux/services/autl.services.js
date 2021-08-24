import axios from "axios";
import { message } from "antd";

const API_URL = "http://localhost:4000/api";
//const API_URLRS ="http://localhost:4000/";
//https://donatethesis.herokuapp.com/api
const register = (values) => {
  return axios.post(API_URL + "/signup",values).then((res)=>{
    console.log(res.data.status);
    if (res.data.status ==="success") {
      console.log(res.data.status);
      message.success("Đăng kí thành công!")
      alert("Đăng ký thành công, vui lòng đăng nhập!")
        setTimeout(()=>{
                    window.location.reload();
                  },2000)
      return res.data.data.user;
    }
    
  })
  .catch(err=>{
    let data = {
      status: "error",
      error: err.response.data.error
    };
    //alert(data.error);
    return data;
    //return
  });
  
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
        console.log(response.data.status);
        message.success("Đăng nhập thành công! ")
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        //Cookies.set('userKaca', response.data.data, {path: '/', maxAge: 30000, httpOnly: true });

      }

      return response.data.data.user;
    })
    .catch(err=>{
      let data = {
        status: "error",
        error: err.response.data.error
      };
      return data;
      //return
    });
    
};

const logout = () => {
  localStorage.removeItem("user");
};

/* export default {
  register,
  login,
  logout,
}; */
const exportedObject = {
  register,
  login,
  logout,
};
export default exportedObject;