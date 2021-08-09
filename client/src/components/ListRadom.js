
import React, { useState, /* useEffect */ } from 'react';
import { Card, Progress, Typography, Badge, Input } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import "../style/Home.scss";
import "../style/bootstrap-grid.min.css";
const ListRadom = (props) => {
    const [list, /* setlist */] = useState([props.listDonate]);
    const { Text } = Typography;
    const [ellipsis, /* setEllipsis */] = React.useState(true);
    const dayEnd = (day) => {
        const currentDay = new Date();
        let endtDay = Date.parse(day)
        let ngayconlai = (endtDay - currentDay.getTime()) / 1000;
        return Math.floor((ngayconlai / 60) / 60 / 24)

    }
    console.log(list);
    return (
        <>  

             
        </>
    );
}

export default ListRadom;
