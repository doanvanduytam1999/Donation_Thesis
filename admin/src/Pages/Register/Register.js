import React from 'react';
import { Form, Input,  Select, Button,message} from 'antd';
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/auth";


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
const Register = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        dispatch(register(values)).then(()=>{
            console.log("dăng kí");
            message.success("Thêm tài khoản thành công !")

        })
        .catch(()=>{
            console.log("dang ki that bai");
        })
    };
    return (
        <>
            <h2 style={{ textAlign: "center", marginTop: "100px" }}>Thêm tài khoản</h2>
            <Form
                style={{ marginTop: "50px" }}
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
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
                <Form.Item name="role"
                    label="Loại tài khoản"
                >
                    <Select style={{ width: 170 }} defaultValue="Admin">
                        <Option value="Super Admin">Super Admin</Option>
                        <Option value="Admin">Admin</Option>
                        <Option value="CTV">Cộng tác viên</Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                       Thêm tài khoản
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Register;
