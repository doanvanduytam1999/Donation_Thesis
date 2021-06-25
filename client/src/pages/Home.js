import React, { useEffect, useState } from 'react';
import { Card, Progress, Typography, Modal, Form, Input, Button, Radio, Tabs, Steps, message, Checkbox, Select, Result, Badge, InputNumber } from 'antd';
import { CheckOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import donateEvensts from '../Api/donateEvensts';
import { Link } from "react-router-dom";
import "../style/Home.scss";
import "../style/bootstrap-grid.min.css";
import PayPal from "../components/Paypal"
import HotListDonate from "../components/HotListDonate"
import ListDonate from '../components/ListDonate';
import ScrollToTop from "react-scroll-to-top";

const { TabPane } = Tabs;
const Home = () => {
    const [listDonates, setListdonates] = useState([]);
    const [listDonate, setListdonate] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    useEffect(() => {

        const fetchdonatesData = async () => {
            try {
                await donateEvensts.getAll().then((res) => {
                    setListdonates(res.data.DonateEnvents);
                    setListdonate(res.data.DonateEnvents)
                });
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
                listDonates => listDonates.loaiBaiDang === e
            )
            setListdonate(filterProduct)
            console.log(filterProduct);


        }
    };
    for (let i = 0; i < listDonate.length; i++) {
        for (let j = 0; j < listCategory.length; j++) {
            if (listDonate[i].loaiBaiDang === listCategory[j]._id) {
                //console.log(listCategory[j].tenloai);
                listDonate[i].tenLoai = listCategory[j].tenloai;
                //console.log(listDonate);
            }

        }
    }
    const [form] = Form.useForm();
    const iconStyle = {
        color: "#2569d9"
    }
    const researchStyle = {
        backgroundImage: `url("../images/about.png")`,
    }
    const bghomepageRegister = {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url("../images/donate/bg-rs.jpg")`,

    }
    return (
        <>
          <ScrollToTop smooth />
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
                            <a type="button" className="ant-btn ant-btn-primary btn-explore" href="/explore"><span className="btn-text">Explore Charities</span></a>
                        </div>
                        <div className="button_wapper ">
                            <a type="button" className="ant-btn ant-btn-default btn-sign-in" href="/explore"><span className="btn-text">Explore Charities</span></a>
                        </div>

                    </div>
                    <div className="text_wapper">
                        <p className="text-bold ">Chúng tôi đã quyên góp được</p>
                        <h2 className="text-bold"><span>$32,274,417.14</span></h2>
                        <div className="icon-micro-heart"><img width="50px" alt="Heart" src="../images/hands.svg" /></div>
                        <div className="mb-1x"><span className="text-medium"><div className="html-sanitizer">Hãy giúp chúng thôi một tay</div></span></div>
                        <div className="text_wapper-about"><a href="/about-us"><span className="text-bold text-uppercase">Tìm hiểu về chúng tôi</span></a></div>
                    </div>
                </div>
            </div>
            <div style={researchStyle} className="bg homepage_research">
                <div className="container">
                    <div className="research_text col-10 offset-1 ">
                        <h2 className="text-bold">Hãy chung tay quyên góp</h2>
                        <p>YÊU THƯƠNG LAN TỎA TỪ NHỮNG CHUYẾN HÀNG CHÌNH TỪ THIỆN</p>
                        <div className="button_wapper ">
                            <a type="button" className="ant-btn ant-btn-primary btn-find-out-how" href="/explore"><span className="btn-text">Tìm hiểu cách tham gia</span></a>
                        </div>
                    </div>
                </div>

            </div>
            <div className="homepage_list_donate list_donate_hot">
                <div className="container">
                    <div className="list_donate_text  col-10 offset-1 ">
                        <h2 className="text-bold">Nổi bật </h2>
                    </div>
                    <div className="list_card col-10 offset-1">
                        <div className="row">
                            {<HotListDonate listDonates={listDonates}/>}
                        </div>
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
                            <TabPane tab="Mới nhất" key="2">
                            </TabPane>
                            <TabPane tab="Sắp hết hạn" key="3">
                            </TabPane>
                            {listCategory.map((category) => {
                                return (
                                    <>
                                        <TabPane tab={category.tenloai} key={category._id}>

                                        </TabPane>
                                    </>
                                )
                            })}

                        </Tabs>
                        <div className="row" >
                            {<ListDonate listDonate={listDonate} />}                         
                        </div>
                    </div>
                </div>
            </div>
            <div className="homepage_app">
                <div className="container">
                    <div className="app_text col-10 offset-1 ">
                        <h2 className="text-bold">Tải ứng dụng trên điện thoại</h2>
                        <p>Tải ứng dụng miễn phí về điện thoại của bạn và bắt đầu ủng hộ cùng chúng tôi</p>
                        <div className="img_dowload">
                            <img src="../images/download-ios.png" alt="download-ios"></img>
                            <img src="../images/download-adr.png" alt="download-adr"></img>
                        </div>
                    </div>
                </div>

            </div>
            <div style={bghomepageRegister} className="homepage_register">
                <div className="container">
                    <div className="register_text col-10 offset-1 ">
                        <h2 className="text-bold text-wh ">Hãy tham gia cùng với chúng tôi</h2>
                        <p className="text-bold text-wh ">Cùng nhau chia sẽ và giúp đỡ những hoàn cảnh khó khăn</p>
                        <div className="form_rs">
                            <Form form={form}
                                name="horizontal_login"
                                layout="inline"
                        /* onFinish={onFinish} */>
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input style={{ width: '255px', height: '40px' }} placeholder="Nhâp tên của bạn..." />
                                </Form.Item>
                                <Form.Item
                                    name="email"

                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ]}
                                >
                                    <Input style={{ width: '255px', height: '40px' }} placeholder="Nhập gmail" />
                                </Form.Item>
                                <Form.Item
                                    name="gmail"
                                    rules={[{ required: true, message: 'Hãy nhập gmail' }]}
                                >
                                    <Input
                                        style={{ width: '255px', height: '40px' }}
                                        type="phone"
                                        placeholder="Nhập số điện thoại của bạn"
                                    />
                                </Form.Item>

                            </Form>
                            <div className="btn_frm_rs">
                                <Button style={{ width: "500px", height: "45px", fontSize: "20px", fontWeight: "700" }}> Tham gia ngay</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homepage_partner">
                <div className="container">
                    <div className="partner_text col-10 offset-1 ">
                        <h2 style={{ textAlign: "center" }} className="text-bold">Các đối tác phi lợi nhuận</h2>
                        <div className="wapper_menu">
                            <div className="row">
                                <div className="col-4">
                                    <div className="menu_item">
                                        <div className="img">
                                            <img className="logo_partner" alt="operation" src="../images/donate/home/operation.jpg"></img>
                                        </div>
                                        <div className="menu_item-text">
                                            <p className="text-bold">Operation Smile</p>
                                            <p>Phẫu thuật nụ cười</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="menu_item">
                                        <div className="img">
                                            <img className="logo_partner" alt="operation" src="../images/donate/home/matran.jpg"></img>
                                        </div>
                                        <div className="menu_item-text">
                                            <p className="text-bold">Mặt trận Tổ quốc Việt Nam</p>
                                            <p>Uỷ ban Trung ương Mặt trận Tổ quốc Việt Nam</p>
                                        </div>

                                    </div>

                                </div>
                                <div className="col-4">
                                    <div className="menu_item">
                                        <div className="img">
                                            <img className="logo_partner" alt="suc-manh" src="../images/donate/home/suc-manh.jpg"></img>
                                        </div>
                                        <div className="menu_item-text">
                                            <p className="text-bold">Sức mạnh 2000</p>
                                            <p>Tiền lẻ mỗi ngày Xây ngay nghìn trường mới</p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div style={{ marginTop: "50px" }} className="row">
                                <div className="col-4">
                                    <div className="menu_item">
                                        <div className="img">
                                            <img className="logo_partner" alt="Vinacapital" src="../images/donate/home/vina.jpg"></img>
                                        </div>
                                        <div className="menu_item-text">
                                            <p className="text-bold">Vinacapital Foundation</p>
                                            <p>Thay đổi cuộc sống cho phụ nữ và trẻ em Việt Nam</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="menu_item">
                                        <div className="img">
                                            <img className="logo_partner" alt="vc" src="../images/donate/home/vc.jpg"></img>
                                        </div>
                                        <div className="menu_item-text">
                                            <p className="text-bold">Trung tâm Tình nguyện Quốc gia</p>
                                            <p>Thúc đẩy đam mê tình nguyện</p>
                                        </div>

                                    </div>

                                </div>
                                <div className="col-4">
                                    <div className="menu_item">
                                        <div className="img">
                                            <img className="logo_partner" alt="tuoi-tre" src="../images/donate/home/tuoi-tre.jpg"></img>
                                        </div>
                                        <div className="menu_item-text">
                                            <p className="text-bold">Báo Tuổi Trẻ</p>
                                            <p>Cơ quan ngôn luận của Đoàn Thanh niên Cộng sản Thành phố Hồ Chí Minh</p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;
