import AxiosClient from "./AxiosClient";
const userAdmin = {
    getAllUser: () => {
        const url = '/admin/allUserAdmin';
        return AxiosClient.get(url);
    },
    getAllDonator: () => {
        const url = '/admin/allUser';
        return AxiosClient.get(url);
    },
    getUserAdmin: (id) => {
        const url = `/admin/userAdmin/${id}`;
        return AxiosClient.get(url);
    },

    putEditUserAdmin: (id, values) => {
        const url = `/admin/editUserAdmin/${id}`;
        return AxiosClient.put(url, values);
    },
    putChangeActive: (id) => {
        const url = `/admin/changeActiveUserAdmin/${id}`;
        return AxiosClient.put(url);
    },
    putChangeActiveDonator: (id) => {
        const url = `/admin/changeActiveUser/${id}`;
        return AxiosClient.put(url);
    },
    postAddHappiness: (id, values) => {
        const url = `/admin/addHappiness/${id}`;
        return AxiosClient.post(url, values);
    },
    putChangePass: (values)=>{
        const url  ="/admin/changePassword";
        return AxiosClient.put(url, values);
    },
    postAddPost: (values) => {
        const url = `admin/addPost`;
        return AxiosClient.post(url, values);
    },

}
export default userAdmin;