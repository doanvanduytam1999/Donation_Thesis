import React from 'react';
import { Menu, Row, Col,Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/auth.js";
import "./Header.scss";
import { Link,Redirect } from 'react-router-dom';
const handleClick = (e) => {
    console.log(e.target);
}
const style ={
    fontSize: "20px",
    fontWeight:"500",
    height:"65px",
    lineHeight:"65px"

}
const Header = () => {
    const { isLoggedIn } = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const data = useSelector(state => state.login.user);
    const logOut = () => {
        <Redirect to="/"/>
        dispatch(logout());
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
    return (
        <>
            <Row>
                <Col span={24} >
                    <Menu style={style} onClick={handleClick}  selectedKeys={"hehe"} mode="horizontal">
                        <Menu.Item className="logo-item" key="mail">
                        <Link to="">
                            <img alt="logo"  style={{marginLeft:'30px'}} width="40px" src="../images/logo.png" ></img>
                            </Link>
                        </Menu.Item>
                        <Menu.Item className="right" key="login"  >
                        <Dropdown overlay={menu}>
                                    <a href="#/" className="ant-dropdown-link" onClick={e => e.preventDefault()}>

                                        {!isLoggedIn ?(<></>):(<>{data.username}</>)} <DownOutlined />
                                    </a>
                                </Dropdown>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>


        </>
    );
}

export default Header;
