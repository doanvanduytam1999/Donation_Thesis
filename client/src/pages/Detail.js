import React, { useEffect, useState } from 'react';
import { Button, Progress, Table, Modal, Form, Input, Radio, Tabs, Steps, message, Checkbox, Select, Result, Badge, Image } from 'antd';
import "../style/bootstrap-grid.min.css";
import "../style/Detail.scss";
import { useParams } from "react-router-dom";
import donateEvensts from '../Api/donateEvensts';
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
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Số tiền ủng hộ',
      dataIndex: 'coin',
      key: 'coin',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'Quách Trọng Nhân',
      phone: '0849119919',
      coin: '1.000 vnđ',
      status: "Đã chuyển ",
    },
    {
        key: '2',
        name: 'Quách Trọng Nhân',
        phone: '0849119919',
        coin: '2.000 vnđ',
        status: "Đã chuyển ",
    },
    {
        key: '3',
        name: 'Quách Trọng Nhân',
        phone: '0849119919',
        coin: '5.000 vnđ',
        status: "Đã chuyển ",
    },
    {
        key: '4',
        name: 'Quách Trọng Nhân',
        phone: '0849119919',
        coin: '10.000 vnđ',
        status: "Đã chuyển ",
    },
    {
        key: '5',
        name: 'Quách Trọng Nhân',
        phone: '0849119919',
        coin: '20.000 vnđ',
        status: "Đã chuyển ",
    },
    {
        key: '6',
        name: 'Quách Trọng Nhân',
        phone: '0849119919',
        coin: '50.000 vnđ',
        status: "Chưa chuyển ",
    },
    {
        key: '7',
        name: 'Quách Trọng Nhân',
        phone: '0849119919',
        coin: '100.000 vnđ',
        status: "Đã chuyển ",
    },
    {
        key: '8',
        name: 'Quách Trọng Nhân',
        phone: '0849119919',
        coin: '200.000 vnđ',
        status: "Chưa chuyển ",
    },
    {
        key: '9',
        name: 'Quách Trọng Nhân',
        phone: '0849119919',
        coin: '500.000 vnđ',
        status: "Chưa chuyển ",
    },
  ];

