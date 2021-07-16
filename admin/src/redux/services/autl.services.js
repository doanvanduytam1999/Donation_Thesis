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
      if (await response.data.status === "success") {
        if(await response.data.active === false ){
          message.info("Tài khoản chưa được kích hoạt")
          //localStorage.setItem("user", JSON.stringify([]));
        }
        else{
          
           //message.loading("Vui lòng đợi...")
           await  message.success("Đăng nhập thành công")
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          console.log(response.data.data.user);
        }
        
        //Cookies.set('userKaca', response.data.data, {path: '/', maxAge: 30000, httpOnly: true });

      }
      

      return response.data.data.user;
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
