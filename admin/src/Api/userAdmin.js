import AxiosClient from "./AxiosClient";
const userAdmin ={  
    getAllUser: ()=>{
     const url = '/admin/allUserAdmin';
     return AxiosClient.get(url);
    },
    get: (id)=>{
     const url = `/donateEvenst/${id}`;
     return AxiosClient.get(url);
    },
    getCategory: ()=>{
        const url ="categoryDonateEvents";
        return AxiosClient.get(url);
    },
    getLogOut: ()=>{
     const url ="/admin/logout";
     return AxiosClient.get(url);
 }
 };
 
 export default userAdmin;