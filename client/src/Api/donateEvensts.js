import AxiosClient from "./AxiosClient"
const donateEvensts ={  
   getAll: ()=>{
    //http://localhost:4000/api/donateEvents
    const url = '/donateEvents';
    return AxiosClient.get(url);
   },
   get: (id)=>{
    const url = `/donateEvent/${id}`;
    return AxiosClient.get(url);
   },
   getCategory: ()=>{
       const url ="/categoryDonateEvents";  
       return AxiosClient.get(url);
   },
   getPostCategory: (id)=>{
    const url =`/relatedPost/${id}`;  
    return AxiosClient.get(url);
},
   getListdonateUser:()=>{
       const url ="/allDonate";
       return AxiosClient.get(url)
   },
   get50Donater:(id)=>{
    const url = `/50Donator/${id}`;
    return AxiosClient.get(url);
   },
   getAllDonater:(id)=>{
    const url = `/allDonator/${id}`;
    return AxiosClient.get(url);
   },
   getLogout:()=>{
       const url ="/logout";
       return AxiosClient.get(url)
   },
   putUpdateProfile:(values)=>{
    const url ="/updateProfileUser";
    return AxiosClient.put(url,values)
   },
   putChangePasss:(values)=>{
    const url ="/changePassword";
    return AxiosClient.put(url,values)
   },
   postPayMomo:(values)=>{
       const url ="/payMomo";
       return AxiosClient.post(url,values)
   }
};

export default donateEvensts;
