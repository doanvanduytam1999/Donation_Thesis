import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Select, Button } from 'antd';
import userAdmin from "../../Api/userAdmin";
import { EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
//import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
import "./ListUser.scss";
import "../../styles/bootstrap-grid.min.css"
import { Link,useHistory } from 'react-router-dom';
const { Option } = Select;

const ListUser = () => {
  const history= useHistory();
  const btnClick = (e) => {
    let id = e.currentTarget.dataset.id
    console.log(id);

  }
  const btnEdit = (e) => {
    let id = e.currentTarget.dataset.id
    console.log(id);
    history.push(`/admin/chinh-sua-tai-khoan`)
    //return <Link to={}/>

  }
  const columns = [
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Gmail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'role',
      key: 'action',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      key: 'active',
      render: active => (
        <>
          {active === true ? (
            <>
              <Tag color={'green'} >
                {"Đang hoạt động ".toUpperCase()}
              </Tag>
              <Button data-id={active} onClick={btnClick}><LockOutlined /> Khoá</Button>
            </>
          ) : (
            <>
              <Tag color={'red'} >
                {"không hoạt động".toUpperCase()}
              </Tag>
              <Button data-id={active} onClick={btnClick}><UnlockOutlined />Kích hoạt</Button>
            </>
          )}
        </>
      ),
    },
    {
      title: 'Chỉnh sửa',
      dataIndex: '_id',
      key: '_id',
      render: text => (
        <>
          <Button data-id={text} onClick={btnEdit}><EditOutlined /></Button>
        </>
      ),
    },
  ]

  const [ListUser, setListUser] = useState([]);
  useEffect(() => {
    const fetchListUser = async () => {
      try {
        await userAdmin.getAllUser().then((res) => {
          if (res.data.status == "success") {
            setListUser(res.data.AllUserAdmin);
          }
          else {
            console.log("Loi kay du lieu");
          }


        });
      } catch (error) {
        console.log("Failed to fetch brand data at: ", error);
      }
    };
    fetchListUser();
  }, []);

  return (
    <>

      <div className="wapper_table row">
        <div className="col-10 offset-1">
          <h2 className="title_table">Danh sách tài khoản</h2>
          <Table columns={columns} dataSource={ListUser} />
        </div>

      </div>

    </>
  );
}

export default ListUser;
