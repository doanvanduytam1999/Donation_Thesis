
import AxiosClient from "./AxiosClient";

const ApiLogin ={
    postLogin: (values)=>{
        const url = '/admin/login';
        return AxiosClient.post(url,values);
       },
    getLogout: ()=>{
        const url = '/admin/logout';
        return AxiosClient.get(url);
    },
    postAddUser: (values)=>{
        const url ="/admin/addUserAdmin";
        return AxiosClient.post(url,values);
    }
}

export default ApiLogin;
