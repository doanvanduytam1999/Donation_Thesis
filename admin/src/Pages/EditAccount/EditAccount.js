
import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Select, Button,Form,Input } from 'antd';
import userAdmin from "../../Api/userAdmin";
import { EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
//import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
import "./EditAccount.scss";
import "../../styles/bootstrap-grid.min.css"
import { useParams } from 'react-router';
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const { Option } = Select;
const EditAccount = () => {
    const [form] = Form.useForm();
    let { _id } = useParams();
    const onEdit = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <>
            <div className="wapper_form row">
                <div className="col-10 offset-1">
                    <h2 className="title_form">Chỉnh sửa tài khoản</h2>
                    <Form
                        style={{ marginTop: "50px" }}
                        {...formItemLayout}
                        form={form}
                        name="edit"
                        onFinish={onEdit}
                        initialValues={{
                            prefix: '84',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="username"
                            label="Tài khoản"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập tên tài khoản!',
                                },
                            ]}

                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="E-mail"
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
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Xác nhận mật khẩu"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Số điện thoại"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input  style={{ width: 500 }} />
                        </Form.Item>
                        <Form.Item name="role"
                            label="Loại tài khoản"
                        >
                            <Select style={{ width: 170 }} defaultValue="Admin">
                                <Option value="Admin">Admin</Option>
                                <Option value="CTV">Cộng tác viên</Option>

                            </Select>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                Đăng kí tài khoản
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>
        </>
    );
}

export default EditAccount;
