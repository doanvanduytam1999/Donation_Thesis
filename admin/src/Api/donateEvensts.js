import AxiosClient from "./AxiosClient"

const donateEvensts ={  
   getAll: ()=>{
    const url = '/admin/allPost';
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

export default donateEvensts;
