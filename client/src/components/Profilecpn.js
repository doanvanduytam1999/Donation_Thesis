import React, { useState } from 'react';
import { Avatar,Upload,  Form, Input, Button} from 'antd';
import {  UserOutlined, PlusOutlined } from '@ant-design/icons';
import '../style/Profile.scss';

const Profile = () => {
    const [file, setFile] = useState("");
    const normFile = (e) => {

        if (Array.isArray(e)) {
            setFile(e.fileList[0].name)

        }
        return e && e.fileList;

    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }} >Tải ảnh đại diện</div>
        </div>
    );
    const user= JSON.parse(localStorage.getItem("user"))
    console.log(user.phone);
    return (
        <>
            <div className="row">
                <div className="col-4">
                    <div className="col-3 offset-1">
                        <Upload style={{ textAlign: "center" }} onChange={normFile} name="avatar" action="/upload.do" listType="picture-card">
                            <br></br>
                            {file ? <><Avatar shape="square" size={200} icon={<UserOutlined />} /></> : uploadButton}
                        </Upload>

                        <br></br>
                        <Button className="btn-update-img">Cập nhật</Button>
                    </div>

                </div>
                <div className="col-8">
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ username:`${user.username}`,name:`${user.hovaten}`,phone:`${user.phone}` }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <p>Tên tài khoản:</p>
                        <Form.Item
                            name="username"
                        >
                            <Input autoComplete={"off"} />
                        </Form.Item>
                        <p>Họ và tên:</p>
                        <Form.Item
                            name="name"
                        >
                            <Input autoComplete={"off"} />
                        </Form.Item>
                        <p>Số điện thoại:</p>
                        <Form.Item
                            name="phone"
                        >
                            <Input autoComplete={"off"} />
                        </Form.Item>
                        <p>Gmail:</p>
                        <Form.Item
                            name="gmail"
                        >
                            <Input autoComplete={"off"} />
                        </Form.Item>
                        <p>Địa chỉ:</p>
                        <Form.Item
                            name="adress"
                        >
                            <Input autoComplete={"off"} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>


        </>

    );
}

export default Profile;
