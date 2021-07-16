import AxiosClient from "./AxiosClient";
const userAdmin = {
    getAllUser: () => {
        const url = '/admin/allUserAdmin';
        return AxiosClient.get(url);
    },
    getUserAdmin: (id) => {
        const url = `/admin/userAdmin/${id}`;
        return AxiosClient.get(url);
    },

    postEditUserAdmin: (id, values) => {
        const url = `/admin/editUserAdmin/${id}`;
        return AxiosClient.post(url, values);
    },
    postChangeActive: (id) => {
        const url = `/admin/changeActiveUserAdmin/${id}`;
        return AxiosClient.post(url);
    },
    postchangeStatus: (id, values) => {
        const url = `/admin/changeStatusPost/${id}`;
        return AxiosClient.post(url, values);
    }

}
export default userAdmin;