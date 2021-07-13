import React from 'react';
import { Menu, Row, Col, Button, Dropdown, Badge } from 'antd';
//import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { DownOutlined, BellOutlined } from '@ant-design/icons';
import "../style/Header.scss";
import { Link,Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/auth.js";
import ModalLogin from './ModalLogin';
import firebase from 'firebase';
import donateEvensts from '../Api/donateEvensts';
/* const handleClick = (e) => {
    console.log(e.target);
} */
const style = {
    fontSize: "20px",
    fontWeight: "500",
    height: "65px",
    lineHeight: "65px",
    zIndex: '1000',
}
const Header = () => {
    const { isLoggedIn } = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const data = useSelector(state => state.login.user);
    const logOut = () => {
        donateEvensts.getLogout().then((res)=>{
            if(res.data.status==="success"){
                <Redirect to="/" />
                dispatch(logout());
                firebase.auth().signOut();
                localStorage.removeItem('user');
            }
        })
    };
    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item >
                <Link to="/thong-tin-tai-khoan">Thông tin tài khoản</Link>
            </Menu.Item>
            <Menu.Item danger >
                <Link onClick={logOut}>Đăng xuất</Link>
            </Menu.Item>
        </Menu>
    );
    const notification = (
        <Menu>
            <Menu.Item>
                <Link to="">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item >
                <Link to="/thong-tin-tai-khoan">Thông tin tài khoản</Link>
            </Menu.Item>
            <Menu.Item danger >
                <Link onClick={logOut}>Đăng xuất</Link>
            </Menu.Item>
        </Menu>
    );
    <Redirect to="/" />
    return (
        <>
            <Row>
                <Col span={24} >
                    <Menu style={style} /* onClick={handleClick} */ selectedKeys={"hehe"} mode="horizontal">
                        <Menu.Item className="logo-item" key="mail">
                            <Link to=""><img alt="logo" style={{ marginLeft: '30px' }} width="40px" src="../images/logo.png" ></img></Link>
                        </Menu.Item>
                        <Menu.Item key="app">
                            <a href="#register">Gây quỷ</a>
                        </Menu.Item>
                        <Menu.Item key="about">
                            Về chúng thôi
                        </Menu.Item>
                        <Menu.Item key="contact">
                            <Link to="/lien-he">Liên hệ</Link>
                        </Menu.Item>
                        {isLoggedIn === false ? (
                            <>
                                <Menu.Item className="right" key="sign-up" >
                                    <ModalLogin />
                                </Menu.Item>
                            </>
                        ) : (
                            <>
                                <Menu.Item className="right-lg" key="notification"  >

                                    <Dropdown overlay={notification} trigger={['click']}>
                                        <a href="#/" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                            <Badge size="default" count={5}>
                                                <BellOutlined style={{ fontSize: "30px" }} />
                                            </Badge>
                                        </a>
                                    </Dropdown>
                                </Menu.Item>
                                <Dropdown className='right' overlay={menu}>
                                    <a href="#/" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        {data.username} <DownOutlined />
                                    </a>
                                </Dropdown>
                            </>
                        )}
                    </Menu>
                </Col>
            </Row>
        </>
    );
}

export default Header;
