import axios from "axios";
require('dotenv').config()

const AxiosClient = axios.create({
    baseURL: "https://donatethesis.herokuapp.com/api",
    //https://donatethesis.herokuapp.com/api
    headers: {
        "content-type": "application/json"
    },
    withCredentials: true
});
export default AxiosClient;