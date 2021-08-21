
import React, { useState, /* useEffect */ } from 'react';
import { Card, Form, Input, Button,message } from 'antd';
import { init, sendForm } from 'emailjs-com';
import "../style/bootstrap-grid.min.css";
import "../style/Contact.scss"
import { PhoneOutlined, HomeOutlined, SendOutlined } from '@ant-design/icons';
init('user_34PJkVJOxKj7nBHxWBCKl');
const MailPost = () => {
    const [/* contactNumber */, setContactNumber] = useState("000000");
    const [form] = Form.useForm();
    const generateContactNumber = () => {
        const numStr = "000000" + (Math.random() * 1000000 | 0);
        setContactNumber(numStr.substring(numStr.length - 6));
    }
    const onFinish = () => {
        message.loading("Đang gửi gmail...")
        generateContactNumber();
        sendForm('service_o3fxixm', 'template_hu34ui1', '#basic')
        .then(function(response) {
            if(response.status ===200){
               
                message.success("Gửi gmail thành công!")
                form.resetFields();
               
            }
          
        }, function(error) {
          console.log('FAILED...', error);
          message.error("Gửi gmail không  thành công:",error)
        });
    };
   //let day ="2018-04-04"
    return (

        <>
            <div className="container">
                <Card style={{ marginTop: "90px" }} bordered={true}>

                    <div className="row">
                        <div className="col-6 offset-1">
                            <div className=" contact_form">
                                <h3 className="title">Hoàn cảnh khó khăn</h3>
                                <Form
                                    style={{ width: "450px" }}
                                    name="basic"
                                    id="basic"
                                    form={form} 
                                    onFinish={onFinish}  >
                                    <Form.Item
                                        name="user_name"
                                        rules={[{ required: true, message: 'Hãy nhập tên!' }]}
                                    >
                                        <Input   name="user_name" placeholder='Họ tên' />
                                    </Form.Item>
                                    <Form.Item
                                        name="user_email"
                                        rules={[{ required: true, message: 'Hãy nhập gmail!' }]}
                                    >
                                        <Input  name="user_email" placeholder="Gmail" />
                                    </Form.Item>
                                    <Form.Item
                                        name="user_phone"
                                        rules={[{ required: true, message: 'Hãy nhập số điện thoại!' },
                                        {
                                            min:10,
                                            max:11,
                                            message: 'Số điện thoại từ 10-11 số'
                                        }]}
                                    >
                                        <Input  name="user_phone" placeholder="Số điện thoại" />
                                    </Form.Item>
                                    <Form.Item
                                        name="message"
                                        rules={[{ required: true, message: 'Hãy nhập nội dung!' }]}
                                    >
                                        <Input.TextArea  name="message" rows={5} placeholder="Nội dung" />
                                    </Form.Item>
                                  
                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                        <Button type="primary" htmlType="submit">
                                            Gửi gmail
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>

                        </div>
                        <div className="col-4 ">
                            <h3 className="title">Địa chỉ</h3>
                            <div className="contact">
                                <div>
                                    <p><HomeOutlined /> <span className="text-bold">Địa chỉ: </span>80 Cao Lỗ ,quận 8,TP.HCM </p>
                                    <p><PhoneOutlined /><span className="text-bold"> Điện thoại: </span>0849119919</p>
                                    <p><SendOutlined /> <span className="text-bold">Email: </span>quyengop@gmail.com</p>
                                </div>
                            </div>
                        </div>



                    </div>
                </Card>

            </div>

        </>
    );
}

export default MailPost;
