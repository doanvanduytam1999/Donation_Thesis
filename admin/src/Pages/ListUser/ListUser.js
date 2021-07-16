import React, { useEffect, useState } from 'react';
import { Table, Tag, message, Select, Button } from 'antd';
import userAdmin from "../../Api/userAdmin";
import { EditOutlined } from '@ant-design/icons';
//import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
import "./ListUser.scss";
import "../../styles/bootstrap-grid.min.css"
import { Link,useHistory } from 'react-router-dom';
//import EditAccount from '../EditAccount/EditAccount';
const { Option } = Select;

const ListUser = () => {
  const [ListUser, setListUser] = useState([]);
  //const [Account, setAccount] = useState([]);
  const [count, setCount]= useState(0)
  //const history= useHistory();
  const btnClick = (e) => {
    let id = e.currentTarget.dataset.id
    userAdmin.postChangeActive(id).then((res)=>{
      if (res.data.status == "success") {
             message.success("Chỉnh sửa thành công !")
             let i=0;
             setCount(count+1)
         }
     })
    //console.log(count);

  }
  useEffect(() => {
    const fetchListUser = async () => {
      try {
        await userAdmin.getAllUser().then((res) => {
          if (res.data.status == "success") {
            setListUser(res.data.AllUserAdmin);
          }
          else {
            console.log("Loi lay du lieu");
          }


        });
      } catch (error) {
        console.log("Failed to fetch brand data at: ", error);
      }
    };
    fetchListUser();
  }, [count]);
  
 
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
      filters: [
        {
          text: 'Super Admin',
          value: 'Super Admin',
        },
        {
          text: 'Admin',
          value: 'Admin',
        },
        {
          text: 'CTV',
          value: 'CTV',
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      
      render: (text) => (
        <>
          {text === true ? (
            <>
              <Tag color={'green'} >
                {"Đang hoạt động ".toUpperCase()}
              </Tag>
              
            </>
          ) : (
            <>
              <Tag color={'red'} >
                {"không hoạt động".toUpperCase()}
              </Tag>
             
            </>
          )}
        </>
      ),
    },
    {
      
      dataIndex: '_id',
      
      render: (text) => (
        <>
              <Button data-id={text} onClick={btnClick}><EditOutlined /> Thay đổi trạng thái</Button>
            
        </>
      ),
    },
    {
      title: 'Chỉnh sửa',
      dataIndex: '_id',
      key: '_id',
      render: text => (
        <>
          <Link to={`/admin/chinh-sua-tai-khoan/${text}`}><Button><EditOutlined /></Button> </Link>
        </>
      ),
    },
    
  ]

  
  
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
