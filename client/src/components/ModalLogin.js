
import React, { useState } from 'react';
import { Modal,Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import "../style/bootstrap-grid.min.css";
import { login } from "../redux/actions/auth.js";

const ModalLogin = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);
    const message = useSelector(state => state.auth.user);
    const history = useHistory();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        
    };
    const onFinish = (values) => {

        setLoading(true);
        dispatch(login(values))
            .then(() => {
                history.push("/");
                //window.location.reload();
            })
            .catch(() => {
                setLoading(false);
                console.log("Loi đăng nhập");
            });


        console.log('Received values of form: ', values.username);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Đăng nhập
            </Button>
            <Modal title="Đăng nhập" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
            width={800}
            >
                <Row>
                    <Col span={12} offset={6}  >
                        <Form
                       
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>


                            <Form.Item >
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                                Or <a href="/dang-ki">register now!</a>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>

            </Modal>
        </>
    );
}

export default ModalLogin;
