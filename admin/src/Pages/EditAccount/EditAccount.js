
import React, { useEffect, useState } from 'react';
import { Select, Button, Form, Input, message } from 'antd';
import userAdmin from "../../Api/userAdmin";
//import { EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
//import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
import "./EditAccount.scss";
import "../../styles/bootstrap-grid.min.css"
import { useParams, useHistory } from 'react-router';
import axios from 'axios';
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
    const history = useHistory();
    const [Accout, setAccout] = useState([]);
    const [form] = Form.useForm();
    const [Error, setError] = useState('');
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
        userAdmin.putEditUserAdmin(_id, values).then((res) => {
            if (res.data.status === "success") {
                message.success("Chỉnh sửa thành công !")
                setTimeout(() => {
                    history.push("/admin/danh-sach-tai-khoan-admin")
                }, 1000)
            }
        })
            .catch((err) => {
                //console.log(err.response.data.error);
                setError(err.response.data.error)
            })
    };
    const resetPass = () => {
        //console.log(_id);
        const values = _id;
       /*  let url="http://localhost:4000/api/admin/resetPassWord";
        axios.post(url,values,{
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }).then((res) => {
            if (res.data.status === "success")
                message.success("Mật khẩu mới là:", res.data.newPassword)

        }) */
        let value = {id: _id};
        userAdmin.postResetPass(value).then((res) => {
            if (res.data.status === "success")
               alert(`Mật khẩu mới là:${res.data.newPassword}`)
            

        })
    }

    return (
        <>{Accout.username != undefined ? (<><div className="wapper_form row">
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
                        role: `${Accout.role}`

                    }}
                    scrollToFirstError
                >
                    <p style={{ color: "red" }}> {Error}</p>
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
                        <Select style={{ width: 170 }}>
                            <Option value="Manager">Manager</Option>
                            <Option value="CTV">Cộng tác viên</Option>

                        </Select>
                        <Button style={{ marginLeft: "30px" }} onClick={resetPass}>Reset mật khẩu</Button>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Chỉnh sửa
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div></>) : (<>



        </>)}



        </>
    );
}

export default EditAccount;
