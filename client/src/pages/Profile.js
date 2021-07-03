import React from 'react';
import { Tabs } from 'antd';
import "../style/bootstrap-grid.min.css";
import ProFile from '../components/Profilecpn';
import HistoryDonate from "../components/Historydonate"
const { TabPane } = Tabs;
const Profile = () => {
    return (
        <>
            
                    <div className="container">
                        <div className='col-6 offset-6'>
                            <h3 style={{fontSize:"30px"}}>Thông tin tài khoản</h3>
                        </div>
                        <div>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Thông tin cá nhân" key="1">

                                    <ProFile></ProFile>
                                </TabPane>
                                <TabPane tab="Lịch sử ủng hộ" key="2">
                                    <HistoryDonate></HistoryDonate>
                                </TabPane>
                              
                            </Tabs>
                        </div>

                    </div>

              
        </>
    );
}

export default Profile;
