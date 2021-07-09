import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch,useSelector } from "react-redux";
import {  useHistory,Redirect } from 'react-router-dom';
import "../../styles/bootstrap-grid.min.css";
import { login } from "../../redux/actions/auth.js";
import "./Login.scss"
const Login = () => {

    //const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    //const { isLoggedIn } = useSelector(state => state.auth);
    //const  message  = useSelector(state => state.auth.user);
    const history = useHistory();

    const onFinish = (values) => {

       
        dispatch(login(values))
            .then(() => {
              
                window.location.reload();
            })
            .catch(() => {
                
                message.error("Lỗi đăng nhập")
            });
        console.log('Received values of form: ', values.username);
    };
    //console.log(isLoggedIn);
    return (
        <>
            <div className='container'>
                <div className="row">
                    <div className="col-6 offset-3">
                        <h2 style={{ textAlign: "center" }}>Đăng nhập</h2>

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
                                Or <a href="#/">register now!</a>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Login;
