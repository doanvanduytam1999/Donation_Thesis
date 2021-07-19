import React,{useEffect,useState} from 'react';
//import { useDispatch,useSelector } from "react-redux";
import { Card, Table, Tooltip, Button  } from 'antd';
import { Redirect,Link } from 'react-router-dom';
import "./Dashboard.scss"
import "../../styles/bootstrap-grid.min.css";
import donateEvensts from '../../Api/donateEvensts';
const Dashboard = () => {
    const [listDonate, setListDonate] = useState([]);
    
    const convertNumber = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
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
    const columns = [
        {
          title: 'Số đợt quyên góp thành công',
          dataIndex: 'name',
          key: 'name',
         
        },
        {
          title: ' Số đợt đang quyên góp',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Tổng số tiền quyên góp',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '   Đợt quyên góp không thành công.',
          key: 'tags',
          dataIndex: 'tags',
          
        },
        {
          title: ' Tài khoản Admin',
          key: 'action',
          
        },
        {
            title: ' Tài khoản cộng tác viên',
            key: 'action',
            
          },
          {
            title: ' Tài khoản nhà hảo tâm',
            key: 'action',
            
          },
      ];
      const columns1 = [
        {
          title: 'Tiêu đề bài viết',
          dataIndex: 'tieuDe',
          key: 'tieude',
          ellipsis: {
            showTitle: false,
          },
          render: tieuDe => (
            <Tooltip placement="topLeft" title={tieuDe}>
              {tieuDe}
            </Tooltip>
          ),
        },
      
        {
            title: 'Số tiền cần ủng hộ(VNĐ)',
            dataIndex: 'soTienCanDonate',
            key: 'soTienCanDonate',
            render: text => (
              <>{
                convertNumber(text)
              }
                
              </>
            ),
          },
          {
            title: 'Số tiền đã quyên góp được(VNĐ)',
            dataIndex: 'soTienDonateHieTai',
            key: 'soTienDonateHieTai',
            render: text => (
              <>{
                convertNumber(text)
              }
                
              </>
            ),
          },
          {
            title: 'Trạng thai',
            dataIndex: 'trangThai',
            key: 'trangThai',
          }
      ];
    const islogin = JSON.parse(localStorage.getItem("user"))

    return (

        <>{islogin ? <Redirect to="/admin/dashboard" /> : <Redirect to="/" />}
            <div className="wapper_dashboard row">
                <div className="col-10 offset-1">
                    <h2 className="title_dashboard">Thống kê</h2>
                    {/* <div className="">
                        <div className="row">
                            <div className="col">
                                <div className="card --green">
                                    <div className="card__header">
                                        <div className="card__title">
                                            Số chương trình quyên góp thành công
                                        </div>
                                    </div>
                                    <div className="card__body">
                                        <div className="card__content">
                                            2
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col ">
                                <div className="card --yellow">
                                    <div className="card__header">
                                        <div className="card__title">
                                            Số chương trình đang quyên góp
                                        </div>
                                        <div className="card__body">
                                            <div className="card__content">
                                                2
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col ">
                                <div className="card --blue">
                                    <div className="card__header">
                                        <div className="card__title">
                                            Tổng số tiền quyên góp được
                                        </div>
                                    </div>
                                    <div className="card__body">
                                        <div className="card__content">
                                            2
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="card --red">
                                    <div className="card__header">
                                        <div className="card__title">
                                            Đợt quyên góp không thành công.
                                        </div>
                                    </div>
                                    <div className="card__body">
                                        <div className="card__content">
                                            2
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card -blue">
                                    <div className="card__header">
                                        <div className="card__title">
                                            Tổng số chương trình quyên góp
                                        </div>
                                    </div>
                                    <div className="card__body">
                                        <div className="card__content">
                                            2
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card --blue">
                                    <div className="card__header">
                                        <div className="card__title">
                                            Tổng lượt quyên góp
                                        </div>
                                    </div>
                                    <div className="card__body">
                                        <div className="card__content">
                                            2
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="card --green">
                                    <div className="card__header">
                                        <div className="card__title">
                                            Tài khoản Admin
                                        </div>
                                    </div>
                                    <div className="card__body">
                                        <div className="card__content">
                                            2
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card --green">
                                    <div className="card__header">
                                        <div className="card__title">
                                            Số cộng tác viên
                                        </div>
                                    </div>
                                    <div className="card__body">
                                        <div className="card__content">
                                            2
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card --green">
                                    <div className="card__header">
                                        <div className="card__title">
                                            Tài khoản nhà hảo tâm
                                        </div>
                                    </div>
                                    <div className="card__body">
                                        <div className="card__content">
                                            2
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <Table columns={columns} /* dataSource={data} */ />

                    <h2 className="title_dashboard">Danh sách các đợt đang quyên góp.</h2>
                    <Table dataSource={listDonate} columns={columns1} />
                </div>
            </div>

        </>
    );
}

export default Dashboard;
