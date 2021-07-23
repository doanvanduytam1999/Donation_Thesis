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
   getListdonateUser:()=>{
       const url ="/allDonate";
       return AxiosClient.get(url)
   },
   getAllDonater:(id)=>{
    const url = `/50Donator/${id}`;
    return AxiosClient.get(url);
   },
   getLogout:()=>{
       const url ="/logout";
       return AxiosClient.get(url)
   },
   putUpdateProfile:(values)=>{
    const url ="/updateProfileUser";
    return AxiosClient.put(url,values)
   }
};

export default donateEvensts;
