import React from 'react';
import { Card, Progress, Typography, Badge, } from 'antd';
import {  UsergroupAddOutlined } from '@ant-design/icons';

import { Link } from "react-router-dom";
import "../style/Home.scss";
import "../style/bootstrap-grid.min.css";
const ListDonate = (props) => {
    const { Text } = Typography;
    const [ellipsis, /* setEllipsis */] = React.useState(true);
    const convertNumber = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    const dayEnd = (day) => {
        const currentDay = new Date();
        let endtDay = Date.parse(day)
        let ngayconlai = (endtDay - currentDay.getTime()) / 1000;
        return Math.floor((ngayconlai / 60) / 60 / 24)

    }
    return (
        <>
            {props.listDonate.map((item) => {
                return (
                    <>
                        <div className="col-4 " >
                            <Badge count={item.tenLoai}>
                                <Link to={`thong-tin-chi-tiet/${item._id}`} >

                                    <Card className="margin-top"
                                        style={{ borderRadius: 10, height: 460 }}
                                        hoverable
                                        cover={<img alt="example" src={item.hinhAnh[0]} />}>
                                        <Text className="title-text" style={ellipsis ? { width: 250 } : undefined}
                                            ellipsis={ellipsis ? { tooltip: 'Xem chi tiết !' } : false} >
                                            {item.tieuDe} </Text>
                                        <Text className="title-tomtat"
                                            style={ellipsis ? { width: 250 } : undefined}
                                            ellipsis={ellipsis ? { tooltip: 'Xem chi tiết !' } : false} >
                                            {item.tomTat}
                                        </Text>
                                        <div className="progress">
                                            <div className="progress_detail_top">
                                                <p className="progress_detail_text">
                                                    {convertNumber(item.soTienDonateHieTai)} vnđ quyên góp
                                                </p>
                                                <p className="progress_detail_number">

                                                    {Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100) === 100 ? (
                                                        <p>Hoàn thành</p>
                                                    ) : (
                                                        <>
                                                             <p className="progress_detail_number">{((item.soTienDonateHieTai / item.soTienCanDonate) * 100).toFixed(3)}%</p>

                                                        </>

                                                    )}

                                                </p>
                                            </div>

                                            <Progress percent={Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100)} showInfo={Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100) === 100 ? (true) : (false)} status={Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100) === 100 ? ("success") : ("normal")} />
                                            <div className="progress_detail_bot">
                                                <p className="progress_detail_text">
                                                    <UsergroupAddOutlined /> {item.luotDonate} lượt quyên góp
                                                </p>
                                                <p className="progress_detail_number">{dayEnd(item.ngayKetThuc)} ngày còn lại</p>
                                            </div>
                                        </div>


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
