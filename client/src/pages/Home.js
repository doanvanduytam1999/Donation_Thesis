import React, { useEffect, useState } from 'react';
import { Card, Progress, Typography, Modal, Form, Input, Button, Radio, Tabs, Steps, message, Checkbox, Select, Result ,Badge } from 'antd';
import { CheckOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import donateEvensts from '../Api/donateEvensts';
import { Link } from "react-router-dom";
import "../style/Home.scss";
import "../style/bootstrap-grid.min.css";
const { Option } = Select;
const { Step } = Steps;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const { TabPane } = Tabs;
const { Text } = Typography;
const { TextArea } = Input;

const Home = () => {
    const [ellipsis, setEllipsis] = React.useState(true);
    const [listDonates, setListdonates] = useState([]);
    const [listDonate, setListdonate] = useState([]);
    const [checked, setChecked] = React.useState(false);
    const [donator, setDonator] = useState(null)
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
        fetchdonatesData();
    }, []);
    const [listCategory, setListCategory] = useState([]);
    useEffect(() => {
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
    }, [])
    const handleClick = (e) => {

        setListdonate(listDonates);
        let filterProduct = [];
        if (e === "1") {
            filterProduct = listDonates;
        } else {

            filterProduct = listDonates.filter(
                listDonates => listDonates.loaibaidang === e
            )
            setListdonate(filterProduct)
            console.log(filterProduct);


        }
    };
    console.log(listDonates);
    for(let i =0; i< listDonate.length; i++){
        for (let j = 0; j < listCategory.length; j++) {
            if(listDonate[i].loaibaidang == listCategory[j]._id){
                //console.log(listCategory[j].tenloai);
                listDonate[i].tenloai=listCategory[j].tenloai;
                //console.log(listDonate);
            }
            
        }
    }
    const [value, setValue] = useState(1);
    const onChange = e => {
        console.log('radio checked', e.target.value);
        let a = e.target.value;
        setValue(a)
        console.log("dfd");

    };

    const phoneSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="84">+84</Option>
                <Option value="85">+85</Option>
            </Select>
        </Form.Item>
    );

    const handlechecked = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setChecked(e.target.checked);

    }
    console.log(checked);
    const steps = [
        {
            title: 'Nhập thông tin',
            content: () => {
                return (
                    <>
                        <Form
                            
                            {...layout}
                            name="basic"
                            initialValues={{ prefix: "84" }}
                        /*  onFinish={onFinish}
                         onFinishFailed={onFinishFailed} */
                        >
                            <Radio.Group onChange={onChange} buttonStyle="solid" defaultValue="a">
                                <Radio.Button value="a">Cá nhân</Radio.Button>
                                <Radio.Button value="b">Tổ chức</Radio.Button>

                            </Radio.Group>
                            <Form.Item

                                name="name"
                                rules={[{ required: true, message: 'Hãy nhập tên của bạn !' }]}
                            >
                                <Input placeholder="Họ và tên của bạn" />
                            </Form.Item>
                            <Form.Item onChange={handlechecked}>
                                <Checkbox onClick={handlechecked}>
                                    Ủng hộ ẩn danh
                                </Checkbox>
                            </Form.Item>
                            {checked === false ? (
                                <>
                                    <Form.Item
                                        name="phone"
                                        rules={[{ required: true, message: 'Hãy nhập số điện thoại !' }]}
                                    >
                                        <Input placeholder="Nhập số điện thoại của bạn " addonBefore={phoneSelector} style={{ width: '100%' }} />
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
                                                message: 'Hãy nhập E-gmail!',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập e-mail của bạn" />
                                    </Form.Item>
                                    <Radio.Group onChange={onChange} defaultValue="a" style={{ marginTop: 16 }}>
                                        <Radio.Button style={{ marginRight: "20px" }} value="100000">100.000 VNĐ</Radio.Button>
                                        <Radio.Button style={{ marginRight: "20px" }} value="200000">200.000 VNĐ</Radio.Button>
                                        <Radio.Button style={{ marginRight: "20px" }} value="500000">500.000 VNĐ</Radio.Button>

                                    </Radio.Group>
                                    <Form.Item
                                        name="coin">
                                        <Input placeholder="Số khác" />
                                    </Form.Item>
                                    <Form.Item
                                        name="content"
                                    >
                                        <TextArea placeholder="Lời nhắn (không bắt buộc)" autoSize={{ minRows: 3}}  />
                                    </Form.Item>
                                </>
                            ) : (
                                <>

                                    <Radio.Group onChange={onChange} defaultValue="a" style={{ marginTop: 16 }}>
                                        <Radio.Button style={{ marginRight: "20px" }} value="100000">100.000 VNĐ</Radio.Button>
                                        <Radio.Button style={{ marginRight: "20px" }} value="200000">200.000 VNĐ</Radio.Button>
                                        <Radio.Button style={{ marginRight: "20px" }} value="500000">500.000 VNĐ</Radio.Button>

                                    </Radio.Group>
                                    <Form.Item
                                        name="coin">
                                        <Input placeholder="Số khác" />
                                    </Form.Item>
                                    <Form.Item
                                        name="content"
                                    >
                                        <TextArea placeholder="Lời nhắc (không bắt buộc)" autoSize={{ minRows: 3}}  />
                                    </Form.Item>
                                </>
                            )}

                        </Form>
                    </>
                )

            },
        },
        {
            title: 'Xác nhận',
            content: () => {
                return (
                    <>
                        <p>Số tiền ủng hộ 100.000đ</p>
                        <p>Lời nhắn</p>
                        <p>Cùng nhau chung tay đẩy lùi dịch bệnh</p>
                    </>
                )

            },
        },
        {
            title: 'Cám ơn',
            content: () => {
                return (
                    <>
                        <Result
                            status="success"
                            title="Cám ơn bạn đã quyên góp!"
                            subTitle="Số tiền sẽ được gửI ngay khi hoàn thành mục tiêu !!!"

                        />

                    </>
                )

            },
        },
    ];
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = (e) => {
        setIsModalVisible(true);
        console.log('Content: ', e.currentTarget.dataset.id);
        let id = e.currentTarget.dataset.id
        let filterProduct = [];
        
            filterProduct = listDonates.filter(
                listDonates => listDonates._id === id
            )
            setDonator(filterProduct)
         


        
    };
    console.log(donator);
    const handleOk = () => {
        setIsModalVisible(false);
        setCurrent(0)
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const convertNumber =(x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return (
        <>
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
                            {listDonates.map((item) => {
                                if (item.tinnoibat === true) {
                                    return (
                                        <>
                                            <div className="col-6 card">

                                                <Card
                                                    hoverable

                                                    style={{ borderRadius: 10, height: 260, width: "100%" }}
                                                    cover={<img height="100%" alt="example" src={item.hinhanh[0]} />}
                                                >
                                                    <p style={{display:"none"}} data-id={item._id}></p>
                                                    <div className="detail">
                                                        <Link to={`thong-tin-chi-tiet/${item._id}`} >
                                                            <Text style={ellipsis ? { width: 200 } : undefined, { fontWeight: "500", fontSize: "18px", color: "#1890ff" }}
                                                                ellipsis={ellipsis ? { tooltip: `${item.tieude}` } : false} >
                                                                {item.tieude} </Text>
                                                        </Link>
                                                        {/*  <Text
                                                            style={ellipsis ? { width:"100%" } : undefined}
                                                            ellipsis={ellipsis ? { tooltip:" " } : false} >
                                                            {item.noidung}
                                                            </Text> */}
                                                        <div className="progress">
                                                            <div className="progress_detail_top">
                                                                <p className="progress_detail_text">
                                                                
                                                                    {convertNumber(item.soTienDonateHieTai)
                                                                    } VNĐ quyên góp
                                                        </p>
                                                                <p className="progress_detail_number">{Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100)}%</p>
                                                            </div>

                                                            <Progress percent={Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100)} showInfo={false} status="active" />
                                                            <div className="progress_detail_bot">
                                                                <p className="progress_detail_text">
                                                                    <UsergroupAddOutlined />lượt quyên góp
                                                        </p>
                                                                <p className="progress_detail_number">ngày còn lại</p>
                                                            </div>
                                                        </div>
                                                        <p className="ant-btn ant-btn-primary "data-id={item._id} onClick={showModal}>Ủng hộ ngay</p>
                                                    </div>

                                                </Card>

                                            </div>

                                        </>)
                                }


                            })
                            }

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
                            {listDonate.map((item) => {
                                return (
                                    <>
                                        <div className="col-4 " >
                                        <Badge count={item.tenloai}>
                                            <Link to={`thong-tin-chi-tiet/${item._id}`} >
                                         
                                                <Card className="margin-top"
                                                    style={{ borderRadius: 10, height: 460 }}
                                                    hoverable
                                                    cover={<img alt="example" src={item.hinhanh[0]} />}>
                                                    
                                                    {/*  <Space direction="vertical">
                                                    <Text style={{ color: "#000", width: "100%", fontWeight: 700, fontSize: 20 }}>
                                                        {item.tieude} </Text>
                                                    <Text style={{ color: "#000", width: "100%", fontWeight: 700, fontSize: 20, }}
                                                    > {item.soTienCanDonate}</Text>
                                                </Space> */}


                                                    <Text style={ellipsis ? { width: 250 } : undefined, { fontWeight: "500", fontSize: "18px" }}
                                                        ellipsis={ellipsis ? { tooltip: 'Xem chi tiết !' } : false} >
                                                        {item.tieude} </Text>
                                                    {/*   <Text style={{ color: "#000", width: "100%", fontWeight: 700, fontSize: 20, }}
                                                    > {item.soTienCanDonate}</Text> */}
                                                    <Text
                                                        style={ellipsis ? { width: 250 } : undefined}
                                                        ellipsis={ellipsis ? { tooltip: 'Xem chi tiết !' } : false} >
                                                        {item.noidung}
                                                    </Text>
                                                    <div className="progress">
                                                        <div className="progress_detail_top">
                                                            <p className="progress_detail_text">
                                                                {convertNumber(item.soTienDonateHieTai)} vnđ quyên góp
                                                        </p>
                                                            <p className="progress_detail_number">
                                                            
                                                            {Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100)=== 100 ?(
                                                                <p>Hoàn thành</p>
                                                            ):(
                                                                <>
                                                                <p>
                                                                {Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100)}%
                                                                </p>
                                                               
                                                                </>
                                                                
                                                            )}
                                                            
                                                            </p>
                                                        </div>

                                                        <Progress percent={Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100)} showInfo={Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100)===100?(true):(false)} status={Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100)===100?("success"):("normal")} />
                                                        <div className="progress_detail_bot">
                                                            <p className="progress_detail_text">
                                                                <UsergroupAddOutlined />lượt quyên góp
                                                        </p>
                                                            <p className="progress_detail_number">ngày còn lại</p>
                                                        </div>
                                                    </div>

                                                    {/*   <Link to={`thong-tin-chi-tiet/${item._id}`} ><a href="#/" type="button" style={{ marginTop: "20px", textAlign: "center" }} className="ant-btn btn ant-btn-primary btn-detail text-bold" ><span className="btn-text">Xem chi tiết</span></a>
                                                </Link> */}
                                                </Card>
                                              
                                            </Link>
                                            </Badge>
                                        </div>
                                    </>
                                )

                            })}
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
            {donator != null?(
                    <>
                   
                    <Modal title={donator[0].tieude} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[current].content()}</div>
                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => next()}>
                                    Tiếp theo
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={handleCancel, () => message.success('Processing complete!')}>
                                    Hoàn thành
                                </Button>
                            )}
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                    Trở lại
                                </Button>
                            )}
                        </div>
                    </Modal>
                    
                    </>
                
           
            ):(
            <>
               <Modal title={"ủng hộ"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[current].content()}</div>
                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => next()}>
                                    Tiếp theo
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={handleCancel, () => message.success('Processing complete!')}>
                                    Hoàn thành
                                </Button>
                            )}
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                    Trở lại
                                </Button>
                            )}
                        </div>
                    </Modal>
            </>
            )}
            

        </>
    );
}

export default Home;
