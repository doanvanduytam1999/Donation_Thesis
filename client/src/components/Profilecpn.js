import React, { /* useState */ } from 'react';
import { /* Avatar,Upload,  */ Form, Input, Button, message} from 'antd';
//import { /*  UserOutlined, */ PlusOutlined } from '@ant-design/icons';
import '../style/Profile.scss';
import donateEvensts from '../Api/donateEvensts';
const Profile = () => {
    //const [/* file */, setFile] = useState("");
    /* const normFile = (e) => {

        if (Array.isArray(e)) {
            setFile(e.fileList[0].name)

        }
        return e && e.fileList;

    }; */
    const onFinish = (values) => {
        console.log('Success:', values);    
        donateEvensts.putUpdateProfile(values).then((res)=>{
        if(res.data.status ==="success"){
            message.success("Cập nhật thông tin thành công !")
            localStorage.setItem("user", JSON.stringify(res.data.User));
            setTimeout(()=>{
                window.location.reload();
            },1000)
        }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
   /*  const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }} >Tải ảnh đại diện</div>
        </div>
    ); */
    const user= JSON.parse(localStorage.getItem("user"))
    //console.log(user.phone);    
    return (
        <>
            <div className="row">
                <div className="col-4">
                 

                </div>
                <div className="col-8">
                    <div className="profile">

                    
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ username:`${user.username}`,fullName:`${user.fullName}`,email:`${user.email}`,id :`${user._id}` }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                          <Form.Item
                            name="id"
                            hidden
                        >
                            <Input readOnly autoComplete={"off"} />
                        </Form.Item>
                        <p>Tên tài khoản:</p>
                        <Form.Item
                            name="username"
                        >
                            <Input readOnly autoComplete={"off"} />
                        </Form.Item>
                        <p>Họ và tên:</p>
                        <Form.Item
                            name="fullName"
                        >
                            <Input autoComplete={"off"} />
                        </Form.Item>
                        <p>Gmail:</p>
                        <Form.Item
                            name="email"
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
            </div>


        </>

    );
}

export default Profile;
