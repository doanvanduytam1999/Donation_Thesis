import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Tabs } from 'antd';
import React, { createRef, useState } from 'react';
import GoogleButton from 'react-google-button';
import { useDispatch, useSelector } from "react-redux";
import { /* useHistory, */ Redirect } from 'react-router-dom';
import { login, register } from "../redux/actions/auth.js";
import "../style/bootstrap-grid.min.css";
import "../style/ModalLogin.scss";
import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
const { TabPane } = Tabs;
const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,


    ]
}
const ModalLogin = () => {
    //const [form] = Form.useForm();
    const form = createRef();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { isLoggedIn } = useSelector(state => state.login);
    const [Error, setError] = useState("");
    const [ErrorRegister, setErrorRegister] = useState("");
    //const [Key, setKey] = useState("");
    //const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    //const { isLoggedIn } = useSelector(state => state.auth);
    //const message = useSelector(state => state.auth.user);
    //const history = useHistory();
    const showModal = (e) => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
        form.current.resetFields();
        setError("")
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        form.current.resetFields();
        setError("")
    };
    const onFinish = (values) => {
        //setLoading(true);
        form.current.resetFields();
        dispatch(login(values))
            .then((res) => {
                console.log(res);
                setError(res)
            })
        console.log('Received values of form: ', values);
    };
    const onResgiter = (values) => {
        console.log(values);
        dispatch(register(values)).then((res) => {
            console.log(res);
            setErrorRegister(res)
        })
    }
    if (isLoggedIn !== null) {
        <Redirect to="/" />
    }
    return (
        <>
            <Button className="ant-btn-login" data-id="1" type="primary" onClick={showModal}>
                Đăng nhập / Đăng kí
            </Button>
            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                width={800} footer={null}
            >
                <Tabs /* onChange={callback} */>
                    <TabPane tab="Đăng nhập" key="1">
                        <div className="row">
                            <div className="col-6 bg-login">

                            </div>
                            <div className="col-6 frm" >
                                <h3>Xin Chào !</h3>
                                <Form
                                    name="normal_login"
                                    className="login-form"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    ref={form}
                                >
                                    <p style={{ color: "red" }} className="error">{Error}</p>
                                    <p>Tài khoản </p>
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            { required: true, message: 'Hãy nhập tài khoản!' },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9]{3,16}$/),
                                                message: "Tài khoản phải không có kí tự đặc biệt !",
                                            },
                                            {
                                                min:3,
                                                max:16,
                                                message: 'Tài khoản phải từ 3-16 kí tự !',
                                            }
                                        ]}>
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tài khoản" autoComplete="off" />
                                    </Form.Item>
                                    <p>Mật khẩu</p>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'Hãy nhập mật khẩu!' },
                                        {
                                            min:8,
                                            max:16,
                                            message: 'Mật khẩu phải từ 8-16 kí tự !',
                                        }]}
                                    >
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="Mật khẩu"
                                            autoComplete="off"
                                        />
                                    </Form.Item>
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Đăng nhập
                                        </Button>

                                    </Form.Item>
                                </Form>
                                <p style={{fontWeight:"bolder"}}>Hoặc</p>
                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab="Đăng kí" key="2">
                        <div className="row">
                            <div className="col-6 bg-register">

                            </div>
                            <div className="col-6 frm" >
                                <h3>Tạo tài khoản !</h3>
                                <Form
                                    name="normal_resgiter"
                                    className="resgiter-form"
                                    initialValues={{ remember: true }}
                                    onFinish={onResgiter}
                                    ref={form} >
                                    <p style={{ color: "red" }} className="error">{ErrorRegister}</p>

                                    <p><span>*</span> Tài khoản </p>
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'Hãy nhập tài khoản!' },
                                        {
                                            pattern: new RegExp(/^[a-zA-Z0-9]{3,16}$/),
                                            message: "Tài khoản phải không có kí tự đặc biệt !",
                                        }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} autoComplete="off" />
                                    </Form.Item>
                                    <p><span>*</span> Họ và tên</p>
                                    <Form.Item
                                        name="fullName"
                                        rules={[{ required: true, message: 'Hãy nhập họ tên !' }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} autoComplete="off" />
                                    </Form.Item>
                                    <p><span>*</span> Mật khẩu</p>
                                    <Form.Item
                                        name="password"
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
                                    <p><span>*</span> Nhập lại mật khẩu</p>
                                    <Form.Item
                                        name="passwordConfirm"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Hãy nhập mật khẩu !',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
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

                                    <p><span>*</span> Email</p>
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
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit" className="resgister-form-button">
                                            Đăng kí
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>

            </Modal>
        </>
    );
}
export default ModalLogin;
