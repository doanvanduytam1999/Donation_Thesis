import React from 'react';
import { Menu } from 'antd';
//import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
const { SubMenu } = Menu;
const Navigation = () => {
    return (
        <Menu
       /*  onClick={this.handleClick} */
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline" 
      >
        <SubMenu key="sub1"  title="Quản lí">
        <Menu.Item key="1"><Link to="/">Dashboard</Link></Menu.Item>
          <Menu.ItemGroup key="g1" title="Bài viết">
           
            <Menu.Item key="2"><Link to="/danh-sach-bai-viet">Danh sách bài viết</Link></Menu.Item>
            <Menu.Item  key="3"><Link to="/them-bai-viet">Thêm bài viết</Link></Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="4">Option 3</Menu.Item>
            <Menu.Item key="5">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2"  title="Navigation Two">
          <Menu.Item key="6">Option 5</Menu.Item>
          <Menu.Item key="7">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="8">Option 7</Menu.Item>
            <Menu.Item key="9">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4"  title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    );
}

export default Navigation;
