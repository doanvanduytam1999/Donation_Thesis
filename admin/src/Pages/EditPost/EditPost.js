import React, { useState, useEffect } from 'react';
import { Select, Button, Form, Input, message, InputNumber, Spin } from 'antd';
import donateEnvents from "../../Api/donateEvensts";
//import { EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
//import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Firebase from '../Js/Firebase';
import Nodemailer from "nodemailer";

import "./EditPost.scss";
import "../../styles/bootstrap-grid.min.css"
import { useParams } from 'react-router';
import userAdmin from '../../Api/userAdmin';
import Axios from "axios"

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
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState("");
    const [img, setImg] = useState([]);
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
                setLoading(true)
            } catch (error) {
                console.log("Failed to fetch brand data at: ", error);
            }
        };
        fetchPost();
    }, []);

    const sendmail = () => {
        Axios.post("http://localhost:4000/api/admin/sendMail/61212ad6471340581847c604").then((res) => {
            console.log(res.data);
        })

    }
    const handleChange = (event, editor) => {
        const data = editor.getData();
        console.log(data);
        setText(data)
    }
    const onEdit = (values) => {
        //console.log(values);
        values['happinessContent'] = text;
        values['imageHappiness'] = img;
        console.log(values);
        userAdmin.postAddHappiness(_id, values).then((res) => {
            if (res.data.status == "success") {
                message.success("Chỉnh sửa thành công !")
                //seta(res.data.Post);
            }
        })
    }
    class MyUploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }
        // Starts the upload process.
        upload() {
            return this.loader.file.then(
                file =>
                    new Promise((resolve, reject) => {
                        let storage = Firebase.storage().ref();
                        let uploadTask = storage
                            .child('img_happy/' + file.name)
                            .put(file);
                        uploadTask.on(
                            Firebase.storage.TaskEvent.state_changed, // or 'state_changed'
                            function (snapshot) {
                                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                var progress =
                                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log("Upload is " + progress + "% done");
                                switch (snapshot.state) {
                                    case Firebase.storage.TaskState.PAUSED: // or 'paused'
                                        console.log("Upload is paused");
                                        break;
                                    case Firebase.storage.TaskState.RUNNING: // or 'running'
                                        console.log("Upload is running");
                                        break;
                                }
                            },
                            function (error) {
                                // A full list of error codes is available at
                                // https://firebase.google.com/docs/storage/web/handle-errors
                                // eslint-disable-next-line default-case
                                switch (error.code) {
                                    case "storage/unauthorized":
                                        reject(" User doesn't have permission to access the object");
                                        break;

                                    case "storage/canceled":
                                        reject("User canceled the upload");
                                        break;

                                    case "storage/unknown":
                                        reject(
                                            "Unknown error occurred, inspect error.serverResponse"
                                        );
                                        break;
                                }
                            },
                            function () {
                                // Upload completed successfully, now we can get the download URL
                                uploadTask.snapshot.ref
                                    .getDownloadURL()
                                    .then(function (downloadURL) {
                                        // console.log("File available at", downloadURL);

                                        setImg(oldArray => [...oldArray, downloadURL]);

                                        resolve({
                                            default: downloadURL,


                                        });
                                    });
                            }
                        );
                    })
            );
        }
    }
    console.log(Post);
    return (
        <>
            <button onClick={sendmail}> send Mail</button>
            <div className="wapper_editpost row">
                <div className="col-10 offset-1">
                    <h2 className="title_editpost">Chỉnh sửa bài viết</h2>
                    {loading ? (<>


                        <Form
                            style={{ marginTop: "50px" }}
                            {...formItemLayout}
                            form={form}
                            name="edit"
                            onFinish={onEdit}
                            initialValues={{
                                title: `${Post.title}`,
                                summary: `${Post.summary}`,
                                currentAmount: `${Post.currentAmount}`,
                                setAmount: `${Post.setAmount}`,
                                status: `${Post.status}`
                            }}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="title"
                                label="Tiêu đề"
                            >
                                <Input.TextArea readOnly />
                            </Form.Item>
                            <Form.Item
                                name="summary"
                                label="Tóm tắt"

                            >
                                <Input.TextArea readOnly />
                            </Form.Item>
                            <Form.Item

                                name="currentAmount"
                                label="Số tiền hiện tại"

                            >
                                <InputNumber
                                    style={{ width: "200px" }}
                                    formatter={value => ` ${value} VNĐ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    readOnly />
                            </Form.Item>
                            <Form.Item
                                name="setAmount"
                                label="Số tiền cần quyên góp"

                            >
                                <InputNumber
                                    style={{ width: "200px" }}
                                    formatter={value => ` ${value} VNĐ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    readOnly />
                            </Form.Item>
                            <Form.Item name="status"
                                label="Trạng thái"

                            >
                                <Select style={{ width: 170 }} >
                                    <Option disabled value="Dừng nhận donate">Tạm ngưng</Option>
                                    <Option disabled value="Chưa đủ">Chưa đủ</Option>

                                </Select>
                            </Form.Item>
                            <Form.Item label="Trao yêu thương">
                                <CKEditor
                                    name="content"
                                    editor={Editor}
                                    onReady={editor => {
                                        editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                                            return new MyUploadAdapter(loader);
                                        };
                                    }}
                                    onChange={handleChange}
                                    config={{
                                        removePlugins: ["Title"],
                                        plugin: ["Image"],
                                        toolbar: [
                                            'heading', '|', 'bold', 'italic', 'underline', 'link', '|', 'alignment', '|', 'fontBackgroundColor', 'fontColor', 'fontFamily', 'fontSize', 'hightlight', '|', 'insertTable', '|', 'imageInsert', 'mediaEmbed', 'uploadImage', 'code', 'undo', 'redo', 'horizontalLine', 'specialCharacters'
                                        ],
                                        image: {
                                            style: ['alignLeft', 'alignCenter', 'alignRight'],
                                            resizeOption: [
                                                {
                                                    name: "resizeImage: original",
                                                    label: "Original",
                                                    value: null,
                                                },
                                                {
                                                    name: "resizeImage:50",
                                                    label: "50%",
                                                    value: "50"
                                                }, {
                                                    name: "resizeImage:75",
                                                    label: "75%",
                                                    value: "75"
                                                }
                                            ],
                                            toolbar: [
                                                "imageStyle:alignLeft",
                                                "imageStyle:alignCenter",
                                                "imageStyle:alignRight",
                                                "|",
                                                "resizeImage",
                                                "|",
                                                "imageTextAlternative",

                                            ],
                                        },
                                        table: {
                                            contentToolbar: [
                                                "tableColumn",
                                                "tableRow",
                                                "mergeTableCells",
                                                "tableCellsProperties",
                                                "toggleTableCaption",
                                                "tableProperties"
                                            ]
                                        }
                                    }}
                                >
                                    <figure className="image">
                                        <img src="..." alt="..." />
                                        <figcaption>A caption goes here...</figcaption>
                                    </figure>
                                </CKEditor>
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">
                                    Chỉnh sửa
                                </Button>
                            </Form.Item>
                        </Form>

                    </>) : (<><Spin size="large" /></>)}
                </div>
            </div>
        </>
    );
}

export default EditPost;
