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
                                        <Text style={ellipsis ? { width: 250 } : undefined, { fontWeight: "500", fontSize: "18px" }}
                                            ellipsis={ellipsis ? { tooltip: 'Xem chi tiết !' } : false} >
                                            {item.tieuDe} </Text>
                                        <Text
                                            style={ellipsis ? { width: 250 } : undefined,{fontFamily: "cursive"}}
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
                                                            <p>
                                                                {Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100)}%
                                                            </p>

                                                        </>

                                                    )}

                                                </p>
                                            </div>

                                            <Progress percent={Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100)} showInfo={Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100) === 100 ? (true) : (false)} status={Math.floor((item.soTienDonateHieTai / item.soTienCanDonate) * 100) === 100 ? ("success") : ("normal")} />
                                            <div className="progress_detail_bot">
                                                <p className="progress_detail_text">
                                                    <UsergroupAddOutlined />lượt quyên góp
                                                </p>
                                                <p className="progress_detail_number">ngày còn lại</p>
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
