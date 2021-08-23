import React from 'react';
import { Form, Input,  Select, Button,message} from 'antd';
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/auth";
import "./Register.scss"
import { useHistory } from 'react-router-dom';

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
    const history = useHistory()
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        dispatch(register(values)).then((res)=>{
           
            message.error(res)

        })
        
    };
    return (
        <>
        <div className="wapper_register row">
        <div className="col-10 offset-1">
            <h2 className="title_register">Thêm tài khoản</h2>
            <Form
                style={{ marginTop: "50px" }}
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    prefix: '84',role:`${'CTV'}`
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
                        {
                            min:3,
                            max:16,
                            message: 'Tên tài khoản phải từ 3-16 kí tự !',
                        }
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
                            message: 'Hãy nhập E-mail',
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
                        {
                            min:8,
                            max:16,
                            message: 'Mật khẩu phải từ 8-16 kí tự !',
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="passwordConfirm"
                    label="Xác nhận mật khẩu"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Hãy xác nhận mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Hai mật khẩu không giống nhau!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="role"
                    label="Loại tài khoản"
                >
                    <Select name="role" style={{ width: 170 }} defaultValue="CTV">
                        <Option value="Manager">Manager</Option>
                       
                        <Option value="CTV">Cộng tác viên</Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                       Thêm tài khoản
                    </Button>
                </Form.Item>
            </Form>
       </div>
       </div>
        </>
    );
}

export default Register;
