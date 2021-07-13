import firebase from "firebase";
const UserApi =  {
    getMe:()=>{
        return new Promise((resolve,  reject)=>{


            setTimeout(()=>{
                const currentUser =  firebase.auth().currentUser;
                resolve({
                    id:currentUser.uid,
                    username:currentUser.displayName,
                    email:currentUser.email,


                })
            },500)

        }
        )}  
    
}
 
export default UserApi;
