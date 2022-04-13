//import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { Col, /* Button, */ Dropdown, Menu, Row } from 'antd';
import firebase from 'firebase';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import UserApi from '../Api/UserApi';
import { logout } from "../redux/actions/auth.js";
import "../style/Header.scss";
import ModalLogin from './ModalLogin';
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
        
        
        UserApi.getLogout().then((res)=>{
         
            if(res.data.status==="success"){
                firebase.auth().signOut();
                dispatch(logout());
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
   
    <Redirect to="/" />
    return (
        <>
            <Row>
                <Col span={24} >
                    <Menu style={style} /* onClick={handleClick} */ selectedKeys={"hehe"} mode="horizontal">
                        <Menu.Item className="logo-item" key="mail">
                            <Link to=""><img alt="logo" style={{ marginLeft: '30px', fontWeight:"bold" }} width="40px" src="../images/logo.png" ></img></Link>
                        </Menu.Item>
                      
                        <Menu.Item style={{  fontWeight:"bolder" }}  key="about">
                         
                          <Link to="gioi-thieu"> Về chúng tôi</Link>
                        </Menu.Item>
                        <Menu.Item key="contact">
                            <Link style={{  fontWeight:"bolder" }}  to="/lien-he">Liên hệ</Link>
                        </Menu.Item>
                        {isLoggedIn === false ? (
                            <>
                                <Menu.Item className="right" key="sign-up" >
                                    <ModalLogin />
                                </Menu.Item>
                            </>
                        ) : (
                            <>
                             
                                <Dropdown className='right' overlay={menu}>
                                    <a href="#/" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        {data.fullName } <DownOutlined />
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
