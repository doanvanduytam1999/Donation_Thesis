import React from 'react';
import { Form, Input } from 'antd';
//import { LockOutlined } from '@ant-design/icons';
import '../style/Profile.scss';

const ProfileUser = () => {

    const user = JSON.parse(localStorage.getItem("user"))
    //console.log(user.phone);    
    return (
        <>
            <div className="row">
                <div className="col">
                    <div className="profile">
                        {user.googleID ? (<>
                            <Form
                                layout="vertical"
                                //name="basic"
                                className="profile_form"
                                initialValues={{ username: `${user.username}`, fullName: `${user.fullName}`, email: `${user.email}`, id: `${user._id}` }}>
                                <Form.Item
                                    name="id"
                                    hidden>
                                    <Input readOnly autoComplete={"off"} />
                                </Form.Item>
                                <Form.Item label="Họ và tên:"
                                    name="fullName">
                                    <Input readOnly autoComplete={"off"} />
                                </Form.Item>
                                <Form.Item
                                    label="Email:"
                                    name="email">
                                    <Input readOnly autoComplete={"off"} />
                                </Form.Item>
                            </Form>
                        </>) : (<>
                            <Form
                                layout="vertical"
                                //name="basic"
                                className="profile_form"
                                initialValues={{ username: `${user.username}`, fullName: `${user.fullName}`, email: `${user.email}`, id: `${user._id}` }}>
                                <Form.Item
                                    name="id"
                                    hidden>
                                    <Input readOnly autoComplete={"off"} />
                                </Form.Item>
                                <Form.Item
                                    label="Tên tài khoản:"
                                    name="username">
                                    <Input readOnly autoComplete={"off"} />
                                </Form.Item>
                                <Form.Item label="Họ và tên:"
                                    name="fullName">
                                    <Input readOnly autoComplete={"off"} />
                                </Form.Item>
                                <Form.Item
                                    label="Email:"
                                    name="email">
                                    <Input readOnly autoComplete={"off"} />
                                </Form.Item>
                            </Form>

                        </>)}

                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileUser;
