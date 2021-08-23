
import React from 'react';
import { Card,} from 'antd';
import "../style/About.scss"
import "../style/bootstrap-grid.min.css";
const AboutUs = () => {
    return (
        <>
            <div className="container">
                <Card style={{ marginTop: "90px" }} bordered={true}>

                    <div className="row">
                        <div className="col">
                            <div className=" About-Us">
                                <h3 className="title">Giới thiệu</h3>

                            </div>
                            <div className="content">
                                <p>
                                    <p>Nhận thấy nhu cầu làm từ thiện, đóng góp cho cộng đồng của các nhà hảo tâm và có nhiều hoàn cảnh khó khăn cần sự giúp đỡ mà các nhà hảo tâm chưa tiếp cận được. Chúng tôi đã sáng lập ra website hỗ trợ cho việc gây quỹ và giúp đỡ các hoàn cảnh khó khăn với tên gọi là Quỹ Trao Yêu Thương. Với đặc điểm nổi bật như dễ dàng tiếp cận và thông tin đầy đủ của các hoàn cảnh, chương trình gây quỹ, dễ dàng và nhanh chóng trong việc ủng hộ qua thanh toán trực tuyến, minh bạch chi tiêu,...</p>
                                    <p>Các đặc điểm của Quỹ Trao Yêu Thương</p>
                                    <p>Tóm tắt:</p>
                                    <ul>
                                        <li>
                                        Quỹ hoạt động theo nguyên tắc: chi phí quản trị bằng không. Toàn bộ tiền đóng góp của nhà hảo tâm chuyển hết cho người thụ hưởng
                                        </li>
                                        <li>
                                        Quỹ được quản lý, giám sát tài chính minh bạch chặt chẽ. Mọi nghiệp vu thu chi được cập nhật theo thời gian thực (real time) bằng các phần mềm di động.
                                        </li>

                                    </ul>
                                   {/*  <p>• Quỹ hoạt động theo nguyên tắc: chi phí quản trị bằng không. Toàn bộ tiền đóng góp của nhà hảo tâm chuyển hết cho người thụ hưởng</p>
                                    <p> • Quỹ được quản lý, giám sát tài chính minh bạch chặt chẽ. Mọi nghiệp vu thu chi được cập nhật theo thời gian thực (real time) bằng các phần mềm di động.</p>
 */}
                                    <p>Số liệu ghi nhận </p>
                                    <ul>
                                        <li>
                                        Suốt gần 3 tháng qua (từ 5/2021 ~ 8/2021) đã có 600 lượt nhà hảo tâm đóng góp số tiền 38.148.893.198 VNĐ.
                                        </li>
                                    </ul>
                                 
                                    <p> 
                                    Đây là quỹ từ thiện có chi phí quản lý bằng 0. Điều này có nghĩa là toàn bộ tiền đóng góp của nhà hảo tâm đều được chuyển hết cho đối tượng thụ hưởng, không trích lại chi phí cho bộ máy. Bên cạnh việc đóng góp cho Quỹ, những nhà sáng lập và thành viên điều hành Quỹ còn có nhiệm vụ tìm kiếm nguồn kinh phí để trang trải cho các chi phí của quỹ như tiền thuê nhà, tiền lương, tiền vận chuyển và chi phí viễn thông v.v… </p> 
                                    <p> 
                                    Tiền đóng góp của nhà hảo tâm sẽ được đưa hết 100% vào Quỹ để sử dụng cho các dự án từ thiện. Nhà hảo tâm có thể đóng góp có chỉ định chương trình gây quỹ cụ thể. Số tiền đóng góp này phải được ban quản lý quỹ đối xử hết sức trân trọng, cân nhắc cẩn thận khi sử dụng cho mục đích từ thiện. Số tiền này còn được gọi là tiền thiêng liêng.
                                    </p> 
                                    <p> 
                                    Để trang trải mọi hoạt động của Quỹ, những nhà sáng lập và thành viên điều hành phải tự lo liệu kinh phí hoạt động. Để phân biệt, số tiền dành để chi cho kinh phí hoạt động gọi là tiền phương tiện hay Quỹ Phương Tiện, chỉ những nhà sáng lập hoặc thành viên điều hành hoặc thân hữu của họ mới được phép đóng góp số tiền phương tiện này. Để chắc chắc đủ kinh phí hoạt động, một nhóm đối tác của Quỹ tên là nhóm Phương Tiện được lập ra để lo liệu kinh phí hoạt động.
                                    </p> 
                                    <p> 
                                    Tóm lại, những nguồn thu nhân danh Quỹ Trao Yêu Thương đều phải đưa vào tiền thiêng liêng và chuyển hết cho người thụ hưởng. Một nhóm đối tác gọi là nhóm Phương tiện do ban điều hành lập ra để kiếm tiền nuôi sống bộ máy Quỹ. Nhóm này chỉ giới hạn trong ban sáng lập, điều hành, hoặc thân hữu của họ và không được phép nhân danh Quỹ Trao Yêu Thương trong các hoạt động tạo nguồn thu.
                                    </p> 
                                    <p> 
                                    Các chương trình gây quỹ đang tiến hành
                                    </p> 
                                    <p> 
                                    Dự án hỗ trợ y tế: hỗ trợ các trường hợp người nghèo khó khăn khi điều trị các bệnh tật, các trường hợp túng quẫn không có khả năng chi trả chi phí thuốc men, dịch vụ khám chữa bệnh. Quỹ tiến hành xây dựng các Trạm lắng nghe để tiếp nhận thông tin trợ giúp y tế
                                    </p> 
                                    <p> 
                                    Dự án hỗ suất ăn giá rẻ:hỗ trợ các trường hợp người nghèo bằng các suất ăn/uống giá rẻ qua các điểm bán hàng, các quán cơm v.v… Cung cấp các bữa ngon gồm các món nước như Phở, bún bò, hủ tiếu, mì gà v.v…
                                    </p> 
                                    <p> 
                                    Nguồn đóng góp ban đầu </p> 
                                    <p> 
                                    Quỹ Trao Yêu Thương hoạt động từ tháng 5 năm 2021 với nguồn đóng góp ban đầu là 100 triệu đồng do các sáng lập viên đóng góp.
                                    </p> 
                                </p>
                            </div>

                        </div>

                    </div>
                </Card>

            </div>

        </>
    );
}

export default AboutUs;
