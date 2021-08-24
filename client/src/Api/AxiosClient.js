import axios from "axios";
require('dotenv').config()

const AxiosClient = axios.create({
    baseURL: "http://localhost:4000/api",
    //https://donatethesis.herokuapp.com/api
    headers: {
        "content-type": "application/json"
    },
    withCredentials: true
});
export default AxiosClient;