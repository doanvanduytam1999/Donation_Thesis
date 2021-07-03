import React, { useEffect, useState } from 'react';
import { Button,  Table, Modal, Form, Input, Tabs, Steps, Checkbox, Select, Result, InputNumber, Image } from 'antd';
import parse from 'react-html-parser';
import "../style/bootstrap-grid.min.css";
import "../style/Detail.scss";
import { useParams } from "react-router-dom";
import donateEvensts from '../Api/donateEvensts';
import PayPal from "../components/Paypal";
import ListDonate from '../components/ListDonate';
const { TabPane } = Tabs;
const { Option } = Select;
const { Step } = Steps;
const { TextArea } = Input;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const columns = [
    {
      title: 'Tên ',
      dataIndex: 'tenNguoiDonate',
      key: 'tenNguoiDonate',
      
    },
    {
      title: 'Số tiền ủng hộ (VNĐ)',
      dataIndex: 'soTienDonate',
      key: 'soTienDonate',
    }
  ];
  
  
const Detail = () => {
    let { _id } = useParams();
    const [Donate, setDonate] = useState([]);
    const [img, setImg] = useState([]);
    const [checked, setChecked] = React.useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [current, setCurrent] = React.useState(0);
    const [AllDonator, setAllDonator] = useState([]);
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
        window.scrollTo(0,0)
        const fetchData = async () => {
            try {
                await donateEvensts.get(_id).then((res) => {
                    res.data.DonateEnvent.soTienCanDonate = res.data.DonateEnvent.soTienCanDonate.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    setDonate(res.data.DonateEnvent);
                    //console.log('ádas',res.data.DonateEnvent);
                    setImg(res.data.DonateEnvent.hinhAnh)
                    
                });
            } catch (error) {
                console.log("Failed to fetch Donate data at: ", error);
            }
        };
        const fetchAllDonater= async()=>{
            try{
                await donateEvensts.getAllDonater(_id).then((res)=>{
                    if(res.data.status==="success"){
                        /* res.data.AllDonater.soTienDonate = res.data.AllDonater.soTienDonate.replace(/\B(?=(\d{3})+(?!\d))/g, "."); */
                        setAllDonator(res.data.AllDonater)
                    }
                    
                })
            } catch(error){
                console.log("Failed to fetch AllDonator data at: ", error);
            }
        }
        fetchData();
        fetchAllDonater();
    }, []);
   
    AllDonator.forEach(element => {
        element.soTienDonate= element.soTienDonate.replace(/\B(?=(\d{3})+(?!\d))/g, ".")+'đ'

    });
    console.log(AllDonator);
    const phoneSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="84">+84</Option>
                <Option value="85">+85</Option>
            </Select>
        </Form.Item>
    );
    //const [value, setValue] = useState(1);
 
    const handlechecked = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setChecked(e.target.checked);

    }
   
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    
    const steps = [
        {
            title: 'Nhập thông tin',
            content: () => {
                const onFinish = (values) => {
                    console.log('Success:', values);
                    values['checked'] = checked;
                    const data = JSON.stringify(values)
                    localStorage.setItem("data", data);
                };
                const onFinishFailed = (errorInfo) => {
                    console.log('Failed:', errorInfo.values.name);
                  

                };
                return (
                    <>
                        <Form

                            {...layout}
                            name="basic"
                            initialValues={{ prefix: "84", coin: "10000", id: `${_id}` }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            {/*  <Radio.Group onChange={onChange} buttonStyle="solid" defaultValue="a">
                                <Radio.Button value="a">Cá nhân</Radio.Button>
                                <Radio.Button value="b">Tổ chức</Radio.Button>

                            </Radio.Group> */}
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
                                        <Input placeholder="Họ và tên của bạn" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số điện thoại"
                                        name="phone"

                                    >
                                        <Input placeholder="Nhập số điện thoại của bạn " addonBefore={phoneSelector} style={{ width: '100%' }} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Số tiền ủng hộ"
                                        rules={[

                                            {
                                                required: true,
                                                message: 'Hãy nhập số tiền ủng hộ',
                                            },
                                        ]}
                                        name="coin">
                                        <InputNumber
                                            
                                            style={{ width: "200px" }}
                                            defaultValue={10000}
                                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}

                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="content"
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
                                        <Button type="primary"  htmlType="submit">
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
                                        ]}
                                        name="coin">
                                        <InputNumber
                                           
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
                )

            },
        },
        {
            title: 'Xác nhận',
            content: () => {
                return (
                    <>
                        <p>Số tiền ủng hộ: 100.000đ</p>
                        <p>Lời nhắn:</p>
                        <p>Cùng nhau chung tay đẩy lùi dịch bệnh</p>
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
    const convertNumber = (x)=>{
        return   x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
     let html= Donate.noiDung;
      
    //console.log(html);
    return (
        <>
            <section className="detail_header">
                <div className="container">
                    <div className="">
                        <div className="introduce">
                            <h3 className="title">{Donate.tieuDe}</h3>
                            <h3 style={{ fontSize: "25px", fontFamily: "inherit" }}> 
                                Số tiền cần quyên góp {Donate.soTienCanDonate}VNĐ </h3>
                      
                           
                          
                            <div class="fb-like" data-href="https://momo.vn/cong-dong/chung-tay-gay-quy-dung-truong-moi-tang-25-em-hoc-sinh-ban-huoi-chua" data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>
                            <p style={{ fontSize: "20px" }}> {Donate.tomTat}</p>
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
                                    <Table columns={columns} dataSource={AllDonator} />
                            </TabPane>
                                    <TabPane tab="Các quyên góp khác" key="4">
                                        Content of Tab Pane 3
                            </TabPane>
                                </Tabs>
                            </div>
                            <div className="col-4">
                                <Tabs defaultActiveKey="1" type="card" /* size={size} */>
                                    <TabPane tab="Chuyển khoản" key="1">
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
                                        Content of card tab 2
                                </TabPane>

                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal title="Cám ơn" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Result
                            status="success"
                            title="Cám ơn bạn đã quyên góp!"
                            subTitle="Số tiền sẽ được gửI ngay khi hoàn thành mục tiêu !!!"

                        />
      </Modal>                                   
        </>
    );
}

export default Detail;
