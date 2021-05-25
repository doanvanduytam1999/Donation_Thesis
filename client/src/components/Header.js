import React from 'react';
import { Menu, Row, Col,Button } from 'antd';
//import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import "../style/Header.scss";
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
    return (
        <>
            <Row>
                <Col span={24} >
                    <Menu style={style} onClick={handleClick}  selectedKeys={"hehe"} mode="horizontal">
                        <Menu.Item className="logo-item" key="mail">
                            <img alt="logo"  style={{marginLeft:'30px'}} width="40px" src="../images/logo.png" ></img>
                        </Menu.Item>
                        <Menu.Item  key="app">
                            Gây quỷ
                        </Menu.Item>
                        <Menu.Item key="about">
                            Về chúng thôi
                        </Menu.Item>
                        <Menu.Item key="contact">
                            Liên hệ
                        </Menu.Item>
                        <Menu.Item className="right-lg" key="login"  >
                            <Button type="primary">Đăng nhập</Button>
                        </Menu.Item>
                        <Menu.Item className="right" key="sign-up" >
                        <Button type="primary">Đăng kí</Button>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>


        </>
    );
}

export default Header;
