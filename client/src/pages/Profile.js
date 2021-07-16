import React, { useState, useEffect } from 'react';
import { Tabs, Table, message, Button } from 'antd';
import "../style/bootstrap-grid.min.css";
import ProFile from '../components/Profilecpn';
import HistoryDonate from "../components/Historydonate"
import donateEvensts from '../Api/donateEvensts';
import { Link, Redirect } from 'react-router-dom'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const { TabPane } = Tabs;
const Profile = () => {
    const islogin = JSON.parse(localStorage.getItem("user"))

    const [AllDonate, setAllDonate] = useState([]);
    const [listDonates, setListdonates] = useState([]);
    const [History, setHistory] = useState([]);
    const [state, setstate] = useState([]);
    const DonateHistory = []
    useEffect(() => {
        const fetchdonatesData = async () => {
            try {
                await donateEvensts.getAll().then((res) => {
                    setListdonates(res.data.DonateEnvents);
                    setHistory(res.data.DonateEnvents);

                });
            } catch (error) {
                console.log("Failed to fetch brand data at: ", error);
            }
        };
        const fetchgetListdonateUser = async () => {
            await donateEvensts.getListdonateUser().then((res) => {
                setAllDonate(res.data.AllDonate);
            })
        }
        fetchgetListdonateUser();
        fetchdonatesData();
    }, []);
    const convertNumber = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
    const columns = [
        {
            title: 'Tiêu đề bài viết',
            dataIndex: 'tieuDe',
            key: 'tieude',
        },
        
        {
            title: 'Số tiền đã ủng hộ(VNĐ)',
            dataIndex: 'sotiendonate',
            key: 'sotiendonate',
            render: text => (
                <>{
                    convertNumber(text)
                }
                </>
            ),
        },
        {
            title: 'Xem bài viết',
            dataIndex: '_id',
            key: '_id',
            render: text => (
                <>
                  <Link to={`/thong-tin-chi-tiet/${text}`}><Button>Xem chi tiết</Button> </Link>
                </>
              ),
        }
    ];
    const a = [];
    console.log(AllDonate);

    AllDonate.forEach(element => {
        a.push(element.chuongTrinhQuyenGop)
    });

    for (let i = 0; i < a.length; i++) {

        let filterProduct = [];
        filterProduct = History.filter(
            History => History._id === a[i]
        )

        DonateHistory.push(filterProduct)

    }
    DonateHistory.forEach((e) => {
        for (let i = 0; i < e.length; i++) {
            for (let j = 0; j < AllDonate.length; j++) {
                if (e[i]._id === AllDonate[j].chuongTrinhQuyenGop) {
                    e[i].sotiendonate = AllDonate[j].soTienDonate;
                    console.log(e);
                }
            }
        }
        //console.log(e[0].tieuDe);
    })
    const merge3 = DonateHistory.flat(1);

    if (!islogin) {

        return <Redirect to='/' />;

    }
    return (
        <>

            <div className="container">
                <div className='col-6 offset-6'>
                    <h3 style={{ fontSize: "30px" }}>Thông tin tài khoản</h3>
                </div>
                <div>
                    <Tabs defaultActiveKey="1"  >
                        <TabPane tab="Thông tin cá nhân" key="1">

                            <ProFile></ProFile>
                        </TabPane>

                        <TabPane tab="Lịch sử ủng hộ" key="2">
                            <div style={{ textAlign: "center" }}>

                                <Table {...layout}
                                    dataSource={
                                        merge3

                                    }

                                    columns={columns} />;
                            </div>
                        </TabPane>

                    </Tabs>
                </div>

            </div>


        </>
    );
}

export default Profile;
