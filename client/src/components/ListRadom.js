
import { Typography } from 'antd';
import React, { useState } from 'react';
import "../style/bootstrap-grid.min.css";
import "../style/Home.scss";
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
