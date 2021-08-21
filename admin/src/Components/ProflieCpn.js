import React, { createRef, useState } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
//import { /*  UserOutlined, */ PlusOutlined } from '@ant-design/icons';
import '../Pages/Profile/Profile.scss';
import donateEvensts from '../Api/donateEvensts';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import userAdmin from '../Api/userAdmin';
const ProflieCpn = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [Error, setError] = useState("");
    const [ErrorInfo, setErrorInfo] = useState("");
    const id = user._id
    const onFinish = (values) => {
        console.log('Success:', values);
        userAdmin.putEditUserAdmin(id, values).then((res) => {
            if (res.data.status === "success") {
                message.success("Cập nhật thông tin thành công !")
                localStorage.setItem("user", JSON.stringify(res.data.UserAdmin));
            }
        })
            .catch((err) => {
                setErrorInfo(err.response.data.error)
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChangePass = (values) => {
        console.log(values);
        userAdmin.putChangePass(values).then((res) => {
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

    const [isModalVisible, setIsModalVisible] = useState(false);
    const form = createRef();
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        form.current.resetFields();
    };
    return (
        <>
            <div className="row">
                <div className="col-10  offset-2  wapper_profile">
                    <div className="profile">
                        <Form
                            name="basic"
                            labelCol={{ span: 0 }}
                            wrapperCol={{ span: 14 }}
                            initialValues={{ username: `${user.username}`, fullName: `${user.fullName}`, email: `${user.email}`, id: `${user._id}`, role: `${user.role}`, active: `Đang hoạt động` }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >

                            <Form.Item
                                name="id"
                                hidden
                            >
                                <Input style={{
                                    background: '#585858'
                                }} readOnly autoComplete={"off"} />
                            </Form.Item>
                            <p style={{ color: "red" }}>{ErrorInfo}</p>
                            <p>Loại tài khoản</p>
                            <Form.Item
                                name="role"

                            >
                                <Input style={{
                                    background: "rgba(88, 88, 88, 0.23)", color: "#000"
                                }} readOnly autoComplete={"off"} />
                            </Form.Item>
                            <p>Trạng thái</p>
                            <Form.Item

                                name="active"
                            >
                                <Input style={{
                                    background: "rgba(88, 88, 88, 0.23)", color: "#000"
                                }} readOnly autoComplete={"off"} />
                            </Form.Item>
                            <p>Tên tài khoản</p>
                            <Form.Item

                                name="username"
                            >
                                <Input style={{
                                    background: "rgba(88, 88, 88, 0.23)", color: "#000"
                                }} readOnly autoComplete={"off"} />
                            </Form.Item>

                            <p>Email</p>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={showModal}>Đổi mật khẩu</Button>
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
            <Modal footer={null} title="Đổi mật khẩu" visible={isModalVisible} onCancel={handleCancel}>
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

export default ProflieCpn;
