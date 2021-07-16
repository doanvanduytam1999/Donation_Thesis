
import React, { useEffect, useState } from 'react';
import { Select, Button, Form, Input,message } from 'antd';
import userAdmin from "../../Api/userAdmin";
//import { EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
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
const EditAccount = (props) => {
    const [Accout, setAccout] = useState([]);
    const [form] = Form.useForm();
    let { _id } = useParams();
    useEffect(() => {
        const fetchListUser = async () => {
            try {
                await userAdmin.getUserAdmin(_id).then((res) => {
                    if (res.data.status == "success") {
                        setAccout(res.data.UserAdmin);
                    }
                    else {
                        console.log("Loi lay du lieu");
                    }
                });
            } catch (error) {
                console.log("Failed to fetch brand data at: ", error);
            }
        };
        fetchListUser();
    }, []);
    console.log(Accout);

    const onEdit = (values) => {
        console.log('Received values of form: ', values);
        userAdmin.postEditUserAdmin(_id,values).then((res)=>{
         if (res.data.status == "success") {
                message.success("Chỉnh sửa thành công !")
                
            }
        })
    };
    
    return (
        <>{ Accout.username !=undefined ? (<><div className="wapper_form row">
        <div className="col-10 offset-1">
            <h2 className="title_form">Chỉnh sửa tài khoản</h2>
            <Form
                style={{ marginTop: "50px" }}
                {...formItemLayout}
                form={form}
                name="edit"
                onFinish={onEdit}
                initialValues={{
                    username: `${Accout.username}`,
                    email: `${Accout.email}`,

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
                    <Input readOnly />
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
                       Chỉnh sửa
                    </Button>
                </Form.Item>
            </Form>
        </div>

    </div></>) :(<>



    </>)}
                
      

        </>
    );
}

export default EditAccount;