const Detail = () => {
    let { _id } = useParams();
    const [Donate, setDonate] = useState([]);
    const [img, setImg] = useState([]);
    const [checked, setChecked] = React.useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [current, setCurrent] = React.useState(0);
    
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
        const fetchData = async () => {
            try {
                await donateEvensts.get(_id).then((res) => {
                    res.data.DonateEnvent.soTienCanDonate = res.data.DonateEnvent.soTienCanDonate.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    setDonate(res.data.DonateEnvent);
                    setImg(res.data.DonateEnvent.hinhanh)
                });
            } catch (error) {
                console.log("Failed to fetch Donate data at: ", error);
            }
        };
        fetchData();
    }, []);

    const phoneSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="84">+84</Option>
                <Option value="85">+85</Option>
            </Select>
        </Form.Item>
    );
    const [value, setValue] = useState(1);
    const onChange = e => {
        console.log('radio checked', e.target.value);
        let a = e.target.value;
        setValue(a)
        console.log("dfd");

    };
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
                                        <TextArea placeholder="Lời nhắc (không bắt buộc)" autoSize={{ minRows: 3}}  />
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
                        <p>Số tiền thanh toán 100.000đ</p>
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
    const convertNumber = (x)=>{
        return   x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    console.log(typeof(Donate.soTienCanDonate));
    console.log(Donate);
    return (
        <>
            <section className="detail_header">
                <div className="container">
                    <div className="">
                        <div className="introduce">
                            <h3 className="title">{Donate.tieude}</h3>
                            <h3 style={{ fontSize: "25px", fontFamily: "inherit" }}> 
                                Số tiền cần quyên góp {Donate.soTienCanDonate}VNĐ </h3>
                      
                           
                          
                            <div class="fb-like" data-href="https://momo.vn/cong-dong/chung-tay-gay-quy-dung-truong-moi-tang-25-em-hoc-sinh-ban-huoi-chua" data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>
                            <p style={{ fontSize: "20px" }}> {Donate.noidung}</p>
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
                                        <p style={{ fontSize: "26px", fontWeight: "bold" }}>Câu chuyện</p>
                                        <p style={{ fontWeight: "bold" }}>Gian nan “gieo chữ” trên non</p>

                                        <p>Bản Sín Chải C là bản vùng cao khó khăn của xã Pa Vệ Sử, huyện Mường Tè, tỉnh Lai Châu. Đường lên đến bản khó đi, đường gồ ghề, dốc cao, sạt lở nhiều và nhiều đá tảng. Thế nên bà con Dân tộc La Hủ nơi đây sống cuộc sống khép kín, họ dè dặt với người lạ.</p>
                                        <p>
                                            Giữa miên man miền đá của con đường độc đạo cách từ trung tâm xã Pa Vệ Sử hơn 30km đến với điểm trường Sín Chải C, tiếng đọc chữ cất lên trong điểm trường tiểu học của 7 đứa trẻ người La Hủ, dù chưa tròn vành tiếng phổ thông nhưng đủ phá vỡ sự im lặng của miền cao nguyên lạnh ngắt xám màu đá.</p>
                                        <img width="100%" height="400px" src="../images/donate/detail/3.jpg" alt="3"></img>
                                        <p style={{ textAlign: "center" }}>
                                            <em>
                                                Điểm trường Sín Chải C (xã Pa Vệ Sử, huyện Mường Tè, tỉnh Lai Châu) nằm trên một mỏm đồi dưới chân đỉnh núi Pu Si Lung.
                                </em>
                                        </p>
                                        <p>Điểm trường Sín Chải C nằm cheo leo trên triền đồi núi Pu Si Lung. Cơ sở vật chất tại điểm trường đơn sơ và đã xuống cấp nghiêm trọng, lớp học được các thầy chắp vá và gia cố bằng bạt quây xung quanh lớp cho khỏi mưa khỏi rét. Vách tường ván gỗ cong vênh, tấm mối mọt, tấm hỏng, không tấm nào lành lặn. Mùa mưa lầy lội, lớp học cũng thiếu vững chãi hơn với từng đợt gió thổi mạnh, sàn lớp học bằng đất cũng vì thế mà ướt bùn dưới chân. Mùa Đông gió lạnh rít từng cơn qua khe hở, dù có bạt che chắn bên nhưng trong lớp học vẫn rét buốt.
                                </p>
                                        <p>
                                            <img width="100%" height="400px" src="../images/donate/detail/2.jpg" alt="2"></img></p>
                                        <p style={{ textAlign: "center" }}>
                                            <em>
                                                Cơ sở vật chất tuềnh toàng của điểm trường Sín Chải C, lớp học thưng gỗ, mái tôn hưng hỏng, nền đất lầy lội mỗi mùa mưa...
                                </em>
                                        </p>
                                        <p>
                                            <img width="100%" height="400px" src="../images/donate/detail/1.jpg" alt="1"></img></p>
                                        <p style={{ textAlign: "center" }}>
                                            <em>
                                                Điểm trường chỉ có vỏn vẹn 7 học sinh, vật chất nghèo nàn, nhưng thầy trò Sín Chải C vẫn kiên cường bám trường, bám lớp “gieo chữ, gặt tri thức”
                                </em>
                                        </p>
                                Chung tay gây quỹ để con chữ “nảy mầm”

                                Điều kiện kinh tế của người dân bản Sín Chải C vô cùng khó khăn, hoàn toàn dựa vào việc làm nương rẫy kiếm sống, thì không biết đến bao giờ ước mơ trường mới của thầy trò nơi đây mới trở thành hiện thực được. Vì vậy, hành trình tìm kiếm con chữ của 7 học sinh điểm trường Sín Chải C cần nhiều hơn sự hỗ trợ từ cộng đồng.

                                Với mong muốn xây mới cho các em nhỏ nơi đây một môi trường học tập khang trang, giúp các em được vui tươi cắp sách đi học, tiếp tục dựng xây tương lai của mình, Ví MoMo phối hợp cùng dự án Sức Mạnh 2000 và Trung tâm tình nguyện Quốc Gia đã lên kế hoạch xây dựng 01 lớp học và 01 nhà công vụ chắc chắn cho điểm trường. Món quà này sẽ giúp thầy trò Sín Chải C có thêm niềm tin, nghị lực vượt qua những khó khăn trong, kiên cường bám trường theo đuổi tri thức. Hãy chung tay cùng MoMo quyên góp đủ giúp các em học sinh yên tâm học hành trong một ngôi trường kiên cố!

                                *Sau khi hoàn thành chiến dịch kêu gọi quyên góp, MoMo sẽ tiến hành gửi toàn bộ số tiền 230 triệu đồng gây quỹ gửi tới Trung tâm Tình nguyện Quốc gia để xây thêm 01 lớp học 01 nhà công vụ cho Điểm trường Sín Chải C. Chúng tôi sẽ cập nhật thêm thông tin về tiến độ dự án đến quý vị trong thời gian sớm nhất.
                            </TabPane>
                                    <TabPane tab="Nhà hảo tâm" key="3">
                                    <Table columns={columns} dataSource={data} />
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
