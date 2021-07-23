import React, { useEffect, useState } from 'react';
import donateEvensts from '../../Api/donateEvensts';
import { Spin, Table, Tooltip } from 'antd';
import { Redirect, Link } from "react-router-dom";
import { Input, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import "./Listpost.scss"
const { Search } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const Listpost = () => {
  const [listPost, setListPost] = useState([]);
  const islogin = JSON.parse(localStorage.getItem("user"))
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false)
  islogin ? <Redirect to="/admin/danh-sach-bai-viet" /> : <Redirect to="/" />
  const btnEdit = (e) => {
    let id = e.currentTarget.dataset.id
    console.log(id);

  }
  const onSearch = (value) => {
    setSearchTerm(value.target.value);
    console.log(value.target.value);
  }
  useEffect(() => {
    const fetchdonatesData = async () => {
      try {
        await donateEvensts.getAll().then((res) => {
          if (res.data.status == "success") {
            setListPost(res.data.AllPost);
          }
          else {
            console.log("Loi lay du lieu");
          }
        });
        setLoading(true)
      } catch (error) {
        console.log("Failed to fetch brand data at: ", error);
      }
    };
    fetchdonatesData();
  }, []);
  const convertNumber = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const columns = [
    {
      title: 'Tiêu đề bài viết',
      dataIndex: 'title',
      key: 'title',
      ellipsis: {
        showTitle: false,
      },
      render: title => (
        <Tooltip placement="topLeft" title={title}>
          {title}
        </Tooltip>
      ),
    },
    /*  {
       title: 'Ngày bắt đầu',
       dataIndex: 'ngayBatDau',
       key: 'ngayBatSau',
     },
     {
       title: 'Ngày kết thúc',
       dataIndex: 'ngayKetThuc',
       key: 'ngayKetThuc',
     }, */
    {
      title: 'Số tiền cần ủng hộ(VNĐ)',
      dataIndex: 'setAmount',
      key: 'setAmount',
      render: text => (
        <>{
          convertNumber(text)
        }

        </>
      ),
    },
    {
      title: 'Số tiền đã quyên góp được(VNĐ)',
      dataIndex: 'currentAmount',
      key: 'currentAmount',
      render: text => (
        <>{
          convertNumber(text)
        }

        </>
      ),
    },
    {
      title: 'Trạng thai',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Hành động',
      dataIndex: '_id',
      key: '_id',
      render: text => (
        <>
          <Link to={`/admin/chinh-sua-bai-viet/${text}`}><Button><EditOutlined /></Button> </Link>
        </>
      ),
    },
  ];
  const results = !searchTerm
    ? listPost
    : listPost.filter(list =>
      list.tieuDe.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  return (
    <>
      {islogin ? <Redirect to="/admin/danh-sach-bai-viet" /> : <Redirect to="/" />}
      <div className="wapper_table_post row">
        <div className="col-10 offset-1">
        
          <h2 className="title_post">Danh sách bài viết</h2>
          <Search className="input-search" type="text"
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={onSearch} style={{ width: 800 }}
          />
          {loading ?  <Table {...layout} dataSource={results} columns={columns} /> : <> <br></br><Spin size="large"/></>}
         
         
         

        </div>

      </div>

    </>
  );
}

export default Listpost;
