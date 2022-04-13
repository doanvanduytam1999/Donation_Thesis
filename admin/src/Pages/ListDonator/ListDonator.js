import React,{useState,useEffect} from 'react';
import { Table, Tag, message, Select, Button,Spin } from 'antd';
import userAdmin from "../../Api/userAdmin";
import { EditOutlined } from '@ant-design/icons';
//import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
import "./ListDonator.scss";
import "../../styles/bootstrap-grid.min.css"

const ListDonator = () => {
    const [ListUser, setListUser] = useState([]);
    const [count, setCount]= useState(0)
    const [loading,setLoading] = useState(false)
    const btnClick = (e) => {
        let id = e.currentTarget.dataset.id
        userAdmin.putChangeActiveDonator(id).then((res)=>{
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
            await userAdmin.getAllDonator().then((res) => {
              if (res.data.status == "success") {
                setListUser(res.data.AllUser);
              }
            });
            setLoading(true)
          } catch (error) {
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
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
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
      ]
    return (
        <>
             <div className="wapper_listDonator row">
        <div className="col-10 offset-1">
          <h2 className="listDonator">Danh sách tài khoản Nhà hảo tâm</h2>
          { loading ? <Table columns={columns} dataSource={ListUser} /> :  <Spin size="large" /> }
          
        </div>

      </div>
        </>
    );
}

export default ListDonator;
