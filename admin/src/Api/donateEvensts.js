import AxiosClient from "./AxiosClient"

const donateEvensts ={  
   getAll: ()=>{
    const url = '/admin/allPost';
    return AxiosClient.get(url);
   },
   getPostID: (id)=>{
    const url = `/admin/postID/${id}`;
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
