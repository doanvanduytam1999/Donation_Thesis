import React, { useEffect, useState } from 'react';
import {  Tabs,Image } from 'antd';

import "../style/bootstrap-grid.min.css";
import "../style/Detail.scss";

import {useParams} from "react-router-dom";
import ScrollToTop from '../services/ScrollToTop';

import Callapi from '../services/Callapi';
const { TabPane } = Tabs;
const Detail = () => {
    let { _id } = useParams();
    const [Donate, setDonate] = useState([]);
    useEffect(() => {
        Callapi.donateDetial(_id).then((res) => {
            setDonate(res.data.DonateEnvent);
        })
    }, [])

    console.log(Donate);
    return (
        <>
          <ScrollToTop />
          
            <section className="detail_header">
                <div className="container">
                    <div className="">
                        <div className="introduce">
                            <h3 className="title">{Donate.tieude}</h3>
                            <h3 style={{fontSize:"25px", fontFamily:"inherit"}}>Số tiền cần quyên góp {Donate.soTienCanDonate}VNĐ</h3>
                            <div class="fb-like" data-href="https://momo.vn/cong-dong/chung-tay-gay-quy-dung-truong-moi-tang-25-em-hoc-sinh-ban-huoi-chua" data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>
                            <p> {Donate.noidung}</p>
                        </div>
                        <div className="slider">
                            <div  style={{justifyContent:"space-between", display:"flex"}}>
                            <Image
                                style={{borderRadius:"10px"}}
                                width={400}
                                src="../images/donate/detail/1.jpg"
                            />
                            <Image 
                                style={{borderRadius:"10px"}}
                                width={400}
                                src="../images/donate/detail/1.jpg"
                            />
                            <Image
                                style={{borderRadius:"10px"}}
                                width={400}
                                src="../images/donate/detail/1.jpg"
                            />
                            </div>
                          
                        </div>
                    </div>
                </div>
            </section>
            <section className="detail_body">
                <div className="container">
                    <div className="">
                        <div className="row">
                            <div className="col-8">
                                <Tabs defaultActiveKey="1"/*  onChange={callback} */>
                                    <TabPane tab="Câu chuyện" key="2">
                                        <p style={{ fontSize: "26px", fontWeight: "bold" }}>Câu chuyện</p>
                                        <p style={{ fontWeight: "bold" }}>Gian nan “gieo chữ” trên non</p>

                                        <p>Bản Sín Chải C là bản vùng cao khó khăn của xã Pa Vệ Sử, huyện Mường Tè, tỉnh Lai Châu. Đường lên đến bản khó đi, đường gồ ghề, dốc cao, sạt lở nhiều và nhiều đá tảng. Thế nên bà con Dân tộc La Hủ nơi đây sống cuộc sống khép kín, họ dè dặt với người lạ.</p>
                                        <p>
                                            Giữa miên man miền đá của con đường độc đạo cách từ trung tâm xã Pa Vệ Sử hơn 30km đến với điểm trường Sín Chải C, tiếng đọc chữ cất lên trong điểm trường tiểu học của 7 đứa trẻ người La Hủ, dù chưa tròn vành tiếng phổ thông nhưng đủ phá vỡ sự im lặng của miền cao nguyên lạnh ngắt xám màu đá.</p>
                                        <img width="100%" height="400px" src="../images/donate/detail/3.jpg" alt="3"></img>
                                        <p style={{ textAlign: "center" }}>
                                            <em>
                                                Điểm trường Sín Chải C (xã Pa Vệ Sử, huyện Mường Tè, tỉnh Lai Châu) nằm trên một mỏm đồi dưới chân đỉnh núi Pu Si Lung.
                                </em>
                                        </p>
                                        <p>Điểm trường Sín Chải C nằm cheo leo trên triền đồi núi Pu Si Lung. Cơ sở vật chất tại điểm trường đơn sơ và đã xuống cấp nghiêm trọng, lớp học được các thầy chắp vá và gia cố bằng bạt quây xung quanh lớp cho khỏi mưa khỏi rét. Vách tường ván gỗ cong vênh, tấm mối mọt, tấm hỏng, không tấm nào lành lặn. Mùa mưa lầy lội, lớp học cũng thiếu vững chãi hơn với từng đợt gió thổi mạnh, sàn lớp học bằng đất cũng vì thế mà ướt bùn dưới chân. Mùa Đông gió lạnh rít từng cơn qua khe hở, dù có bạt che chắn bên nhưng trong lớp học vẫn rét buốt.
                                </p>
                                        <p>
                                            <img width="100%" height="400px" src="../images/donate/detail/2.jpg" alt="2"></img></p>
                                        <p style={{ textAlign: "center" }}>
                                            <em>
                                                Cơ sở vật chất tuềnh toàng của điểm trường Sín Chải C, lớp học thưng gỗ, mái tôn hưng hỏng, nền đất lầy lội mỗi mùa mưa...
                                </em>
                                        </p>
                                        <p>
                                            <img width="100%" height="400px" src="../images/donate/detail/1.jpg" alt="1"></img></p>
                                        <p style={{ textAlign: "center" }}>
                                            <em>
                                                Điểm trường chỉ có vỏn vẹn 7 học sinh, vật chất nghèo nàn, nhưng thầy trò Sín Chải C vẫn kiên cường bám trường, bám lớp “gieo chữ, gặt tri thức”
                                </em>
                                        </p>
                                Chung tay gây quỹ để con chữ “nảy mầm”

                                Điều kiện kinh tế của người dân bản Sín Chải C vô cùng khó khăn, hoàn toàn dựa vào việc làm nương rẫy kiếm sống, thì không biết đến bao giờ ước mơ trường mới của thầy trò nơi đây mới trở thành hiện thực được. Vì vậy, hành trình tìm kiếm con chữ của 7 học sinh điểm trường Sín Chải C cần nhiều hơn sự hỗ trợ từ cộng đồng.

                                Với mong muốn xây mới cho các em nhỏ nơi đây một môi trường học tập khang trang, giúp các em được vui tươi cắp sách đi học, tiếp tục dựng xây tương lai của mình, Ví MoMo phối hợp cùng dự án Sức Mạnh 2000 và Trung tâm tình nguyện Quốc Gia đã lên kế hoạch xây dựng 01 lớp học và 01 nhà công vụ chắc chắn cho điểm trường. Món quà này sẽ giúp thầy trò Sín Chải C có thêm niềm tin, nghị lực vượt qua những khó khăn trong, kiên cường bám trường theo đuổi tri thức. Hãy chung tay cùng MoMo quyên góp đủ giúp các em học sinh yên tâm học hành trong một ngôi trường kiên cố!

                                *Sau khi hoàn thành chiến dịch kêu gọi quyên góp, MoMo sẽ tiến hành gửi toàn bộ số tiền 230 triệu đồng gây quỹ gửi tới Trung tâm Tình nguyện Quốc gia để xây thêm 01 lớp học 01 nhà công vụ cho Điểm trường Sín Chải C. Chúng tôi sẽ cập nhật thêm thông tin về tiến độ dự án đến quý vị trong thời gian sớm nhất.
                            </TabPane>
                                    <TabPane tab="Nhà hảo tâm" key="3">
                                        Content of Tab Pane 3
                            </TabPane>
                                    <TabPane tab="Chương trình khác" key="4">
                                        Content of Tab Pane 3
                            </TabPane>
                                </Tabs>
                            </div>
                            <div className="col-4">
                                <Tabs defaultActiveKey="1" type="card" /* size={size} */>
                                    <TabPane tab="Chuyển khoảng" key="1">
                                        Content of card tab 1
                                </TabPane>
                                    <TabPane tab="Momo" key="2">
                                        Content of card tab 2
                                </TabPane>

                                </Tabs>
                            </div>
                        </div>


                    </div>
                </div>

            </section>
        </>
    );
}

export default Detail;
