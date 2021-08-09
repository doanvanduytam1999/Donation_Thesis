
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Modal, Result, Button } from 'antd';
import crypto  from 'create-hmac';


const Momo = () => {

    const PayMomo = () => {
        const url="http://localhost:4000/api/payMomo";
        axios.get(url)
    }
    return (
        <div>
            <Button onClick={PayMomo} >Gửi tiền</Button>
        </div>
    );
}

export default Momo;
