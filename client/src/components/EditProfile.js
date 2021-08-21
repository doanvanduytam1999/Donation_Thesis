import React, { createRef, useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { LockOutlined, KeyOutlined } from '@ant-design/icons';
import '../style/Profile.scss';
import UserApi from '../Api/UserApi';
const Profile = () => {
    const [Error, setError] = useState("");
    /* const normFile = (e) => {

        if (Array.isArray(e)) {
            setFile(e.fileList[0].name)

        }
        return e && e.fileList;

    }; */
    const onFinish = (values) => {
        console.log('Success:', values);
        UserApi.putUpdateProfile(values)
        .then((res) => {
            if (res.data.status === "success") {
                message.success("Cập nhật thông tin thành công !")
                localStorage.setItem("user", JSON.stringify(res.data.User));
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }
            if (res.data.status === "error") {
                message.success("Cập nhật thông tin thành công !")
                localStorage.setItem("user", JSON.stringify(res.data.User));
                setTimeout(() => {
                    window.location.reload();
                }, 1000)
            }
        })
        .catch((error)=>{
            console.log("Loi nè: ",error);
        })
    };
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const form = createRef();
    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
   const onChangePass =( values)=>{
    UserApi.putChangePasss(values).then((res)=>{
            console.log(res);
            if (res.data.status === "success") {
                message.success("Thay đổi mật khẩu thành công !")
                setTimeout(() => {
                    handleCancel()
                }, 1000)
            }
        })
        .catch((error) => {
            console.log(error.response.data.error);
            setError(error.response.data.error)
        })

   }
    const user = JSON.parse(localStorage.getItem("user"))
    //console.log(user.phone);    
    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="profile">
                        <Form
                            name="basic"
                            className="profile_form"
                           /*  labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }} */
                            initialValues={{ username: `${user.username}`, fullName: `${user.fullName}`, email: `${user.email}`, id: `${user._id}` }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed} >
                            <Form.Item
                                name="id"
                                hidden>
                                <Input readOnly autoComplete={"off"} />
                            </Form.Item>
                            <Form.Item
                            label="Tên tài khoản:"
                                name="username">
                                <Input readOnly autoComplete={"off"} />
                            </Form.Item>
                            <Form.Item
                            label="Họ và tên:"
                                name="fullName">
                                <Input autoComplete={"off"} />
                            </Form.Item>
                            <Form.Item
                            label="Email"
                                name="email">
                                <Input autoComplete={"off"} />
                            </Form.Item>
                            <Form.Item >
                                <Button onClick={showModal}> <KeyOutlined />Đổi mật khẩu</Button>
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
            <Modal className="model_pass" footer={null} title="Đổi mật khẩu" visible={isModalVisible} onCancel={handleCancel}>
                <Form
                    name="normal_resgiter"
                    className="resgiter-form"
                    initialValues={{ remember: true }}
                    onFinish={onChangePass}
                    ref={form}
                >
                    <p style={{ color: "red" }}>{Error}</p> 
                    <Form.Item
                        label="Mật khẩu cũ"
                        name="oldPassword"
                        rules={[
                            { required: true, message: 'Hãy nhập mật khẩu!' },
                            { min: 8, message: 'Mật khẩu phải đủ 8 kí tự' }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"

                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[
                            { required: true, message: 'Hãy nhập mật khẩu!' },
                            { min: 8, message: 'Mật khẩu phải đủ 8 kí tự' }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"

                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại mật khẩu"
                        name="passwordConfirm"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập mật khẩu !',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Hai mật khẩu phải trùng nhau !'));
                                },
                            }),
                        ]}>
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"

                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </>

    );
}

export default Profile;
