import { Button, Table, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import HistoryDonate from "../components/Historydonate"
import donateEvensts from '../Api/donateEvensts';
import ProFile from '../components/EditProfile';
import ProfileUser from '../components/ProfileUser';
import {EditOutlined,ProfileOutlined,HistoryOutlined} from '@ant-design/icons';
import "../style/bootstrap-grid.min.css";
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const { TabPane } = Tabs;
const Profile = () => {
    const islogin = JSON.parse(localStorage.getItem("user"))

    const [AllDonate, setAllDonate] = useState([]);
    const [/* listDonates */, setListdonates] = useState([]);
    const [History, setHistory] = useState([]);
    //const [state, setstate] = useState([]);
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
            dataIndex: 'title',
            key: 'title',
        },

        {
            title: 'Số tiền đã ủng hộ(VNĐ)',
            dataIndex: 'amountToDonate',
            key: 'amountToDonate',
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
        a.push(element.donateEvent)
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
                if (e[i]._id === AllDonate[j].donateEvent) {
                    e[i].amountToDonate = AllDonate[j].amountToDonate;
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
                <div className="profile_user">
                    <h3 className="profile_user_title">
                        Thông tin tài khoản
                    </h3>
                    <Tabs tabPosition="left" defaultActiveKey="1"  >
                        <TabPane tab={ <span><ProfileOutlined />Thông tin cá nhân</span>} key="1">
                            <ProfileUser></ProfileUser>
                        </TabPane>
                        <TabPane tab={ <span><EditOutlined />Chinh sửa thông tin</span>} key="2">
                            <ProFile></ProFile>
                        </TabPane>

                        <TabPane  tab={ <span><HistoryOutlined />Lịch sử ủng hộ</span>} key="3">
                            <div className="tbl_history" style={{ textAlign: "center" }}>

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
