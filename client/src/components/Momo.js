
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "../style/Momo.scss"
const Momo = () => {
    const getData = JSON.parse(localStorage.getItem("data"));
    let ms = Date.now()
    getData['orderId'] ="MM"+ms;
    getData['requestId'] ="MM"+ms;
    //getData['checked'] = checked;
    //getData['orderInfo']=Donate.title;
    //getData['donateEvent'] = _id;
    console.log(getData);
    const PayMomo = () => {
        const url = "http://localhost:4000/api/payMomo";
        axios.post(url,getData).then((res)=>{
            console.log("data",res.data);
            if(res.data.MomoPay.errorCode==0)
            {
                let url = res.data.MomoPay.payUrl
                console.log("url",url);
                window.open(url)
            }
        });
    }
    return (
        <div class="checkout-button">
            <div class="content" >
                <p onClick={PayMomo} class="checkout-title">
                    Thanh toán bằng Ví MoMo
                </p>

            </div>
        </div>

    );
}

export default Momo;
