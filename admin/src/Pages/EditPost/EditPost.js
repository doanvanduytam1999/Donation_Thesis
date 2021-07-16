import React,{useState,useEffect} from 'react';
import { Select, Button, Form, Input,message, InputNumber } from 'antd';
import donateEnvents from "../../Api/donateEvensts";
//import { EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
//import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
import "./EditPost.scss";
import "../../styles/bootstrap-grid.min.css"
import { useParams } from 'react-router';
import userAdmin from '../../Api/userAdmin';
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
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
            offset: 6,
        },
    },
};
const { Option } = Select;
const EditPost = () => {
    const [Post, setPost] = useState([]);
    const [a, seta] = useState([]);
    const [form] = Form.useForm();
    let { _id } = useParams();
    useEffect(() => {
        const fetchPost = async () => {
            try {
                await donateEnvents.getPostID(_id).then((res) => {
                    if (res.data.status == "success") {
                        setPost(res.data.PostID);
                    }
                    else {
                        console.log("Loi lay du lieu");
                    }
                });
            } catch (error) {
                console.log("Failed to fetch brand data at: ", error);
            }
        };
        fetchPost();
    }, []);
    const onEdit = (values) =>{
        console.log(values);
        userAdmin.postchangeStatus(_id,values).then((res)=>{
            if (res.data.status == "success") {
                   message.success("Chỉnh sửa thành công !")
                   seta(res.data.Post);
               }
           })
    }
    console.log(a);
    return (
        <>{ Post.tieuDe !=undefined ? (<><div className="wapper_form row">
        <div className="col-10 offset-1">
            <h2 className="title_form">Chỉnh sửa bài viết</h2>
            <Form
                style={{ marginTop: "50px" }}
                {...formItemLayout}
                form={form}
                name="edit"
                onFinish={onEdit}
                initialValues={{
                    tieude: `${Post.tieuDe}`,
                    tomtat: `${Post.tomTat}`,
                    coin:`${Post.soTienDonateHieTai}`,
                    coinqg:`${Post.soTienCanDonate}`,
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="tieude"
                    label="Tiêu đề"
                >
                    <Input.TextArea readOnly />
                </Form.Item>
                <Form.Item
                    name="tomtat"
                    label="Tóm tắt"
                   
                >
                    <Input.TextArea readOnly />
                </Form.Item>
                <Form.Item
                
                    name="coin"
                    label="Số tiền hiện tại"
                   
                >
                    <InputNumber
                    style={{width:"200px"}}
                     formatter={value => ` ${value} VNĐ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                     parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    readOnly />
                </Form.Item>
                <Form.Item
                    name="coinqg"
                    label="Số tiền cần quyên góp"
                   
                >
                    <InputNumber
                     style={{width:"200px"}}
                     formatter={value => ` ${value} VNĐ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                     parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    readOnly />
                </Form.Item>
                <Form.Item name="trangThai"
                    label="Trạng thái"
                >
                    <Select style={{ width: 170 }} defaultValue={Post.trangThai}>
                        <Option value="Dừng nhận donate">Tạm ngưng</Option>
                        <Option value="Chưa đủ">Chưa đủ</Option>

                    </Select>
                </Form.Item>
                <Form.Item name="tinNoiBat"
                    label="Tin nổi bật"
                >
                    <Select style={{ width: 170 }} defaultValue={Post.tinNoiBat}>
                        <Option value={true}>Có </Option>
                        <Option value={false}>Không</Option>

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

export default EditPost;
