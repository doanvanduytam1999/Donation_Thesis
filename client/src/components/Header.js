import React from 'react';
import { Menu, Row, Col, Button } from 'antd';
//import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import "../style/Header.scss";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import  {logout} from "../redux/actions/auth.js";
import ModalLogin from './ModalLogin';


const handleClick = (e) => {
    console.log(e.target);
}
const style = {
    fontSize: "20px",
    fontWeight: "500",
    height: "65px",
    lineHeight: "65px"

}
const Header = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(logout());
      };
    return (
        <>
            <Row>
                <Col span={24} >
                    <Menu style={style} onClick={handleClick} selectedKeys={"hehe"} mode="horizontal">
                        <Menu.Item className="logo-item" key="mail">
                            <a href="http://localhost:3000/">
                                <img alt="logo" style={{ marginLeft: '30px' }} width="40px" src="../images/logo.png" ></img>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="app">
                            Gây quỷ
                        </Menu.Item>
                        <Menu.Item key="about">
                            Về chúng thôi
                        </Menu.Item>
                        <Menu.Item key="contact">
                            Liên hệ
                        </Menu.Item>
                        {isLoggedIn === false? (
                            <>
                                <Menu.Item className="right-lg" key="login"  >
                                <ModalLogin />
                                </Menu.Item>
                                <Menu.Item className="right" key="sign-up" >
                                    <Button type="primary"><Link to="/dang-ki">Đăng kí</Link></Button>
                                </Menu.Item>
                            </>
                        ) : (
                            <>
                                <Menu.Item className="right" key="logut" >
                                    <Button onClick={logOut} type="primary">Đăng xuất</Button>
                                </Menu.Item>
                            </>
                        )}


                    </Menu>
                </Col>
            </Row>


        </>
    );
}

export default Header;
