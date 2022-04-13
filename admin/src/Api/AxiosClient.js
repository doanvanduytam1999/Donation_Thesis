import axios from "axios";
require('dotenv').config()

const AxiosClient = axios.create({
    //baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "content-type": "application/json"
    },
    withCredentials: true
});
export default AxiosClient;