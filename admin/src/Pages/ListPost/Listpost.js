import React,{ useEffect, useState }  from 'react';
import donateEvensts from '../../Api/donateEvensts';
import { Table  } from 'antd';



const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const Listpost = () => {
    const [listDonate, setListDonate] = useState([]);
    
    useEffect(() => {
        const fetchdonatesData = async () => {
            try {
                await donateEvensts.getAll().then((res) => {
                   
                   
                    setListDonate(res.data.DonateEnvents);
                    
                });
            } catch (error) {
                console.log("Failed to fetch brand data at: ", error);
            }
        };
        fetchdonatesData();
    }, []);
  
    const columns = [
        {
          title: 'Tiêu đề bài viết',
          dataIndex: 'tieuDe',
          key: 'tieude',
        },
        {
          title: 'Ngày bắt đầu',
          dataIndex: 'ngayBatSau',
          key: 'ngayBatSau',
        },
        {
          title: 'Ngày kết thúc',
          dataIndex: 'ngayKetThuc',
          key: 'ngayKetThuc',
        },
        {
            title: 'Số tiền cần ủng hộ(VNĐ)',
            dataIndex: 'soTienCanDonate',
            key: 'soTienCanDonate',
          },
          {
            title: 'Số tiền đã quyên góp được(VNĐ)',
            dataIndex: 'soTienDonateHieTai',
            key: 'soTienDonateHieTai',
          },
          {
            title: 'Trạng thai',
            dataIndex: 'trangThai',
            key: 'trangThai',
          },
      ];
    return (
       <>
       <div style={{textAlign:"center"}}>
       <Table {...layout} dataSource={listDonate} columns={columns} />;
       </div>
      

       </>
    );
}

export default Listpost;
