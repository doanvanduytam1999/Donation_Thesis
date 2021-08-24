import { UsergroupAddOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Checkbox, Divider, Form, Image, Input, /* InputNumber, message, */ Modal, Progress, Result, Select,/*  Spin, */ Steps, Table, Tabs, Typography } from 'antd';
//import axios from "axios";
import React, { useEffect, useState } from 'react';
import parse from 'react-html-parser';
import { useSelector } from "react-redux";
import { Link, useHistory, useParams,useLocation } from "react-router-dom";
import ScrollToTop from 'react-scroll-to-top';
import donateEvensts from '../Api/donateEvensts';
import PayPal from "../components/Paypal";
import "../style/bootstrap-grid.min.css";
import "../style/Detail.scss";
import "../style/Momo.scss";
const { TabPane } = Tabs;
const { Option } = Select;
const { Step } = Steps;
const { TextArea } = Input;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const Detail = () => {
    let {_id} = useParams();
    const [Donate, setDonate] = useState([]);
    const [DonateID, setDonateID] = useState([]);
    const { isLoggedIn } = useSelector(state => state.login);
    const [img, setImg] = useState([]);
    const [checked, setChecked] = React.useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [licked, setLicked] = React.useState(false);
    const [value, setValue] = useState(1);
    const [current, setCurrent] = React.useState(0);
    const [AllDonator, setAllDonator] = useState([]);
    const [/* AllDonates */, setAllDonates] = useState([]);
    const [load, setLoad]=useState(false);
    //const [ArrayDonateCategory, setArrayDonateCategory] = useState([]);
    const [ReleatedPost, setReleatedPost] = useState([]);
    const data = useSelector(state => state.login.user);
    const user= JSON.parse(localStorage.getItem("user"))
    const { Text } = Typography;
    const [ellipsis, /* setEllipsis */] = React.useState(true);
    const history = useHistory()
    const idCategoryPost = Donate.categoryPost;
    const showModal = () => {
        setIsModalVisible(true);
        setCurrent(0)
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
   
    useEffect(() => {

        window.scrollTo(0, 0)
        const fetchData =  () => {
            try {
               
                    donateEvensts.get(_id).then((res) => {
                        setDonateID(res.data.DonateEnvent)
                        console.log(res.data.DonateEnvent);
                        //res.data.DonateEnvent.soTienCanDonate = res.data.DonateEnvent.soTienCanDonate.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        setDonate(res.data.DonateEnvent);
                        //console.log('ádas',res.data.DonateEnvent);
                        setImg(res.data.DonateEnvent.image)
    
                    });
              
                setTimeout(()=>{
                    donateEvensts.get(_id).then((res) => {
                        setDonateID(res.data.DonateEnvent)
                        console.log(res.data.DonateEnvent);
                        //res.data.DonateEnvent.soTienCanDonate = res.data.DonateEnvent.soTienCanDonate.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        setDonate(res.data.DonateEnvent);
                        //console.log('ádas',res.data.DonateEnvent);
                        setImg(res.data.DonateEnvent.image)
    
                    });
                },3000)
                
            } catch (error) {
                console.log("Failed to fetch Donate data at: ", error);
            }
        };
        const fetchdonatesData = async () => {
            try {
                await donateEvensts.getAll().then((res) => {
                    setAllDonates(res.data.DonateEnvents);

                });

            } catch (error) {
                console.log("Failed to fetch brand data at: ", error);
            }
        };
        const fetchAllDonater = async () => {
            try {
                await donateEvensts.get50Donater(_id).then((res) => {
                    if (res.data.status === "success") {
                        /* res.data.AllDonater.soTienDonate = res.data.AllDonater.soTienDonate.replace(/\B(?=(\d{3})+(?!\d))/g, "."); */
                        setAllDonator(res.data.AllDonater)
                    }

                })
            } catch (error) {
                console.log("Failed to fetch AllDonator data at: ", error);
            }
        }

        fetchdonatesData();
        fetchData();
        fetchAllDonater();
        //radomDonateEvent()
    }, [licked, _id]);
    //console.log(ReleatedPost);
    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchCategoryPost =  () => {
            try {
                 donateEvensts.getPostCategory(_id).then((res) => {
                    setReleatedPost(res.data.ReleatedPost);
                    setLoad(true);
                });
                setLoad(true);
            } catch (error) {
                console.log("Failed to fetch Donate data at: ", error);
            }
        };
        fetchCategoryPost();
    }, [idCategoryPost]);
    const Location = useLocation();
    //console.log(Location.search);
    //let str =Location.search;
   //str= str.split('&');
    //console.log(str);
    const phoneSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="84">+84</Option>
                <Option value="85">+85</Option>
            </Select>
        </Form.Item>
    );
    const checkBtn = () => {
        setLicked(true)
    }
    const handlechecked = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setChecked(e.target.checked);
    }
    const next = () => {
        setCurrent(current + 1);

    };
    const prev = () => {
        setCurrent(current - 1);
        setLicked(false)
    };
    const onChange = e => {
        console.log('changed', value);
        let a = value;
        setValue(a)

    };
    const steps = [
        {
            title: 'Nhập thông tin',
            content: () => {
                const onFinish = (values) => {
                    console.log('Success:', values);
                    /* if(Number(values.amountToDonate) <10000){
                        message.error("Số tiền phải lớn hơn bằng 10.000Đ");
                        setLicked(false)
                        return
                    }
                    else{ */
                        checkBtn();
                        values['checked'] = checked;
                        values['donateEvent'] =_id;
                        const data = JSON.stringify(values)
                        localStorage.setItem("data", data);
                   /* }  */
                   
                };
                const onFinishFailed = (errorInfo) => {
                    console.log('Failed:', errorInfo.values.name);
                };
                return (
                    <>
                        {isLoggedIn === false ? (
                            <>
                                <Form
                                    {...layout}
                                    name="basic"
                                    initialValues={{ prefix: "84", amountToDonate: "10000", phone:"" }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                >
                                    <Form.Item label='Ủng hộ ẩn danh' onChange={handlechecked}>
                                        <Checkbox />
                                    </Form.Item>
                                    {checked === false ? (
                                        <>
                                            <Form.Item
                                                label="Họ và tên"
                                                name="fullName"
                                                rules={[{ required: true, message: 'Hãy nhập họ tên của bạn !' }]}

                                            >
                                                <Input autoComplete="off" placeholder="Họ và tên của bạn" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Số điện thoại"
                                                name="phone"
                                                rules={[{ min: 10,max:11, message: 'Số điện thoại từ 10-11 số !' },
                                                {
                                                    pattern: new RegExp(/^\+?(\d.*){10,11}$/),
                                                    message: "Vui lòng nhập đúng số điện thoại !",
                                                },
                                            ]}
                                            >
                                                <Input autoComplete="off" placeholder="Nhập số điện thoại của bạn " addonBefore={phoneSelector} style={{ width: '100%' }} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Số tiền ủng hộ "
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Hãy nhập số tiền ủng hộ',
                                                    },
                                                    {
                                                           
                                                        min:5,
                                                        message: "Số tiền ủng hộ từ 10.000 trở lên",
                                                    },
                                                    {
                                                        pattern: new RegExp(/^\d*\.?\d+$/),
                                                        message: "Số tiền không chứa chữ !",
                                                    }
                                                    
                                                ]}
                                                name="amountToDonate">
                                                <Input
                                                    onChange={onChange}
                                                    style={{ width: "200px" }}
                                                    defaultValue={10000}
                                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name="message"
                                                label="Lời nhắn"
                                            >
                                                <TextArea placeholder="Lời nhắn (không bắt buộc)" autoSize={{ minRows: 3 }} />
                                            </Form.Item>
                                            <Form.Item hidden name="id">
                                                <Input />
                                            </Form.Item>
                                            <Form.Item wrapperCol={{
                                                xs: { span: 24, offset: 0 },
                                                sm: { span: 16, offset: 8 },
                                            }} >
                                                <Button type="primary" htmlType="submit">
                                                    Xác nhận
                                                </Button>
                                            </Form.Item>
                                        </>
                                    ) : (
                                        <>
                                            <Form.Item hidden name="andanh">
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Số tiền ủng hộ"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Hãy nhập số tiền ủng hộ',
                                                    },
                                                    {
                                                           
                                                        min:5,
                                                        message: "Số tiền ủng hộ từ 10.000 trở lên",
                                                    },
                                                    {
                                                        pattern: new RegExp(/^\d*\.?\d+$/),
                                                        message: "Số tiền không chứa chữ !",
                                                    }
                                                ]}
                                                name="amountToDonate">
                                                <Input
                                                    onChange={onChange}
                                                    style={{ width: "200px" }}
                                                    defaultValue={10000}
                                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label='Lời nhắn'
                                                name="message"
                                            >
                                                <TextArea placeholder="Lời nhắc (không bắt buộc)" autoSize={{ minRows: 3 }} />
                                            </Form.Item>
                                            <Form.Item hidden name="id">
                                                <Input />
                                            </Form.Item>
                                            <Form.Item >
                                                <Button type="primary" htmlType="submit">
                                                    Xác nhận
                                                </Button>
                                            </Form.Item>

                                        </>
                                    )}

                                </Form>
                            </>
                        ) : (
                            <>
                                {data !== [] ? (
                                    <>
                                        <Form

                                            {...layout}
                                            name="basic"
                                            initialValues={{ prefix: "84", amountToDonate: "10000", name: `${data.fullName}`, phone: "" }}
                                            onFinish={onFinish}
                                            onFinishFailed={onFinishFailed}
                                        >
                                           
                                            <Form.Item label='Ủng hộ ẩn danh' onChange={handlechecked}>
                                                <Checkbox />

                                            </Form.Item>


                                            {checked === false ? (
                                                <>
                                                    <Form.Item
                                                        label="Họ và tên"
                                                        name="name"
                                                        rules={[{ required: true, message: 'Hãy nhập họ tên của bạn !' }]}
                                                    >
                                                        <Input style={{ background: "#5858583b" }} readOnly />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Số điện thoại"
                                                        name="phone"
                                                        rules={[{ min: 10,max:11, message: 'Số điện thoại từ 10-11 số !' }, {
                                                            pattern: new RegExp(/^\+?(\d.*){10,11}$/),
                                                            message: "Vui lòng nhập đúng số điện thoại !",
                                                        },]}
                                                    >
                                                        <Input style={{ width: '100%' }}  />
                                                    </Form.Item>
                                                        
                                                    <Form.Item
                                                        label="Số tiền ủng hộ "
                                                        rules={[

                                                            {
                                                                required: true,
                                                                message: 'Hãy nhập số tiền ủng hộ',
                                                            },
                                                           
                                                            {
                                                           
                                                                min:5,
                                                                message: "Số tiền ủng hộ từ 10.000 trở lên",
                                                            },
                                                            {
                                                                pattern: new RegExp(/^\d*\.?\d+$/),
                                                                message: "Số tiền không chứa chữ !",
                                                            }
                                                        ]}
                                                        name="amountToDonate">
                                                        <Input
                                                            onChange={onChange}
                                                            style={{ width: "200px" }}
                                                            defaultValue={10000}
                                                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="message"
                                                        label="Lời nhắn"
                                                    >
                                                        <TextArea placeholder="Lời nhắn (không bắt buộc)" autoSize={{ minRows: 3 }} />
                                                    </Form.Item>
                                                    <Form.Item hidden name="id">
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item wrapperCol={{
                                                        xs: { span: 24, offset: 0 },
                                                        sm: { span: 16, offset: 8 },
                                                    }} >
                                                        <Button onClick={checkBtn} type="primary" htmlType="submit">
                                                            Xác nhận
                                                        </Button>
                                                    </Form.Item>
                                                </>
                                            ) : (
                                                <>
                                                    <Form.Item hidden name="andanh">
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item

                                                        label="Số tiền ủng hộ"
                                                        rules={[

                                                            {
                                                                required: true,
                                                                message: 'Hãy nhập số tiền ủng hộ',
                                                            },
                                                            {
                                                           
                                                                min:5,
                                                                message: "Số tiền ủng hộ từ 10.000 trở lên",
                                                            },
                                                            {
                                                                pattern: new RegExp(/^\d*\.?\d+$/),
                                                                message: "Số tiền không chứa chữ !",
                                                            }
                                                          
                                                        ]}
                                                        name="amountToDonate">
                                                        <Input
                                                            onChange={onChange}
                                                            style={{ width: "200px" }}
                                                            defaultValue={10000}
                                                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Lời nhắn'
                                                        name="content"
                                                    >
                                                        <TextArea placeholder="Lời nhắc (không bắt buộc)" autoSize={{ minRows: 3 }} />
                                                    </Form.Item>
                                                    <Form.Item hidden name="id">
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item >
                                                        <Button type="primary" htmlType="submit">
                                                            Xác nhận
                                                        </Button>
                                                    </Form.Item>

                                                </>
                                            )}

                                        </Form>
                                    </>
                                ) : (<><p></p></>)}

                            </>
                        )
                        }


                    </>
                )

            },
        },
        {
            title: 'Xác nhận',
            content: () => {
                const coin = JSON.parse(localStorage.getItem("data"));

                return (
                    <>
                        <p>Số tiền ủng hộ: {convertNumber(coin.amountToDonate)}</p>
                        <p>Lời nhắn:</p>
                        <p>{coin.content}</p>
                        <PayPal />
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
    const convertNumber = (x) => {
        if (Donate === []) {
            if (Donate.setAmount) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        }
        else {
            if (Donate.setAmount) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        }

    }
    const dayEnd = (day) => {
        const currentDay = new Date();
        let endtDay = Date.parse(day)
        let ngayconlai = (endtDay - currentDay.getTime()) / 1000;
        return Math.floor((ngayconlai / 60) / 60 / 24)

    }
    const columns = [
        {
            title: 'Tên ',
            dataIndex: 'fullName',
            key: 'fullName',

        },
        {
            title: 'Số tiền ủng hộ',
            dataIndex: 'amountToDonate',
            key: 'amountToDonate',
            render: text => (
                <>
                    {convertNumber(text)} đ
                </>
            ),
        }
    ];
    let html = Donate.content;
    let happinessContent = Donate.happinessContent
    const viewAll = () => {
        history.push(`/xem-tat-ca-nguoi-ung-ho/${_id}`)
    }
    console.log(data);
    const onFinishMomo=(values)=>{
        //console.log("momo",values);
        checkBtn();
        //const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            values['userId']=user._id;
        }
        let ms = Date.now()
        values['orderId'] ="MM"+ms;
        values['requestId'] ="MM"+ms;
        values['checked'] = checked;
        values['orderInfo']=Donate.title;    
        values['donateEvent'] =_id.trim();
        console.log("momo",values);
        donateEvensts.postPayMomo(values).then((res)=>{
            console.log("data",res.data);
            if(res.data.MomoPay.errorCode===0)
            {
                let url = res.data.MomoPay.payUrl
                console.log("url",url);
                //history.push(url)
                window.location.replace(url);

                
            }
        });

        //console.log("Day",ms);
    }
   
    return (
        <>
          <ScrollToTop smooth={true} />
            <section className="detail_header">
                <div className="container">
                    <div className="">
                        <div className="introduce">
                            <h3 className="title">{Donate.title}</h3>
                            <h3 style={{ fontSize: "25px", fontFamily: "NunitoBold" }}>
                                Số tiền cần quyên góp {convertNumber(Donate.setAmount)}VNĐ </h3>
                            <div class="fb-like" data-href="https://momo.vn/cong-dong/chung-tay-gay-quy-dung-truong-moi-tang-25-em-hoc-sinh-ban-huoi-chua" data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>
                            <p style={{ fontSize: "20px" }}> {Donate.summary}</p>
                        </div>
                        <div className="slider">
                            <div style={{ justifyContent: "space-between", display: "flex" }}>
                                {img.map((item) => {
                                    return (
                                        <Image
                                            style={{ borderRadius: "10px" }}
                                            width={400}
                                            src={item}
                                        />
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section className="detail_body">
                <div className="container">
                    <div className="">
                        <div className="row">
                            <div className="col-8">
                                <Tabs defaultActiveKey="1"/*  onChange={callback} */>
                                    <TabPane tab="Câu chuyện" key="2">
                                        {parse(parse(html))}
                                    </TabPane>
                                    <TabPane tab="Nhà hảo tâm" key="3">
                                        <p>Top 50 lần ủng hộ gần nhất</p>
                                        <Table columns={columns} dataSource={AllDonator} />
                                        <Button onClick={viewAll} >Xem tất cả</Button>
                                    </TabPane>
                                    <TabPane tab="Trao yêu thương" key="4">
                                        {parse(parse(happinessContent))}
                                    </TabPane>
                                </Tabs>
                            </div>
                            <div className="col-4">
                                <div className="card_infoDonate">
                                    <h3 className="card_infoDonate_title">Thông tin quyên góp</h3>

                                    <div className="progress_detail_top">
                                        <p className="progress_detail_text">
                                            Đã quyên góp: {convertNumber(DonateID.currentAmount)}VNĐ/{convertNumber(DonateID.setAmount)}VNĐ
                                        </p>
                                        <Progress percent={Math.floor((Donate.currentAmount / Donate.setAmount) * 100)} showInfo={Math.floor((Donate.currentAmount / Donate.setAmount) * 100) === 100 ? (true) : (false)} status={Math.floor((Donate.currentAmount / Donate.setAmount) * 100) === 100 ? ("success") : ("normal")} />
                                        <div className="progress_detail_bot ">
                                            <div class="row">
                                                <div class="col">
                                                    <p className="progress_detail_text">
                                                        <UsergroupAddOutlined /> Lượt quyên góp
                                                    </p>
                                                </div>
                                                <div class="col">
                                                    <p className="progress_detail_text">
                                                        <UsergroupAddOutlined /> Đạt được
                                                    </p>
                                                </div>
                                                <div class="col">
                                                    <p className="progress_detail_text">
                                                        <UsergroupAddOutlined /> Thời hạn còn
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <p className="progress_detail_text">
                                                        {Donate.numberOfDonations}
                                                    </p>
                                                </div>
                                                <div class="col">
                                                    <p className="progress_detail_text">
                                                        {((DonateID.currentAmount / DonateID.setAmount) * 100).toFixed(3)}%
                                                    </p>
                                                </div>
                                                <div class="col">
                                                    <p className="progress_detail_text">
                                                        {Number(dayEnd(Donate.endDay)) === 0 || Number(dayEnd(Donate.endDay)) < 0 ? (<>Đã hết hạn</>) : (<> {dayEnd(Donate.endDay)} ngày </>)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card_donate">
                                    <h3 className="card_donate_title">Quyên góp ngay</h3>
                                                                 
                                    {
                                        Donate.status === "Dừng nhận donate" ? (<>
                                            <p className="tamngung" >Tạm ngưng</p>

                                        </>) : (<>
                                            {
                                                Number(Donate.currentAmount) >= Number(Donate.setAmount) ? (
                                                    <div className="progress_detail_top">
                                                        <p className="complete" >Đã hoàn thành</p>
                                                        <p className="progress_detail_text">
                                                            Đã quyên góp: {convertNumber(DonateID.currentAmount)} VNĐ
                                                        </p>
                                                        <p className="progress_detail_number">
                                                            {Math.floor((DonateID.currentAmount / DonateID.setAmount) * 100) === 100 ? (
                                                                <p>Hoàn thành</p>
                                                            ) : (
                                                                <>
                                                                    <p className="progress_detail_number">{((DonateID.currentAmount / DonateID.setAmount) * 100).toFixed(3)}%</p>
                                                                </>
                                                            )}
                                                        </p>
                                                        <Progress percent={Math.floor((Donate.currentAmount / Donate.setAmount) * 100)} showInfo={Math.floor((Donate.currentAmount / Donate.setAmount) * 100) === 100 ? (true) : (false)} status={Math.floor((Donate.currentAmount / Donate.setAmount) * 100) === 100 ? ("success") : ("normal")} />
                                                    </div>

                                                ) : (
                                                    <>
                                                        <Tabs defaultActiveKey="1" type="card" /* size={size} */>
                                                            <TabPane tab="PayPal" key="1">
                                                                <Steps current={current}>
                                                                    {steps.map(item => (
                                                                        <Step key={item.title} title={item.title} />
                                                                    ))}
                                                                </Steps>
                                                                <div className="steps-content">{steps[current].content()}</div>
                                                                <div className="steps-action">
                                                                    {current < steps.length - 1 && (
                                                                        <Button disabled={
                                                                            licked === true ? (false) : (true)} type="primary" onClick={() => next()}>
                                                                            Tiếp theo
                                                                        </Button>
                                                                    )}
                                                                    {current === steps.length - 1 && (
                                                                        <Button type="primary" onClick={showModal}>
                                                                            Xác nhận
                                                                        </Button>
                                                                    )}
                                                                    {current > 0 && (
                                                                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                                                            Trở lại
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </TabPane>
                                                            <TabPane tab="Momo" key="2">
                                                            <>
                        {isLoggedIn === false ? (
                            <>
                                <Form
                                    {...layout}
                                    name="basic"
                                    initialValues={{ prefix: "84", amountToDonate: "10000",phone:"" }}
                                    onFinish={onFinishMomo}
                                    ///onFinishFailed={onFinishFailed}
                                >
                                    <Form.Item label='Ủng hộ ẩn danh' onChange={handlechecked}>
                                        <Checkbox />
                                    </Form.Item>
                                    {checked === false ? (
                                        <>
                                            <Form.Item
                                                label="Họ và tên"
                                                name="fullName"
                                                rules={[{ required: true, message: 'Hãy nhập họ tên của bạn !' }]}

                                            >
                                                <Input autoComplete="off" placeholder="Họ và tên của bạn" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Số điện thoại"
                                                name="phone"
                                                 rules={[{ min: 10,max:11, message: 'Số điện thoại từ 10-11 số !' },
                                                 {
                                                    pattern: new RegExp(/^\+?(\d.*){10,11}$/),
                                                    message: "Vui lòng nhập đúng số điện thoại !",
                                                },]}
                                            >
                                                <Input autoComplete="off" placeholder="Nhập số điện thoại của bạn " addonBefore={phoneSelector} style={{ width: '100%' }} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Số tiền ủng hộ "
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Hãy nhập số tiền ủng hộ',
                                                    },
                                                    {
                                                           
                                                        min:5,
                                                        message: "Số tiền ủng hộ từ 10.000 trở lên",
                                                    },
                                                    {
                                                        pattern: new RegExp(/^\d*\.?\d+$/),
                                                        message: "Số tiền không chứa chữ !",
                                                    }
                                                ]}
                                                name="amountToDonate">
                                                <Input
                                                    onChange={onChange}
                                                    style={{ width: "200px" }}
                                                    defaultValue={10000}
                                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                                />
                                            </Form.Item>
                                            <Form.Item
                                                name="message"
                                                label="Lời nhắn"
                                            >
                                                <TextArea placeholder="Lời nhắn (không bắt buộc)" autoSize={{ minRows: 3 }} />
                                            </Form.Item>
                                            <Form.Item hidden name="id">
                                                <Input />
                                            </Form.Item>
                                            <Form.Item wrapperCol={{
                                               
                                            }} >
                                                <Button type="primary" className="checkout-title"  htmlType="submit"> 
                                                    Gửi tiền bằng Ví MoMo
                                                </Button>
                                            </Form.Item>
                                        </>
                                    ) : (
                                        <>
                                            <Form.Item hidden name="andanh">
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Số tiền ủng hộ "
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Hãy nhập số tiền ủng hộ',
                                                    }, {
                                                           
                                                        min:5,
                                                        message: "Số tiền ủng hộ từ 10.000 trở lên",
                                                    },
                                                    {
                                                        pattern: new RegExp(/^\d*\.?\d+$/),
                                                        message: "Số tiền không chứa chữ !",
                                                    }
                                                    
                                                ]}
                                                name="amountToDonate">
                                                <Input
                                                    onChange={onChange}
                                                    style={{ width: "200px" }}
                                                    defaultValue={10000}
                                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label='Lời nhắn'
                                                name="message"
                                            >
                                                <TextArea placeholder="Lời nhắc (không bắt buộc)" autoSize={{ minRows: 3 }} />
                                            </Form.Item>
                                            <Form.Item hidden name="id">
                                                <Input />
                                            </Form.Item>
                                            <Form.Item >
                                                <Button type="primary" className="checkout-title" htmlType="submit">
                                                Gửi tiền bằng Ví MoMo
                                                </Button>
                                            </Form.Item>

                                        </>
                                    )}

                                </Form>
                            </>
                        ) : (
                            <>
                                {data !== [] ? (
                                    <>
                                        <Form

                                            {...layout}
                                            name="basic"
                                            initialValues={{ prefix: "84", amountToDonate: "10000", fullName: `${user.fullName}`, phone: `${""}` }}
                                            onFinish={onFinishMomo}
                                            //onFinishFailed={onFinishFailed}
                                        >
                                            <Form.Item label='Ủng hộ ẩn danh' onChange={handlechecked}>
                                                <Checkbox />

                                            </Form.Item>
                                            {checked === false ? (
                                                <>
                                                    <Form.Item
                                                        label="Họ và tên"
                                                        name="fullName"
                                                        rules={[{ required: true, message: 'Hãy nhập họ tên của bạn !' }]}
                                                    >
                                                        <Input style={{ background: "#5858583b" }} readOnly />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Số điện thoại"
                                                        name="phone"
                                                        rules={[{ min: 10,max:11, message: 'Số điện thoại từ 10-11 số !' },
                                                        {
                                                            pattern: new RegExp(/^\+?(\d.*){10,11}$/),
                                                            message: "Vui lòng nhập đúng số điện thoại !",
                                                        },]}
                                                    >
                                                        <Input style={{ width: '100%'}}  />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Số tiền ủng hộ "
                                                        rules={[

                                                            {
                                                                required: true,
                                                                message: 'Hãy nhập số tiền ủng hộ',
                                                            }, {
                                                           
                                                                min:5,
                                                                message: "Số tiền ủng hộ từ 10.000 trở lên",
                                                            },
                                                            {
                                                                pattern: new RegExp(/^\d*\.?\d+$/),
                                                                message: "Số tiền không chứa chữ !",
                                                            }
                                                           
                                                        ]}
                                                        name="amountToDonate">
                                                        <Input
                                                            onChange={onChange}
                                                            style={{ width: "200px" }}
                                                            defaultValue={10000}
                                                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="message"
                                                        label="Lời nhắn"
                                                    >
                                                        <TextArea placeholder="Lời nhắn (không bắt buộc)" autoSize={{ minRows: 3 }} />
                                                    </Form.Item>
                                                    <Form.Item hidden name="id">
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item wrapperCol={{
                                                   
                                                    }} >
                                                        <Button onClick={checkBtn} className="checkout-title" type="primary" htmlType="submit">
                                                        Gửi tiền bằng Ví MoMo
                                                        </Button>
                                                    </Form.Item>
                                                </>
                                            ) : (
                                                <>
                                                    <Form.Item hidden name="andanh">
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item

                                                        label="Số tiền ủng hộ "
                                                        rules={[

                                                            {
                                                                required: true,
                                                                message: 'Hãy nhập số tiền ủng hộ',
                                                            },
                                                            {
                                                           
                                                                min:5,
                                                                message: "Số tiền ủng hộ từ 10.000 trở lên",
                                                            },
                                                            {
                                                                pattern: new RegExp(/^\d*\.?\d+$/),
                                                                message: "Số tiền không chứa chữ !",
                                                            }
                                                        ]}
                                                        name="amountToDonate">
                                                        <Input
                                                            onChange={onChange}
                                                            style={{ width: "200px" }}
                                                            defaultValue={10000}
                                                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label='Lời nhắn'
                                                        name="content"
                                                    >
                                                        <TextArea placeholder="Lời nhắc (không bắt buộc)" autoSize={{ minRows: 3 }} />
                                                    </Form.Item>
                                                    <Form.Item hidden name="id">
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item >
                                                        <Button className="checkout-title" type="primary" htmlType="submit">
                                                        Gửi tiền bằng Ví MoMo
                                                        </Button>
                                                    </Form.Item>

                                                </>
                                            )}

                                        </Form>
                                    </>
                                ) : (<><p></p></>)}

                            </>
                        )
                        }
                    </>
                                                              
                                                            </TabPane>
                                                        </Tabs>
                                                    </>

                                                )
                                            }
                                        </>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Divider></Divider>
            <section className="detail_footer">
                <div className="container">
                    <h3 className="detail_footer_title">Chương trình liên quan</h3>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                   {load === true? (<>
                    {ReleatedPost.map((item) => {
                return (
                    <>
                        <div  className="col-2" >
                            <Badge count={item.categoryName}>
                                <Link to={`${item._id}`} >
                                    <Card className="margin-top"
                                        style={{ borderRadius: 10, height: 460 }}
                                        hoverable
                                        cover={<img alt="example" src={item.image[0]} />}>
                                        <Text className="title-text" style={ellipsis ? { width: 250 } : undefined}
                                            ellipsis={ellipsis ? { tooltip: `${item.title}` } : false} >
                                            {item.title} </Text>
                                        <Text className="title-tomtat"
                                            style={ellipsis ? { width: 250 } : undefined}
                                            ellipsis={ellipsis ? { tooltip: `${item.summary}` } : false} >
                                            {item.summary}
                                        </Text>
                                        {
                                            item.status === "Dừng nhận donate" ? (<><p className="tamngung" >Tạm ngưng</p></>) : (<>
                                                <div className="progress">
                                                    <div className="progress_detail_top">
                                                        <p className="progress_detail_text">
                                                            {/* convertNumber */(item.currentAmount)} vnđ quyên góp
                                                        </p>
                                                        <p className="progress_detail_number">
                                                            {Math.floor((item.currentAmount / item.setAmount) * 100) === 100 ? (
                                                                <p>Hoàn thành</p>
                                                            ) : (
                                                                <>
                                                                    <p className="progress_detail_number">{((item.currentAmount / item.setAmount) * 100).toFixed(3)}%</p>
                                                                </>
                                                            )}
                                                        </p>
                                                    </div>
                                                    <Progress percent={Math.floor((item.currentAmount / item.setAmount) * 100)} showInfo={Math.floor((item.currentAmount / item.setAmount) * 100) === 100 ? (true) : (false)} status={Math.floor((item.currentAmount / item.setAmount) * 100) === 100 ? ("success") : ("normal")} />
                                                    <div className="progress_detail_bot">
                                                        <p className="progress_detail_text">
                                                            <UsergroupAddOutlined /> {item.numberOfDonations} lượt quyên góp
                                                        </p>
                                                        <p className="progress_detail_number">{Number(dayEnd(item.endDay))===0 ||Number(dayEnd(item.endDay))<0 ?(<>Đã hết hạn</>):(<> {dayEnd(item.endDay)} ngày còn lại</>) } </p>
                                                    </div>
                                                </div>
                                            </>)
                                        }
                                    </Card>

                                </Link>
                            </Badge>
                        </div>
                    </>
                )

            })}
                   </>):(<></>)}
                   
                 
                    </div>

                </div>
            </section>
            <Modal title="Cám ơn" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
                <Result
                    status="success"
                    title="Cám ơn bạn đã quyên góp!"
                    subTitle="Số tiền sẽ được gửi ngay khi chương trình kết thúc !!!"

                />
            </Modal>
        </>
    );
}

export default Detail;
