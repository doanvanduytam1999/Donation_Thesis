import React, { useRef, useEffect } from "react";
import axios from "axios";
const Paypal = () => {
    const paypal = useRef();
    const getData = JSON.parse(localStorage.getItem("data"))
   const vndToUsd =(getData.coin/23000).toFixed(2);

    console.log(vndToUsd);
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: `${getData.id}`,
                                amount: {
                                    currency_code: "USD",
                                    value: `${vndToUsd}`,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order.status);
                    const url='http://localhost:4000/donate';
                    if(order.status ==="COMPLETED"){
                        console.log("abc");
                        axios.post(url,{
                            data: getData
                        })
                    }


                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);
    return (
        <div>
            <div>
                <div ref={paypal}></div>
            </div>
        </div>
    );
}

export default Paypal;
