import React, { /* useState */ } from 'react';
import { Form, Input, Button, message } from 'antd';
//import { /*  UserOutlined, */ PlusOutlined } from '@ant-design/icons';
import '../Pages/Profile/Profile.scss';
import donateEvensts from '../Api/donateEvensts';
const ProflieCpn = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
        donateEvensts.putUpdateProfile(values).then((res) => {
            if (res.data.status === "success") {
                message.success("Cập nhật thông tin thành công !")
                localStorage.setItem("user", JSON.stringify(res.data.User));
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const user = JSON.parse(localStorage.getItem("user"))
    return (
        <>
            <div className="row">
                <div className="col-2">


                </div>
                <div className="col-10">
                    <div className="profile">


                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ username: `${user.username}`, fullName: `${user.fullName}`, email: `${user.email}`, id: `${user._id}` }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                name="id"
                                hidden
                            >
                                <Input readOnly autoComplete={"off"} />
                            </Form.Item>
                            <p>Tên tài khoản:</p>
                            <Form.Item
                                name="username"
                            >
                                <Input readOnly autoComplete={"off"} />
                            </Form.Item>
                          
                            <p>Gmail:</p>
                            <Form.Item
                                name="email"
                            >
                                <Input autoComplete={"off"} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>


        </>

    );
}

export default ProflieCpn;
