import React from 'react';
import { Menu } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined, BarsOutlined, TeamOutlined } from '@ant-design/icons';
import { Link, Redirect } from "react-router-dom";
import "./Navi.scss"
const { SubMenu } = Menu;
const Navigation = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem("user"))
  if (!isLoggedIn) {
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

      <Menu.ItemGroup key="g1" title={<><BarsOutlined />  Quản lý </>}>
        <Menu.Item key="1"><Link to="/admin/dashboard"><AppstoreOutlined />  Dashboard</Link></Menu.Item>
      </Menu.ItemGroup>
      {isLoggedIn.role === "Manager" || isLoggedIn.role==="CTV" ?(<>
        <Menu.ItemGroup key="g2" title={<><BarsOutlined />  Quản lý bài viết</>}>
        <Menu.Item key="2"><Link to="/admin/danh-sach-bai-viet">Danh sách bài viết</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/admin/them-bai-viet">Thêm bài viết</Link></Menu.Item>
      </Menu.ItemGroup>
      
      
      
      </>):(<>
        <Menu.ItemGroup key="sub3" title={<><TeamOutlined /> Quản lý tài khoản</>}>
        <Menu.Item key="4"><Link to="/admin/danh-sach-tai-khoan-admin">Danh sách tài khoản Admin</Link></Menu.Item>
        <Menu.Item key="5"><Link to="/admin/danh-sach-tai-khoan-user">Nhà hảo tâm</Link></Menu.Item>
        <Menu.Item key="6"><Link to="/admin/dang-ki-tai-khoan">Thêm tài khoản</Link></Menu.Item>
      </Menu.ItemGroup>

      </>) }
     

      


    </Menu>
  );
}

export default Navigation;
