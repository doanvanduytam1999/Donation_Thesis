import React from 'react';
import { Menu } from 'antd';
import { UnorderedListOutlined,AppstoreOutlined,BarsOutlined,TeamOutlined } from '@ant-design/icons';
import { Link,Redirect} from "react-router-dom";
const { SubMenu } = Menu;
const Navigation = () => {
  const isLoggedIn= JSON.parse(localStorage.getItem("user"))
    if(!isLoggedIn){
        <Redirect to="/login"></Redirect>
    }
    return (
        <Menu
       /*  onClick={this.handleClick} */
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline" 
      >
        <SubMenu key="sub1"  title={<><UnorderedListOutlined />  Quản Lý</>}>
        <Menu.Item key="1"><Link to="/admin/dashboard"><AppstoreOutlined />  Dashboard</Link></Menu.Item>
          
          <SubMenu key="sub2"  title={<><BarsOutlined /> Quản lý Bài viết</>}>
            <Menu.Item key="2"><Link to="/admin/danh-sach-bai-viet">Danh sách bài viết</Link></Menu.Item>
            <Menu.Item  key="3"><Link to="/admin/them-bai-viet">Thêm bài viết</Link></Menu.Item>
         
          </SubMenu>
          <SubMenu key="sub3" title={<><TeamOutlined /> Quản lý tài khoản</>}>
            <Menu.Item key="4"><Link to="/admin/danh-sach-tai-khoan-admin">Admin</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/admin/danh-sach-tai-khoan-user">User</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/admin/dang-ki-tai-khoan">Thêm cộng tác viên</Link></Menu.Item>
           
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4"  title="Navigation Two">
          <Menu.Item key="7">Option 5</Menu.Item>
          <Menu.Item key="8">Option 6</Menu.Item>
          <SubMenu key="sub5" title="Submenu">
            <Menu.Item key="9">Option 7</Menu.Item>
          
          </SubMenu>
        </SubMenu>
      
      </Menu>
    );
}

export default Navigation;
