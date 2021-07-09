import React,{ useEffect, useState }  from 'react';
import donateEvensts from '../../Api/donateEvensts';
import { Table  } from 'antd';
import {Redirect,Link} from "react-router-dom";



const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const Listpost = () => {
    const [listDonate, setListDonate] = useState([]);
    const islogin= JSON.parse(localStorage.getItem("user"))
    islogin ? <Redirect to="/admin/danh-sach-bai-viet" /> : <Redirect to="/" />                                                     
    useEffect(() => {
        const fetchdonatesData = async () => {
            try {
                await donateEvensts.getAll().then((res) => {
                   
                   
                    setListDonate(res.data.AllPost);
                    
                });
            } catch (error) {
                console.log("Failed to fetch brand data at: ", error);
            }
        };
        fetchdonatesData();
    }, []);
  console.log(listDonate);
    const columns = [
        {
          title: 'Tiêu đề bài viết',
          dataIndex: 'tieuDe',
          key: 'tieude',
        },
        {
          title: 'Ngày bắt đầu',
          dataIndex: 'ngayBatSau',
          key: 'ngayBatSau',
        },
        {
          title: 'Ngày kết thúc',
          dataIndex: 'ngayKetThuc',
          key: 'ngayKetThuc',
        },
        {
            title: 'Số tiền cần ủng hộ(VNĐ)',
            dataIndex: 'soTienCanDonate',
            key: 'soTienCanDonate',
          },
          {
            title: 'Số tiền đã quyên góp được(VNĐ)',
            dataIndex: 'soTienDonateHieTai',
            key: 'soTienDonateHieTai',
          },
          {
            title: 'Trạng thai',
            dataIndex: 'trangThai',
            key: 'trangThai',
          },
      ];
    return (
       <>
       {islogin ? <Redirect to="/admin/danh-sach-bai-viet" /> : <Redirect to="/" />}
       <div style={{textAlign:"center"}}>
       <Table {...layout} dataSource={listDonate} columns={columns} />;
       </div>
      

       </>
    );
}

export default Listpost;
