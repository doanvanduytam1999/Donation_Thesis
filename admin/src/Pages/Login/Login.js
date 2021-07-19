import React,{ useState} from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import {  useHistory } from 'react-router-dom';
import "../../styles/bootstrap-grid.min.css";
import { login } from "../../redux/actions/auth.js";
import "./Login.scss"
const Login = () => {
    //const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    //const { isLoggedIn } = useSelector(state => state.auth);
    //const  message  = useSelector(state => state.auth.user);
    const history = useHistory();
    const [Error, setError] = useState("");
    const onFinish = (values) => {
        dispatch(login(values))
            .then((res) => {
                //history.push("/admin/dashboard")
                setError(res)
                console.log(res);
                window.location.replace('/admin/dashboard');
            })
            .catch(() => {
                //console.log(error);
                //message.error("Lỗi đăng nhập")
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
                        <p style={{color:"red"}} className="error">{Error}</p>
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
                                   Đăng nhập
                                </Button>
                                
                            </Form.Item>
                        </Form>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Login;
