import React,{useState} from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { Redirect,useHistory } from 'react-router-dom';
import "../style/bootstrap-grid.min.css";
import  {login} from "../redux/actions/auth.js";



const Login = () => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);
    const  message  = useSelector(state => state.auth.user);
    const history = useHistory();

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
    if (isLoggedIn) {
        return <Redirect to="/" />;
      }
    return (
        <>
            <Row className='login-container'>
                <Col className="login-form-wrapper" offset={6} span={10}>
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
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


                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>

        </>
    );
}

export default Login;
