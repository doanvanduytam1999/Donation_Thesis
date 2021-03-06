import React, { useEffect, useState } from 'react';
import { /* Form, Input, */ Button, Tabs, Spin } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import donateEvensts from '../Api/donateEvensts';
//import { Link } from "react-router-dom";
import "../style/Home.scss";
import "../style/bootstrap-grid.min.css";
//import PayPal from "../components/Paypal"
import HotListDonate from "../components/HotListDonate"
import ListDonate from '../components/ListDonate';
import ScrollToTop from "react-scroll-to-top";
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

//import { useCookies } from 'react-cookie';

const { TabPane } = Tabs;
const Home = () => {
    const [listDonates, setListdonates] = useState([]);
    const [listDonate, setListdonate] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const { isLoggedIn } = useSelector(state => state.login);
    const [loadingSum, setLoadingSum] = useState(false);
    //const [Count, /* setCount */] = useState(0);
    //const  data  = useSelector(state => state.auth.user);
    //const order= JSON.parse(localStorage.getItem("orderStatus"))
    //console.log(data);
    //window.scrollTo({ behavior: 'smooth' });

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
    console.log(listDonate);
    console.log(listDonates);
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
                //console.log(listCategory[j].tenloai);
                listDonate[i].categoryName = listCategory[j].CategoryName;
                //console.log(listDonate);
            }

        }
    }
    //const [form] = Form.useForm();
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
    const sumConinDonate = () => {
        let sum = 0
        for (let i = 0; i < listDonate.length; i++) {
            sum = sum + Number(listDonate[i].currentAmount);

        }

        return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    //console.log(listDonate);
    if (isLoggedIn) {
        <Redirect to="/" />

    }
    return (
        <>
            <ScrollToTop smooth={true} />
            <div className="homepage container-sm">
                <div className="homepage_content col-10 offset-1 ">
                    <div>
                        <h2 className="title" >H??y quy??n g??p cho nh???ng ho???t ?????ng m?? b???n quan t??m</h2>
                    </div>
                    <div className="commitment">
                        <div className="commitment__tick"><p><CheckOutlined style={iconStyle} />0% ph?? d???ch v???</p></div>
                        <div className="commitment__tick"><p><CheckOutlined style={iconStyle} />Thi???t k??? cho m???c ????ch t??? thi???t</p></div>
                        <div className="commitment__tick"><p><CheckOutlined style={iconStyle} />???????c nhi???u t??? ch???c t??? thi???n tin t?????ng</p></div>
                    </div>
                    <div className="button">
                        <div className="button_wapper ">
                      
                           <Link to="gioi-thieu" className="ant-btn ant-btn-primary btn-explore" > <span className="btn-text"> T??m hi???u v??? t??? ch???c t??? thi???n</span></Link>
                        </div>
                        {/*  <div className="button_wapper ">
                            <a type="button" className="ant-btn ant-btn-default btn-sign-in" href="/explore"><span className="btn-text">Explore Charities</span></a>
                        </div> */}

                    </div>
                    <div className="text_wapper">
                        <p className="text-bold ">Ch??ng t??i ???? quy??n g??p ???????c</p>
                        <h2 className="text-bold"><span>
                            {sumConinDonate()} VN??


                        </span></h2>
                        <div className="icon-micro-heart"><img width="50px" alt="Heart" src="../images/hands.svg" /></div>
                        <div className="mb-1x"><span className="text-medium"><div className="html-sanitizer">H??y gi??p ch??ng th??i m???t tay</div></span></div>

                    </div>
                </div>
            </div>
            <div style={researchStyle} className="bg homepage_research">
                <div className="container">
                    <div className="research_text col-10 offset-1 ">
                        <h2 className="text-bold">H??y chung tay quy??n g??p</h2>
                        <p>Y??U TH????NG LAN T???A T??? NH???NG CHUY???N H??NG CH??NH T??? THI???N</p>
                        {/* <div className="button_wapper ">
                            <a type="button" className="ant-btn ant-btn-primary btn-find-out-how" href="/explore"><span className="btn-text">T??m hi???u c??ch tham gia</span></a>
                        </div> */}
                    </div>
                </div>

            </div>
            <div className="homepage_list_donate list_donate_hot">
                <div className="container">
                    <div className="list_donate_text  col-10 offset-1 ">
                        <h2 style={{ textAlign: "center" }} className="text-bold">N???i b???t </h2>
                    </div>
                    <div className="list_card col-10 offset-1">
                        <div className="row">
                            {loadingSum ? <HotListDonate listDonates={listDonates} /> : <Spin size="large" />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="homepage_list">
                <div className="container">
                    <div className="list_donate_text col-10 offset-1 ">
                        <h2 style={{ textAlign: "center" }} className="text-bold">C??c ch????ng tr??nh quy??n g??p</h2>
                        <Tabs defaultActiveKey="1" size="large" centered onChange={handleClick} style={{ marginBottom: 32, }}>
                            <TabPane tab="T???t c???" key="1">
                            </TabPane>
                            {/*  <TabPane tab="M???i nh???t" key="2">
                            </TabPane>
                            <TabPane tab="S???p h???t h???n" key="3">
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
                        <div className="row all-donate1" >

                            {loadingSum ? <ListDonate listDonate={listDonate} /> : <Spin size="large" />}

                        </div>
                        <Link className="ant-btn ant-btn-primary bnt-load-more" to="/tat-ca-chuong-trinh" >Xem t???t c??? </Link>
                    </div>
                </div>
            </div>

            <div style={bghomepageRegister} id="register" className="homepage_register">
                <div className="container">
                    <div className="register_text col-10 offset-1 ">
                        <h2 className="text-bold text-wh ">H??y tham gia c??ng v???i ch??ng t??i</h2>
                        <div style={{display:"flex", width:"900px",justifyContent:"space-between"}}>
                            <div className="btn_frm_rs">
                                <p className="text-bold text-wh ">C??ng nhau chia s??? v?? gi??p ????? nh???ng ho??n c???nh kh?? kh??n</p>
                                <Button className="btn-tham-gia" ><Link to="/tham-gia"> Tham gia ngay</Link></Button>

                            </div>
                            <div className="btn_frm_rs ">
                                <p className="text-bold text-wh ">H??y  cho ch??ng t??i nh???ng ho??n c???nh c???n gi??p ????? m?? b???n bi???t</p>
                                <Button  className="btn-hckk"><Link to="/hoan-canh-kho-khan">Chia s??? Ho??n c???nh c???n gi??p ?????</Link></Button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div className="homepage_partner">
                <div className="container">
                    <div className="partner_text col-10 offset-1 ">
                        <h2 style={{ textAlign: "center" }} className="text-bold">C??c ?????i t??c phi l???i nhu???n</h2>
                        <div className="wapper_menu">
                            <div className="row">
                                <div className="col-4">
                                    <div className="menu_item">
                                        <div className="img">
                                            <img className="logo_partner" alt="operation" src="../images/donate/home/operation.jpg"></img>
                                        </div>
                                        <div className="menu_item-text">
                                            <p className="text-bold">Operation Smile</p>
                                            <p>Ph???u thu???t n??? c?????i</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="menu_item">
                                        <div className="img">
                                            <img className="logo_partner" alt="operation" src="../images/donate/home/matran.jpg"></img>
                                        </div>
                                        <div className="menu_item-text">
                                            <p className="text-bold">M???t tr???n T??? qu???c Vi???t Nam</p>
                                            <p>U??? ban Trung ????ng M???t tr???n T??? qu???c Vi???t Nam</p>
                                        </div>

                                    </div>

                                </div>
                                <div className="col-4">
                                    <div className="menu_item">
                                        <div className="img">
                                            <img className="logo_partner" alt="suc-manh" src="../images/donate/home/suc-manh.jpg"></img>
                                        </div>
                                        <div className="menu_item-text">
                                            <p className="text-bold">S???c m???nh 2000</p>
                                            <p>Ti???n l??? m???i ng??y X??y ngay ngh??n tr?????ng m???i</p>
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
                                            <p>Thay ?????i cu???c s???ng cho ph??? n??? v?? tr??? em Vi???t Nam</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="menu_item">
                                        <div className="img">
                                            <img className="logo_partner" alt="vc" src="../images/donate/home/vc.jpg"></img>
                                        </div>
                                        <div className="menu_item-text">
                                            <p className="text-bold">Trung t??m T??nh nguy???n Qu???c gia</p>
                                            <p>Th??c ?????y ??am m?? t??nh nguy???n</p>
                                        </div>

                                    </div>

                                </div>
                                <div className="col-4">
                                    <div className="menu_item">
                                        <div className="img">
                                            <img className="logo_partner" alt="tuoi-tre" src="../images/donate/home/tuoi-tre.jpg"></img>
                                        </div>
                                        <div className="menu_item-text">
                                            <p className="text-bold">B??o Tu???i Tr???</p>
                                            <p>C?? quan ng??n lu???n c???a ??o??n Thanh ni??n C???ng s???n Th??nh ph??? H??? Ch?? Minh</p>
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
