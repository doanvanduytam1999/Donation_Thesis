import React, { useState, useEffect } from 'react';
import { Tabs,Table, message } from 'antd';
import "../style/bootstrap-grid.min.css";
import ProFile from '../components/Profilecpn';
import HistoryDonate from "../components/Historydonate"
import donateEvensts from '../Api/donateEvensts';
import  { Redirect } from 'react-router-dom'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
const { TabPane } = Tabs;
const Profile = () => {
    const islogin= JSON.parse(localStorage.getItem("user"))
    
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
    const columns = [
        {
            title: 'Tiêu đề bài viết',
            dataIndex: 'tieuDe',
            key: 'tieude',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'ngayBatDau',
            key: 'ngayBatDau',
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'ngayKetThuc',
            key: 'ngayKetThuc',
        },
        {
            title: 'Số tiền đã ủng hộ(VNĐ)',
            dataIndex: 'sotiendonate',
            key: 'sotiendonate',
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
    const a = [];
    console.log(AllDonate);
    
    AllDonate.forEach(element => {
        a.push(element.chuongTrinhQuyenGop)
    });
    console.log(islogin);
    for (let i = 0; i < a.length; i++) {
        //for (let j = 0; j < AllDonate.length; j++) {
            //if (a[i] === AllDonate[j].chuongTrinhQuyenGop) {
                let filterProduct = [];
                filterProduct = History.filter(
                    History => History._id === a[i]
                )
                //filterProduct.sotiendonate = AllDonate[j].soTienDonate
                DonateHistory.push(filterProduct)
            //}
        //}
    }
    DonateHistory.forEach((e)=>{
        for (let i = 0; i < e.length; i++) {
            for (let j = 0; j < AllDonate.length; j++) {
                 if (e[i]._id === AllDonate[j].chuongTrinhQuyenGop) {
                 e[i].sotiendonate=AllDonate[j].soTienDonate ;
            console.log(e);
            }
        }
        }
        //console.log(e[0].tieuDe);
    })
    const merge3 = DonateHistory.flat(1);   
    console.log(merge3);
    if(!islogin){
        
        return <Redirect to='/'/>;
       
    }
    
    console.log(DonateHistory);
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
