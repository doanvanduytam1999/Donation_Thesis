import axios from "axios";
import { message } from 'antd';
import ApiLogin from "../../Api/ApiLogin";
import { LoadingOutlined} from '@ant-design/icons';
 const API_URL = "http://localhost:4000/admin";
//const API_URLRS ="http://localhost:4000/";
const register = (values) => {
    return ApiLogin.postAddUser(values)/* .then((res)=>{
      if( res.data.status === "success"){
        message.success("Thêm tài khoản thành công !")
      }
    }); */
};
const login = (values) => {
  return ApiLogin.postLogin(values)
    .then(async( response) => {
      if ( response.data.status === "success") {
             message.success("Đăng nhập thành công")
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          console.log(response.data.data.user);
        }
      return response.data.data.user;
      
    }).catch(err=>{
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
  return ApiLogin.getLogout()
    .then((response) => {
      if (response.data.status === "success") {
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
