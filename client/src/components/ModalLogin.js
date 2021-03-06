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
                ????ng nh???p / ????ng k??
            </Button>
            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                width={800} footer={null}
            >
                <Tabs /* onChange={callback} */>
                    <TabPane tab="????ng nh???p" key="1">
                        <div className="row">
                            <div className="col-6 bg-login">

                            </div>
                            <div className="col-6 frm" >
                                <h3>Xin Ch??o !</h3>
                                <Form
                                    name="normal_login"
                                    className="login-form"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    ref={form}
                                >
                                    <p style={{ color: "red" }} className="error">{Error}</p>
                                    <p>T??i kho???n </p>
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            { required: true, message: 'H??y nh???p t??i kho???n!' },
                                            {
                                                pattern: new RegExp(/^[a-zA-Z0-9]{3,16}$/),
                                                message: "T??i kho???n ph???i kh??ng c?? k?? t??? ?????c bi???t !",
                                            },
                                            {
                                                min:3,
                                                max:16,
                                                message: 'T??i kho???n ph???i t??? 3-16 k?? t??? !',
                                            }
                                        ]}>
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="T??i kho???n" autoComplete="off" />
                                    </Form.Item>
                                    <p>M???t kh???u</p>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'H??y nh???p m???t kh???u!' },
                                        {
                                            min:8,
                                            max:16,
                                            message: 'M???t kh???u ph???i t??? 8-16 k?? t??? !',
                                        }]}
                                    >
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="M???t kh???u"
                                            autoComplete="off"
                                        />
                                    </Form.Item>
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            ????ng nh???p
                                        </Button>

                                    </Form.Item>
                                </Form>
                                <p style={{fontWeight:"bolder"}}>Ho???c</p>
                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab="????ng k??" key="2">
                        <div className="row">
                            <div className="col-6 bg-register">

                            </div>
                            <div className="col-6 frm" >
                                <h3>T???o t??i kho???n !</h3>
                                <Form
                                    name="normal_resgiter"
                                    className="resgiter-form"
                                    initialValues={{ remember: true }}
                                    onFinish={onResgiter}
                                    ref={form} >
                                    <p style={{ color: "red" }} className="error">{ErrorRegister}</p>

                                    <p><span>*</span> T??i kho???n </p>
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'H??y nh???p t??i kho???n!' },
                                        {
                                            pattern: new RegExp(/^[a-zA-Z0-9]{3,16}$/),
                                            message: "T??i kho???n ph???i kh??ng c?? k?? t??? ?????c bi???t !",
                                        }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} autoComplete="off" />
                                    </Form.Item>
                                    <p><span>*</span> H??? v?? t??n</p>
                                    <Form.Item
                                        name="fullName"
                                        rules={[{ required: true, message: 'H??y nh???p h??? t??n !' }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} autoComplete="off" />
                                    </Form.Item>
                                    <p><span>*</span> M???t kh???u</p>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            { required: true, message: 'H??y nh???p m???t kh???u!' },
                                            { min: 8, message: 'M???t kh???u ph???i ????? 8 k?? t???' }
                                        ]}
                                    >
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"

                                            autoComplete="off"
                                        />
                                    </Form.Item>
                                    <p><span>*</span> Nh???p l???i m???t kh???u</p>
                                    <Form.Item
                                        name="passwordConfirm"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'H??y nh???p m???t kh???u !',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Hai m???t kh???u ph???i tr??ng nhau !'));
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
                                            ????ng k??
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
