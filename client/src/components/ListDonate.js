import { UsergroupAddOutlined } from '@ant-design/icons';
import { Badge, Card, Input, Progress, Typography } from 'antd';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../style/bootstrap-grid.min.css";
import "../style/Home.scss";
const { Search } = Input;
const ListDonate = (props) => {

    const [list, /* setlist */] = useState([props.listDonate]);
    const { Text } = Typography;
    const [ellipsis, /* setEllipsis */] = React.useState(true);
    const [visible, /* setVisible */] = useState(9);
    const [searchTerm, setSearchTerm] = useState("");


  /*   const convertNumber = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } */
    const onSearch = (value) => {
        setSearchTerm(value.target.value);
        console.log(value.target.value);
    }
    console.log(list);
    const dayEnd = (day) => {
        const currentDay = new Date();
        let endtDay = Date.parse(day)
        let ngayconlai = (endtDay - currentDay.getTime()) / 1000;
        return Math.floor((ngayconlai / 60) / 60 / 24)

    }
    /*  useEffect(() => {
         const results = people.filter(person =>
           person.toLowerCase().includes(searchTerm)
         );
         setSearchResults(results);
       }, [searchTerm]); */
    const results = !searchTerm
        ? props.listDonate
        : props.listDonate.filter(list =>
            list.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
    //setSearchResults(results)
    console.log(searchTerm);
    return (
        <>
            <Search className="input-search" type="text"
                placeholder="Tìm kiếm"
                value={searchTerm}
                onChange={onSearch} style={{ width: 800 }}
            />
            {results.slice(0, visible).map((item) => {
                return (
                    <>
                        <div className="col-4 " >
                            <Badge count={item.categoryName}>
                                <Link to={`thong-tin-chi-tiet/${item._id}`} >
                                    <Card className="margin-top"
                                        style={{ borderRadius: 10, height: 460 }}
                                        hoverable
                                        cover={<img alt="example" src={item.image[0]} />}>
                                        <Text className="title-text" style={ellipsis ? { width: 250 } : undefined}
                                            ellipsis={ellipsis ? { tooltip: `${item.title}` } : false} >
                                            {item.title} </Text>
                                        <Text className="title-tomtat"
                                            style={ellipsis ? { width: 250 } : undefined}
                                            ellipsis={ellipsis ? { tooltip: `${item.summary}` } : false} >
                                            {item.summary}
                                        </Text>
                                        {
                                            item.status === "Dừng nhận donate" ? (<><p className="tamngung" >Tạm ngưng</p></>) : (<>
                                                <div className="progress">
                                                    <div className="progress_detail_top">
                                                        <p className="progress_detail_text">
                                                            {/* convertNumber */(item.currentAmount)} vnđ quyên góp
                                                        </p>
                                                        <p className="progress_detail_number">
                                                            {Math.floor((item.currentAmount / item.setAmount) * 100) === 100 ? (
                                                                <p>Hoàn thành</p>
                                                            ) : (
                                                                <>
                                                                    <p className="progress_detail_number">{((item.currentAmount / item.setAmount) * 100).toFixed(3)}%</p>
                                                                </>
                                                            )}
                                                        </p>
                                                    </div>
                                                    <Progress percent={Math.floor((item.currentAmount / item.setAmount) * 100)} showInfo={Math.floor((item.currentAmount / item.setAmount) * 100) === 100 ? (true) : (false)} status={Math.floor((item.currentAmount / item.setAmount) * 100) === 100 ? ("success") : ("normal")} />
                                                    <div className="progress_detail_bot">
                                                        <p className="progress_detail_text">
                                                            <UsergroupAddOutlined /> {item.numberOfDonations} lượt quyên góp
                                                        </p>
                                                        <p className="progress_detail_number">{Number(dayEnd(item.endDay))===0 ||Number(dayEnd(item.endDay))<0 ?(<>Đã hết hạn</>):(<> {dayEnd(item.endDay)} ngày còn lại</>) } </p>
                                                    </div>
                                                </div>
                                            </>)
                                        }
                                    </Card>

                                </Link>
                            </Badge>
                        </div>
                    </>
                )

            })}

        </>
    );
}

export default ListDonate;
