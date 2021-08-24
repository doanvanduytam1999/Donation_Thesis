import React, { useEffect, useState } from 'react';
//import { useDispatch,useSelector } from "react-redux";
import { Card, Table, Tooltip, Button } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import "./Dashboard.scss"
import "../../styles/bootstrap-grid.min.css";
import donateEvensts from '../../Api/donateEvensts';
const Dashboard = () => {
    const [load, setLoad] = useState(true);
    const [dashboard, setDashboard] = useState([]);
    let sumAmount = 0;
    //const isLoggedIn = JSON.parse(localStorage.getItem("user"))
   

    useEffect(() => {
        const fetchDashboard = () => {
            try {
                donateEvensts.getDashboard().then((res) => {
                    //setDashboard(res.data);
                    console.log(res.data);
                    res.data.allDonate.forEach(element => {
                        sumAmount = sumAmount + Number(element.currentAmount);
                    });
                    res.data["sumAmount"] = sumAmount;
                    //delete res.data.allDonate;
                    setDashboard(res.data);
                    setLoad(false)
                });
              
            } catch (error) {
                console.log("Failed to fetch brand data at: ", error);
            }
        };
        fetchDashboard();

    }, []);
    const resul = [dashboard]
    const columns = [
        {
            title: 'Số đợt quyên góp thành công',
            dataIndex: 'countEventSuccess',
            key: 'countEventSuccess',
            align: 'center',

        },
        {
            title: ' Số đợt đang quyên góp',
            dataIndex: 'countEventNotEnough',
            key: 'countEventNotEnough',
            align: 'center',
        },
        {
            title: 'Tổng số tiền quyên góp (VNĐ)',
            dataIndex: 'sumAmount',
            key: 'sumAmount',
            align: 'center',
            render: text => (
                <>{
                    convertNumber(text)
                }

                </>
            ),
        },
        {
            title: ' Đợt quyên góp không thành công.',
            key: 'countEventExperigs',
            dataIndex: 'countEventExperi',
            align: 'center',
        },
        {
            title: ' Tài khoản Manager',
            key: 'countManager',
            dataIndex: 'countManager',
            align: 'center',
        },
        {
            title: ' Tài khoản cộng tác viên',
            key: 'countCTV',
            dataIndex: 'countCTV',
            align: 'center',
        },
        {
            title: ' Tài khoản nhà hảo tâm',
            key: 'countDonator',
            dataIndex: 'countDonator',
            align: 'center',

        },
    ];
    const columns1 = [
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
        }
    ];
    const convertNumber = (x) => {
        if (dashboard.sumAmount === '') {
            if (dashboard.sumAmount) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        }
        else {
            if (dashboard.sumAmount) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        }

    }
    const islogin = JSON.parse(localStorage.getItem("user"))

    return (

        <>{islogin ? <Redirect to="/admin/dashboard" /> : <Redirect to="/" />}
            <div className="wapper_dashboard row">
                <div className="col-10 offset-1">
                    <h2 className="title_dashboard">Thống kê</h2>

                    <Table pagination={false} loading={load}  columns={columns} dataSource={resul} />

                    <h2 className="title_dashboard">Danh sách các đợt đang quyên góp.</h2>
                    <Table  loading={load}  dataSource={dashboard.allDonate} columns={columns1} />
                </div>
            </div>

        </>
    );
}

export default Dashboard;
