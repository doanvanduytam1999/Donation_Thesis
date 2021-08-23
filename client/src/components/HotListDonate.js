import { UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input, /* InputNumber, */ message, Modal, Progress, Result, Select, Steps, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PayPal from "../components/Paypal";
import "../style/bootstrap-grid.min.css";
import "../style/Home.scss";
//import ListDonate from "./ListDonate";
//import donateEvensts from "../Api/donateEvensts";
//import { logout } from "../redux/actions/auth.js";
import "../style/HotListDonate.scss";
import Momo from "./Momo";
const { Option } = Select;
const { Step } = Steps;
const { Text } = Typography;
const { TextArea } = Input;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const phoneSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="84">+84</Option>
            <Option value="85">+85</Option>
        </Select>
    </Form.Item>
);
const HotListDonate = (props) => {
    const [donator, setDonator] = useState(null)
    const [id, setid] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ellipsis, /* setEllipsis */] = React.useState(true);
    const [current, setCurrent] = React.useState(0);
    const [licked, setLicked] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const [value, setValue] = useState(1);
    const { isLoggedIn } = useSelector(state => state.login);
    const data = useSelector(state => state.login.user);
    const [Listhost, setListhost] = useState(props.listDonates);
    //const [Count, setCount] = useState(0);
    //const order= JSON.parse(localStorage.getItem("user"))
//console.log(order);
    useEffect(() => {
        setListhost(props.listDonates);
    }, [props.listDonates, licked,id])
    const dayEnd = (day) => {
        const currentDay = new Date();
        let endtDay = Date.parse(day)
        let ngayconlai = (endtDay - currentDay.getTime()) / 1000;
        return Math.floor((ngayconlai / 60) / 60 / 24)

    }
    const showModal = (e) => {
        setIsModalVisible(true);
        console.log('Content: ', e.currentTarget.dataset.id);
        let id = e.currentTarget.dataset.id
        let filterProduct = [];

        filterProduct = props.listDonates.filter(
            listDonates => listDonates._id === id
        )
        //setid(filterProduct[0]._id)
        setid(filterProduct[0]._id);
        setDonator(filterProduct)
        setLicked(false)



    };
    const convertNumber = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  /*   const handleOk = () => {
        setIsModalVisible(false);
        setCurrent(0)
        
    }; */
    const handleCancel = () => {
        setIsModalVisible(false);
        setLicked(false)
        setCurrent(0)
    };
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
        setLicked(false)
    };
    const handlechecked = (e) => {
        console.log(`checked = ${e.target.checked}`);
        onChange(setChecked(e.target.checked))


    }
    const onChange = e => {
        console.log('changed', value);
        let a = value;
        setValue(a)

    };
    const checkBtn = () => {
        setLicked(true)
       
    }
    /* if(order){
        setCount(1)
    } */
    //console.log(isLoggedIn);
    const steps = [
        {
            title: 'Nhập thông tin',
            content: () => {
                const onFinish = (values) => {
                    const user = JSON.parse(localStorage.getItem("user"))
                    console.log('Success:', values);
                    checkBtn();
                    values['checked'] = checked;
                    values['donateEvent'] = id;
                    values['orderInfo']= donator[0].title;
                    if(user){
                        values['userId']=user._id;
                    }
                    const data = JSON.stringify(values)
                    localStorage.setItem("data", data);
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
                                    initialValues={{ prefix: "84", amountToDonate: "10000" }}
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
                                            >
                                                <Input autoComplete="off" placeholder="Nhập số điện thoại của bạn " addonBefore={phoneSelector} style={{ width: '100%' }} />
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
                                            initialValues={{ prefix: "84", amountToDonate: "10000", fullName: `${data.fullName}`,phone:`${""}`}}
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
                                                        <Input style={{ background: "#5858583b" }} readOnly />
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Số điện thoại"
                                                        name="phone"
                                                        

                                                    >
                                                        <Input  />
                                                    </Form.Item>

                                                    <Form.Item
                                                        label="Số tiền ủng hộ"
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
                        <p>{coin.message}</p>
                        <p>Gửi tiền bằng</p>
                        <Momo></Momo>
                        <p>Hoặc</p>
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

//console.log(licked);

    return (
        <>
            {Listhost
            .filter(Listhost => Listhost.hotPost === true)
            .map((item) => {
                /* if (item.tinNoiBat === true) { */
                    return (
                        <>
                            <div key={item._id} className="col-6 card">
                                <Card
                                    key='1'
                                    hoverable
                                    style={{ borderRadius: 10, height: 260, width: "100%" }}
                                    cover={<img height="100%" alt="example" src={item.image[0]} />}
                                >
                                    <p style={{ display: "none" }} data-id={item._id}></p>
                                    <div className="detail">
                                        <Link to={`thong-tin-chi-tiet/${item._id}`} >
                                            <Text className="title-text" style={ellipsis ? { width: 200 } : undefined, {  color: "#1890ff" }}
                                                ellipsis={ellipsis ? { tooltip: `${item.title}` } : false} >
                                                {item.title} </Text>
                                        </Link>
                                        <div className="progress">
                                            <div className="progress_detail_top">
                                                <p className="progress_detail_text">

                                                    {convertNumber(item.currentAmount)
                                                    } VNĐ quyên góp
                                                </p>
                                                <p className="progress_detail_number">{((item.currentAmount / item.setAmount) * 100).toFixed(3)}%</p>

                                            </div>
                                            <Progress percent={Math.floor((item.currentAmount / item.setAmount) * 100)} showInfo={Math.floor((item.currentAmount / item.setAmount) * 100) === 100 ? (true) : (false)} status={Math.floor((item.currentAmount / item.setAmount) * 100) === 100 ? ("success") : ("normal")} />

                                            <div className="progress_detail_bot">
                                                <p className="progress_detail_text">
                                                    <UsergroupAddOutlined />{item.numberOfDonations} lượt quyên góp
                                                </p>
                                                <p className="progress_detail_number">{Number(dayEnd(item.endDay))===0 ||Number(dayEnd(item.endDay))<0 ?(<>Đã hết hạn</>):(<>{dayEnd(item.endDay)} ngày còn lại</>) } </p>
                                            </div>
                                        </div>
                                        {
                                            Number(item.currentAmount) >= Number(item.setAmount) ? (<p className="complete" >Đã hoàn thành</p>) : (<p className="ant-btn ant-btn-primary " data-id={item._id} onClick={showModal}>Ủng hộ ngay</p>)

                                        }

                                    </div>
                                </Card>
                            </div>
                        </>)
                /* } */
            })
            }
            {donator != null ? (
                <>

                    <Modal title={donator[0].title} visible={isModalVisible}footer={null} onCancel={handleCancel}>
                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[current].content()}</div>
                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <>
                                    {<Button className="btn-disabled" disabled={
                                        licked ===true?(false):(true) } 
                                        type="primary" onClick={() => next()}>
                                        Tiếp theo
                                    </Button>}
                                </>
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
            ) : (
                <>
                    <Modal title={"ủng hộ"} visible={isModalVisible}  onCancel={handleCancel}>
                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[current].content()}</div>
                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={onChange, () => next()}>
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
export default HotListDonate;
