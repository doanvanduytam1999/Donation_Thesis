import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Modal,Result,Button } from 'antd';
//import {Link} from "react-router-dom"
const Paypal = () => {
    const paypal = useRef();
    const getData = JSON.parse(localStorage.getItem("data"))
    const vndToUsd = (getData.amountToDonate / 23000).toFixed(2);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
        window.location.reload();
    };
   /*  const handleCancel = () => {
        setIsModalVisible(false);
    }; */
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
                    const url = 'http://localhost:4000/api/donate';
                    if (order.status === "COMPLETED") {
                        console.log(order.status);
                        console.log(getData);
                        axios.post(url, {
                            data: getData
                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            withCredentials: true
                        }).then((res)=>{
                            console.log(res.data);
                        })
                        showModal();
                    }
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, [getData, vndToUsd]);
    return (
        <div>
            <div>
                <div ref={paypal}></div>
            </div>
            <Modal title="" visible={isModalVisible}>
                <Result
                    status="success"
                    title="Cám ơn bạn đã ủng hộ !"
                    subTitle="Số tiền sẽ gữi cho người nhận ngay khi kết thúc chương trình !"
                    extra={[
                        <Button onClick={handleOk} type="primary" key="console">
                            Trở về trang chủ
                        </Button>,
                       
                    ]}
                />
            </Modal>
        </div>
    );
}

export default Paypal;
