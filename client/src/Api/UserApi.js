import firebase from "firebase";
import AxiosClient from "./AxiosClient"
const UserApi = {
    getMe: () => {
        return new Promise((resolve, reject) => {



            const currentUser = firebase.auth().currentUser;
            resolve({
                id: currentUser.uid,
                fullName: currentUser.displayName,
                email: currentUser.email,


            })


        }
        )
    },
    getLogout: () => {
        const url = "/logout";
        return AxiosClient.get(url)
    },
    putUpdateProfile: (values) => {
        const url = "/updateProfileUser";
        return AxiosClient.put(url, values)
    },
    putChangePasss: (values) => {
        const url = "/changePassword";
        return AxiosClient.put(url, values)
    },
    postLoginGoogle: (values) => {
        const url = "/loginByGoogle";
        return AxiosClient.post(url, values)
    },



}

export default UserApi;
