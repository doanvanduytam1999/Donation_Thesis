import AxiosClient from "./AxiosClient"
const donateEvensts ={  
   getAll: ()=>{
    const url = '/donateEvensts';
    return AxiosClient.get(url);
   },
   get: (id)=>{
    const url = `/donateEvenst/${id}`;
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
    const url = `/allDonater/${id}`;
    return AxiosClient.get(url);
   }
};

export default donateEvensts;
