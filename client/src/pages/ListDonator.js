import React, { useEffect, useState } from 'react';
import { Table,  Image} from 'antd';
import "../style/bootstrap-grid.min.css";
import "../style/Detail.scss";
import { useParams } from "react-router-dom";
import donateEvensts from '../Api/donateEvensts';
import { useSelector } from "react-redux";



const ListDonator = () => {
    let { _id } = useParams();
    const [Donate, setDonate] = useState([]);
    const [DonateID, setDonateID] = useState([]);
    //const { isLoggedIn } = useSelector(state => state.login);
    const [img, setImg] = useState([]);

    const [licked, setLicked] = React.useState(false);

    const [AllDonator, setAllDonator] = useState([]);
    const [AllDonates, setAllDonates] = useState([]);
   
    const [ReleatedPost, setReleatedPost] = useState([]);
    const [loading, setloading] = useState(false);
    const data = useSelector(state => state.login.user);
    const idCategoryPost = Donate.categoryPost
    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchData = async () => {
            try {
                await donateEvensts.get(_id).then((res) => {
                    setDonateID(res.data.DonateEnvent)
                    //res.data.DonateEnvent.soTienCanDonate = res.data.DonateEnvent.soTienCanDonate.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    setDonate(res.data.DonateEnvent);
                    //console.log('ádas',res.data.DonateEnvent);
                    setImg(res.data.DonateEnvent.image)

                });
            } catch (error) {
                console.log("Failed to fetch Donate data at: ", error);
            }
        };
        const fetchdonatesData = async () => {
            try {
                await donateEvensts.getAll().then((res) => {
                    setAllDonates(res.data.DonateEnvents);

                });

            } catch (error) {
                console.log("Failed to fetch brand data at: ", error);
            }
        };
        const fetchAllDonater = async () => {
            try {
                await donateEvensts.getAllDonater(_id).then((res) => {
                    if (res.data.status === "success") {
                       
                        setAllDonator(res.data.AllDonater)
                    }

                })
            } catch (error) {
                console.log("Failed to fetch AllDonator data at: ", error);
            }
        }

        fetchdonatesData();
        fetchData();
        fetchAllDonater();
        //radomDonateEvent()
    }, [licked, _id]);
    console.log(idCategoryPost);
    console.log(Donate);
    useEffect(() => {

        window.scrollTo(0, 0)
        const fetchCategoryPost = async () => {
            try {
                await donateEvensts.getPostCategory(_id).then((res) => {
                    setReleatedPost(res.data.ReleatedPost)
                });
                setloading(true)
            } catch (error) {
                console.log("Failed to fetch Donate data at: ", error);
            }
        };
        fetchCategoryPost();
    }, [idCategoryPost]);

    console.log(ReleatedPost);
  
    
    const convertNumber = (x) => {
        if (Donate === []) {
            if (Donate.setAmount) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        }
        else {
            if (Donate.setAmount) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        }

    }
   
    const columns = [
        {
            title: 'Tên ',
            dataIndex: 'fullName',
            key: 'fullName',

        },
        {
            title: 'Số tiền ủng hộ (VNĐ)',
            dataIndex: 'amountToDonate',
            key: 'amountToDonate',
            render: text => (
                <>
                    {convertNumber(text)} đ
                </>
            ),
        }
    ];
   
    return (
        <>
         <section className="detail_header">
                <div className="container">
                    <div className="">
                        <div className="introduce">
                            <h3 className="title">{Donate.title}</h3>
                            <h3 style={{ fontSize: "25px", fontFamily: "NunitoBold" }}>
                                Số tiền cần quyên góp {convertNumber(Donate.setAmount)}VNĐ </h3>
                            <div class="fb-like" data-href="https://momo.vn/cong-dong/chung-tay-gay-quy-dung-truong-moi-tang-25-em-hoc-sinh-ban-huoi-chua" data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>
                            <p style={{ fontSize: "20px" }}> {Donate.summary}</p>
                        </div>
                        <div className="slider">
                            <div style={{ justifyContent: "space-between", display: "flex" }}>
                                {img.map((item) => {
                                    return (
                                        <Image
                                            style={{ borderRadius: "10px" }}
                                            width={400}
                                            src={item}
                                        />
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section className="detail_body">
                <div className="container">
                        <div className="row">
                            <div className="col-8">
                            <Table columns={columns} dataSource={AllDonator} />
                            </div>
                        </div>
                </div>
            </section>
            
        </>
    );
}

export default ListDonator;
