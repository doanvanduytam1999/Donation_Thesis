import { UploadOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Button, DatePicker, Form, Input, InputNumber, message, Select, Upload } from 'antd';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import donateEvensts from '../../Api/donateEvensts';
import userAdmin from '../../Api/userAdmin';
import "../Addpost/Addpost.scss";
import Firebase from '../Js/Firebase';
const { Option } = Select;

const config = {
  rules: [{ required: true, message: 'Please select time!' }],
};


const Addpost = () => {
  const islogin = JSON.parse(localStorage.getItem("user"))
  islogin ? <Redirect to="/admin/them-bai-viet" /> : <Redirect to="/" />
  const [text, setText] = useState("");
  const [img, setImg] = useState([]);
  const [Category, setCategory] = useState([]);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  //const [fileList, setFileList] = useState([]);
  let history = useHistory()
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current < moment().add(-1, 'days');
  }
  const disabledDate1 = (current) => {
    // Can not select days before today and today
    return current < moment().add(9, 'days');
  }
  const [imageAsFile, setImageAsFile] = useState([])

  const handleImageAsFile = (e) => {
    console.log(e.file);
    const image = e.file;
    setImageAsFile(imageAsFile => [...imageAsFile, image])
  }
  const handleFireBaseUpload = e => {

    new Promise((resolve, reject) => {

      imageAsFile.forEach(element => {


        let storage = Firebase.storage().ref();
        let uploadTask = storage
          .child('thumb_nail/' + element.name)
          .put(element);

        //let uploadTask = storage().child('thumb_nail/' + element.name);

        // [START storage_upload_blob]
        // 'file' comes from the Blob or File API
        /*  uploadTask.put(element).then((snapshot) => {
           console.log('Uploaded a blob or file!');
         }); */
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
                console.log("File available at", downloadURL);
                setImg(oldImg => [...oldImg, downloadURL])
                message.success("Tải ảnh thành công!")
                resolve({
                  default: downloadURL
                });
              });
          }
        );
      });

    })
  }
  //const isLoggedIn= JSON.parse(localStorage.getItem("user"))

  const onFinish = (values) => {

    values['content'] = text;
    values['startDay'] = dateStart;
    values['endDay'] = dateEnd;

    //setFileList(values.img)


    values['image'] = img;
    console.log(values);
    userAdmin.postAddPost(values).then(async (res) => {
      //console.log(res.data.status);
      if (res.data.status === "susscess") {
        message.success(`Thêm bài viết thành công !`)

        setTimeout(() => {
          history.push("/admin/them-bai-viet")
          window.location.reload()
        }, 1000)
      }
    })
      .catch((err) => {
        message.error(`Thêm thất bại !!!`)
      })
    //const url = "http://localhost:4000/api/admin/addPost"
    /* axios.post(url, {
      data: values
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then(async (res) => {
      //console.log(res.data.status);
      if (res.data.status === "susscess") {
        message.success(`Thêm bài viết thành công !`)

        setTimeout(() => {
          history.push("/admin/them-bai-viet")
          window.location.reload()
        }, 1000)
      }
    })
      .catch((err) => {
        message.error(`Sai tài khoản hoặc mật khẩu !!!`)
      }) */
    //console.log(todo);
  };
  useEffect(() => {
    window.scrollTo(0, 0)
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

                                    //setImg(oldArray => [...oldArray, downloadURL]);

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
  /*   const beforeUpload = file => {
      setFileList(fileList.concat(file));
     
      return false;
    } */
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      console.log(e);
      return e;
    }
    console.log("ngoai if", e.fileList);
    return e && e.fileList;
  };


  const beforeUpload = e => {
    console.log(e.file.name);

    return false;
  }
  const deleteFire = (e) => {
    console.log(e.name);
    const storageRef = Firebase.storage().ref();

    // [START storage_delete_file]
    // Create a reference to the file to delete
    var desertRef = storageRef.child('thumb_nail/' + e.name);

    // Delete the file
    desertRef.delete().then(() => {
      message.success("Xoá ảnh thàng công")
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
  }
  console.log("file", imageAsFile);
  return (
    <>
      {islogin ? <Redirect to="/admin/them-bai-viet" /> : <Redirect to="/" />}
      <div className="wapper_addpost">
        <h3 className="title_addpost">Thêm bài viết</h3>
        <Form
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          //validateMessages={validateMessages}
          initialValues={{
            content: `${text}`
          }}>
          <Form.Item name='title' label="Tiêu đề bài viết " rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name='summary' label="Tóm tắt" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <div className="group_day">
            <Form.Item name='setAmount' label="Số tiền cần ủng hộ (VNĐ)" rules={[{ required: true }]}>
              <InputNumber
                style={{ width: "200px" }}
                defaultValue={10000}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}

              />
            </Form.Item>
            <Form.Item label="Ngày bắt đầu" {...config} >
              <DatePicker disabledDate={disabledDate} onChange={onChangeStar} />
            </Form.Item>
            <Form.Item label="Ngày kết thúc" {...config}>
              <DatePicker disabledDate={disabledDate1} onChange={onChangeEnd} />
            </Form.Item>
          </div>
          <div className="group_post">
            <Form.Item name='categoryPost' label="Loại bài đăng" >
              <Select style={{ width: "300px" }} placeholder="Chọn loại bài đăng" >
                {Category.map((i) => {
                  return (
                    <Option value={i._id}>{i.CategoryName}</Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item name='hotPost' label="Tin nổi bật" >
              <Select style={{ width: "300px" }}  defaultValue={'false'}>
                <Option value='false'>Không</Option>
                <Option value='true'>Có</Option>

              </Select>
            </Form.Item>
          </div>

          <Form.Item name='img' label="Ảnh thumbnail"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" listType="picture" onChange={handleImageAsFile} onRemove={deleteFire} beforeUpload={beforeUpload} action={handleImageAsFile} >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>


            </Upload>
            <Button style={{ marginTop: "10px" }} type="primary" onClick={handleFireBaseUpload}>Tải ảnh lên</Button>
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
                                    <figure className="image">
                        <img src="..." alt="..."/>
                    <figcaption>A caption goes here...</figcaption>
                    </figure>
                                </CKEditor>
          </Form.Item>
          <Form.Item style={{ display:"block", textAlign:"center"}} >
            <Button style={{marginBottom:"30px"}} type="primary" htmlType="submit">
              Thêm bài viết
            </Button>
          </Form.Item>
        </Form>

      </div>

    </>
  );
}
export default Addpost;
