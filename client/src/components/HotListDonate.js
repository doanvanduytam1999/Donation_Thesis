import "../style/Home.scss";
import "../style/bootstrap-grid.min.css";
import React, {  useState } from 'react';
import { Card, Progress, Typography, Modal, Form, Input, Button, Steps, message, Checkbox, Select, Result, InputNumber } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import PayPal from "../components/Paypal"
import {  useSelector } from "react-redux";
//import { logout } from "../redux/actions/auth.js";

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
    const [licked, /* setLicked */] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [value, setValue] = useState(1);
    const { isLoggedIn } = useSelector(state => state.login);
    const data = useSelector(state => state.login.user);

    console.log(data);
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




    };
    const convertNumber = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    const handleOk = () => {
        setIsModalVisible(false);
        setCurrent(0)
        window.location.reload();
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        window.location.reload();
    };
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
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
                        {isLoggedIn === false ? (
                            <>
                                <Form

                                    {...layout}
                                    name="basic"
                                    initialValues={{ prefix: "84", coin: "10000", id: `${id}` }}
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
                                                    onChange={onChange}
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
                                                ]}
                                                name="coin">
                                                <InputNumber
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
                        ) : (
                            <>
                                {data !== [] ? (
                                    <>
                                        <Form

                                            {...layout}
                                            name="basic"
                                            initialValues={{ prefix: "84", coin: "10000", id: `${id}`,name:`${data.username}`, phone:"0849119919" }}
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
                                                            onChange={onChange}
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
                                                        ]}
                                                        name="coin">
                                                        <InputNumber
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
                        <p>Số tiền ủng hộ: {convertNumber(coin.coin)}</p>
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

    return (
        <>
            {props.listDonates.map((item) => {
                if (item.tinNoiBat === true) {
                    return (
                        <>
                            <div key='1' className="col-6 card">
                                <Card
                                    key='1'
                                    hoverable
                                    style={{ borderRadius: 10, height: 260, width: "100%" }}
                                    cover={<img height="100%" alt="example" src={item.hinhAnh[0]} />}
                                >
                                    <p style={{ display: "none" }} data-id={item._id}></p>
                                    <div className="detail">
                                        <Link to={`thong-tin-chi-tiet/${item._id}`} >
                                            <Text style={ellipsis ? { width: 200 } : undefined, { fontWeight: "500", fontSize: "18px", color: "#1890ff" }}
                                                ellipsis={ellipsis ? { tooltip: `${item.tieuDe}` } : false} >
                                                {item.tieuDe} </Text>
                                        </Link>
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
                                        <p className="ant-btn ant-btn-primary " data-id={item._id} onClick={showModal}>Ủng hộ ngay</p>
                                    </div>
                                </Card>
                            </div>
                        </>)
                }
            })
            }
            {donator != null ? (
                <>

                    <Modal title={donator[0].tieuDe} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[current].content()}</div>
                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <>
                                    {licked === false ? (<> <Button type="primary" onClick={() => next()}>
                                        Tiếp theo ffd
                                    </Button></>) : (
                                        <>
                                            <Button type="primary" onClick={() => next()}>
                                                Tiếp theo
                                            </Button>
                                        </>
                                    )}

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
                    <Modal title={"ủng hộ"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
