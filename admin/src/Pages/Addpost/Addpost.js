import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, InputNumber, Button, Select,message } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Firebase from '../Js/Firebase';
import donateEvensts from '../../Api/donateEvensts';
import { useHistory } from "react-router-dom";
import {Redirect} from "react-router-dom";
import axios from "axios";
import "../Addpost/Addpost.scss";
import moment from 'moment';
const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const config = {
  rules: [{ required: true, message: 'Please select time!' }],
};
const Addpost = () => {
  const islogin= JSON.parse(localStorage.getItem("user"))
  islogin ? <Redirect to="/admin/them-bai-viet" /> : <Redirect to="/" />
  const [text, setText] = useState("");
  const [img, setImg] = useState([]);
  const [Category, setCategory] = useState([]);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  let history = useHistory()
  const disabledDate = (current)=> {
    // Can not select days before today and today
    return current <  moment().add(-1,'days');
  }
  const disabledDate1 = (current)=> {
    // Can not select days before today and today
    return current <  moment().add(9,'days');
  }
  //const isLoggedIn= JSON.parse(localStorage.getItem("user"))
    
  const onFinish = (values) => {
    values['content'] = text;
    values['batdau'] = dateStart;
    values['ketthuc'] = dateEnd;
    values['img'] = img;

    console.log(values); const url = "http://localhost:4000/admin/addPost"
     axios.post(url, {
       data: values
     }, {headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true}).then(async (res) => {
      console.log(res.data.status);
      if (res.data.status === "susscess") {
        message.success(`Thêm bài viết thành công !`)
    
        setTimeout(() => {
          history.push("/them-bai-viet")
         window.location.reload()
      }, 2000)
      }
    })
    .catch((err) => {
      message.error(`Sai tài khoản hoặc mật khẩu !!!`)
    })
    //console.log(todo);
  };
  useEffect(() => {
    window.scrollTo(0,0)
    const CategoryData = async () => {
      try {
        await donateEvensts.getCategory().then((res) => {
          setCategory(res.data.CategoryDonateEvents);

        });
      } catch (error) {
        console.log("Failed to fetch brand data at: ", error);
      }
    };
    CategoryData();
  }, []);
  console.log(Category);
  const handleChange = (event, editor) => {
    const data = editor.getData();
    console.log(data);
    setText(data)
  }
  function onChangeStar(date, dateString) {

    let start = dateString

    setDateStart(start);

  }
  function onChangeEnd(date, dateString) {
    let end = dateString
    setDateEnd(end);
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
              .child('img_post/' + file.name)
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
  return (
    <>
     {islogin ? <Redirect to="/admin/them-bai-viet" /> : <Redirect to="/" />}
      <h3 className="title">Thêm bài viết</h3>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        //validateMessages={validateMessages}
        initialValues={{
          content: `${text}`
        }}>
        <Form.Item name='tieude' label="Tiêu đề bài viết " rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name='tomtat' label="Tóm tắt" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name='sotiencandonate' label="Số tiền cần ủng hộ (VNĐ)" rules={[{ required: true }]}>
          <InputNumber
          style={{width:"200px"}}
            defaultValue={10000}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}

          />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu" {...config}>
          <DatePicker disabledDate={disabledDate} onChange={onChangeStar} />
        </Form.Item>
        <Form.Item label="Ngày kết thúc" {...config}>
          <DatePicker disabledDate={disabledDate1} onChange={onChangeEnd} />
        </Form.Item>
        <Form.Item name='loaibaidang' label="Loại bài đăng" >
          <Select placeholder="Chọn loại bài đăng" >
            {Category.map((i)=>{
              return(
                <Option value={i._id}>{i.tenloai}</Option>
              )
            })}
           
           
          </Select>
        </Form.Item>
        <Form.Item name='tinnoibat' label="Tin nổi bật" >
          <Select defaultValue={0}>
                <Option value='false'>Không</Option>
                <Option value='true'>Có</Option>
           
          </Select>
        </Form.Item>
        <Form.Item label="Nội dung bài viết">
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
            {/* <figure className="image">
                        <img src="..." alt="..."/>
                    <figcaption>A caption goes here...</figcaption>
                    </figure> */}
          </CKEditor>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Thêm bài viết
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default Addpost;
