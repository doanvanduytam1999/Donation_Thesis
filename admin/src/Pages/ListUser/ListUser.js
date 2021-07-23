import React, { useEffect, useState } from 'react';
import { Table, Tag, message, Select, Button,Spin } from 'antd';
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
  const [loading,setLoading] = useState(false)
  const history= useHistory();
  const btnClick = (e) => {
    let id = e.currentTarget.dataset.id
    userAdmin.putChangeActive(id).then((res)=>{
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
         
          
        });
        setLoading(true)
      } catch (error) {
        console.log("Heloo ", error);
        message.info("Bạn không có quyền xem!")
        setTimeout(()=>{
         
          history.push("/admin/dashboard")
        },2000)
      }
    };
    fetchListUser();
  }, [count]);
  ListUser.shift();
 
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
          text: 'Manager',
          value: 'Manager',
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
  //call t nói cho nghe
  
  return (
    <>
      
      <div className="wapper_table row">
        <div className="col-10 offset-1">
          <h2 className="title_table">Danh sách tài khoản</h2>
          { loading ? <Table columns={columns} dataSource={ListUser} /> :  <Spin size="large" /> }
          
        </div>

      </div>

    </>
  );
}

export default ListUser;
