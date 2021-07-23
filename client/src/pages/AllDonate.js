import React, { useEffect, useState } from 'react';
import {  Spin, Tabs } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import donateEvensts from '../Api/donateEvensts';
//import { Link } from "react-router-dom";
import "../style/Home.scss";
import "../style/bootstrap-grid.min.css";
//import PayPal from "../components/Paypal"
//import HotListDonate from "../components/HotListDonate"
import ListAll from '../components/ListALl';
import ScrollToTop from "react-scroll-to-top";
//import { useSelector } from 'react-redux';
//import { Redirect } from 'react-router-dom';
import ScrollToTopApi from '../Api/ScrollToTop';
const { TabPane } = Tabs;
const AllDonate = () => {
    const [listDonates, setListdonates] = useState([]);
    const [listDonate, setListdonate] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [loadingSum, setLoadingSum] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchdonatesData = async () => {
            try {
                await donateEvensts.getAll().then((res) => {
                    
                    setListdonates(res.data.DonateEnvents);
                    setListdonate(res.data.DonateEnvents)
                });
                setLoadingSum(true)
            } catch (error) {
                console.log("Failed to fetch brand data at: ", error);
            }
        };

        const fetchCategory = async () => {
            try {
                await donateEvensts.getCategory().then((res) => {
                    setListCategory(res.data.CategoryDonateEvents)
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategory();
        fetchdonatesData();

    }, []);
    const handleClick = (e) => {
        setListdonate(listDonates);
        let filterProduct = [];
        if (e === "1") {
            filterProduct = listDonates;
        } else {

            filterProduct = listDonates.filter(
                listDonates => listDonates.categoryPost === e
            )
            setListdonate(filterProduct)
            console.log(filterProduct);


        }
    };
    for (let i = 0; i < listDonate.length; i++) {
        for (let j = 0; j < listCategory.length; j++) {
            if (listDonate[i].categoryPost === listCategory[j]._id) {
                listDonate[i].categoryName = listCategory[j].CategoryName;
            }

        }
    }
    const sumConinDonate = ()=>{
        let sum = 0
        for (let i = 0; i < listDonates.length; i++) {
             sum =sum+  Number(listDonates[i].currentAmount);
            
        }
        return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    const iconStyle = {
        color: "#2569d9"
    }
    return (
        <>
            <ScrollToTop smooth={true} />
          
            <div className="homepage container-sm">
                <div className="homepage_content col-10 offset-1 ">
                    <div>
                        <h2 className="title" >Hãy quyên góp cho những hoạt động mà bạn quan tâm</h2>
                    </div>
                    <div className="commitment">
                        <div className="commitment__tick"><p><CheckOutlined style={iconStyle} />0% phí dịch vụ</p></div>
                        <div className="commitment__tick"><p><CheckOutlined style={iconStyle} />Thiết kế cho mục đích từ thiệt</p></div>
                        <div className="commitment__tick"><p><CheckOutlined style={iconStyle} />Được nhiều tổ chức từ thiện tin tưởng</p></div>
                    </div>
                    <div className="button">
                        <div className="button_wapper ">
                            <a type="button" className="ant-btn ant-btn-primary btn-explore" href="/explore"><span className="btn-text">Tìm hiểu về tổ chức từ thiện</span></a>
                        </div>
                    </div>
                    <div className="text_wapper">
                        <p className="text-bold ">Chúng tôi đã quyên góp được</p>
                        <h2 className="text-bold"><span>{sumConinDonate()} VNĐ</span></h2>
                        <div className="icon-micro-heart"><img width="50px" alt="Heart" src="../images/hands.svg" /></div>
                        <div className="mb-1x"><span className="text-medium"><div className="html-sanitizer">Hãy giúp chúng thôi một tay</div></span></div>
                        <div className="text_wapper-about"><a href="/about-us"><span className="text-bold text-uppercase">Tìm hiểu về chúng tôi</span></a></div>
                    </div>
                </div>
            </div>
            <div className="homepage_list">
                <div className="container">
                    <div className="list_donate_text col-10 offset-1 ">
                        <h2 style={{ textAlign: "center" }} className="text-bold">Các chương trình quyên góp</h2>
                        <Tabs defaultActiveKey="1" size="large" centered onChange={handleClick} style={{ marginBottom: 32, }}>
                            <TabPane tab="Tất cả" key="1">
                            </TabPane>
                            {/*  <TabPane tab="Mới nhất" key="2">
                            </TabPane>
                            <TabPane tab="Sắp hết hạn" key="3">
                            </TabPane> */}
                            {listCategory.map((category) => {
                                return (
                                    <>
                                        <TabPane tab={category.CategoryName} key={category._id}>

                                        </TabPane>
                                    </>
                                )
                            })}
                        </Tabs>
                        <div className="row all-donate" >
                           
                            {loadingSum ? <ListAll listDonate={listDonate} /> : <Spin size="large" />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllDonate;
