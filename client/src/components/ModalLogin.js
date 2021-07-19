import React, { useState } from 'react';
import { Modal, Form, Input, Button, Row, Col, Tabs, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { useHistory,Redirect } from 'react-router-dom';
import "../style/bootstrap-grid.min.css";
import { login,register } from "../redux/actions/auth.js";
import "../style/ModalLogin.scss";
// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/thong-tin-tai-khoan',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };
const { TabPane } = Tabs;
const ModalLogin = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { isLoggedIn } = useSelector(state => state.login);
    const [Error, setError] = useState("");
    //const [Key, setKey] = useState("");
    //const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    //const { isLoggedIn } = useSelector(state => state.auth);
    //const message = useSelector(state => state.auth.user);
    const history = useHistory();
    const showModal = (e) => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
   
    const handleCancel = () => {
        setIsModalVisible(false);

    };
    const onFinish = (values) => {
        //setLoading(true);
        dispatch(login(values))
            .then((res) => {
               console.log(res);
               setError(res)
               //message.warning(res)
            })
            


        console.log('Received values of form: ', values.username);
    };
    const onResgiter =(values)=>{
        console.log(values);
        dispatch(register(values)).then(()=>{
            console.log("dăng kí");
        })
        .catch(()=>{
            console.log("dang ki that bai");
        })
    }
    const Facebook = props => (
        <a href="#/" id="facebookIcon"></a>
    );
    const Twitter = props => (
        <a href="#/" id="twitterIcon"></a>
    );
    const Google = props => (
        <a href="#/" id="googleIcon"></a>
    );
    if(isLoggedIn !==null){
        <Redirect to="/" />
    
      }
    return (
        <>
            <Button className="ant-btn-login" data-id="1" type="primary" onClick={showModal}>
                Đăng nhập / Đăng kí
            </Button>
            {/* <Button className="ant-btn-resgister" data-id="2" type="primary" onClick={showModal}>
                Đăng kí
            </Button> */}
            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                width={500} footer={null}
            >
                <Row>
                    <Col span={16} offset={4}  >
                        <Tabs /* onChange={callback} */>
                            <TabPane tab="Đăng nhập" key="1">
                                <Form
                                    name="normal_login"
                                    className="login-form"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                >
                                     <p style={{color:"red"}} className="error">{Error}</p>
                                     <br></br>
                                     <br></br>
                                    <p>Tài khoản </p>
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'Hãy nhập tài khoản!' }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tài khoảng" autoComplete="off" />
                                    </Form.Item>
                                    <p>Mật khẩu</p>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
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
                            </TabPane>
                            <TabPane tab="Đăng kí" key="2">
                                <Form
                                    name="normal_resgiter"
                                    className="resgiter-form"
                                    initialValues={{ remember: true }}
                                    onFinish={onResgiter}
                                >
                                    <p>Tài khoản </p>
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'Hãy nhập tài khoản!' }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />}  autoComplete="off" />
                                    </Form.Item>
                                    <p>Mật khẩu</p>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
                                    >
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                           
                                            autoComplete="off"
                                        />
                                    </Form.Item>
                                    <p>Nhập lại mật khẩu</p>
                                    <Form.Item
                                        name="passwordcf"
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
                                    <p>Họ và tên</p>
                                    <Form.Item
                                        name="name"
                                        rules={[{ required: true, message: 'Hãy nhập họ tên !' }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} autoComplete="off" />
                                    </Form.Item>
                                    <p>Số điện thoại</p>
                                    <Form.Item
                                        name="phone"
                                        rules={[{ required: true, message: 'Hãy nhập số điện thoại!' }]}
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Số điện thoại" autoComplete="off" />
                                    </Form.Item>
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit" className="resgister-form-button">
                                            Đăng kí
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                        </Tabs>
                        {/* <div className="login-with">
                            <label>Or sign in with:</label>
                            <div id="iconGroup">
                                <Facebook />
                                <Twitter />
                                <Google />
                                 <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                            </div>
                        </div> */}
                    </Col>
                </Row>
            </Modal>
        </>
    );
}
export default ModalLogin;
