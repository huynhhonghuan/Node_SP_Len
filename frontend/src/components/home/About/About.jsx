import React from 'react';
import './About.css';
import about_header_img from '../../../assets/images/home/about-header.jpg';
import about_1 from '../../../assets/images/home/about-1.jpg';
import about_2 from '../../../assets/images/home/about-2.jpg';
import about_3 from '../../../assets/images/home/about-3.jpg';


const About = () => {

    return (
        <div className="about">
            <div className="about-header d-flex justify-content-center align-items-center">
                <div className="about-header-title w-100 text-center py-5">
                    <h2 className="fst-italic pb-2">Len Nhà Làm</h2>
                    <h5>Đan hạnh phúc - Dệt tự tin</h5>
                </div>
            </div>
            <div className="about-content row d-flex justify-content-around align-items-center mt-5 px-5">
                <div className="about-content-img col-12 col-md-3 text-center">
                    <img src={about_1} alt="about-header-img" />
                </div>
                <div className="about-content-text col-12 col-md-6 py-3">
                    <h3 className="fs-3 text-left text-uppercase">Về Chúng Tôi</h3>
                    <p>Thành lập: 1/11/2022</p>
                    <p>
                        Tiệm nhà len chuyên cung cấp các sản phẩm, phụ kiện, móc khóa, đồ trang trí bằng len sợi được làm thủ công an toàn, chất lượng cao.
                    </p>
                    <p>
                        “Tiệm nhà len” sinh ra với mong muốn trở thành điển hình về mô hình DOANH NGHIỆP TRÁCH NHIỆM bằng cách vừa làm kinh doanh bài bản, có lợi nhuận và đồng thời mang lại những giá trị thiết thực và lâu dài cho khách hàng, cho nhân viên, cho đối tác, cho cộng đồng, xã hội và cho cổ đông”.
                    </p>
                </div>
            </div>
            <div className="about-content my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                        <div className="about-gap d-flex align-items-center mx-3 my-4">
                            <hr className="flex-grow-1 me-3 border-2" />
                            <h5 className="text-uppercase">Câu Chuyện Của Chúng Tôi</h5>
                            <hr className="flex-grow-1 ms-3 border-2" />
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-lg-5">
                        <div className="about-content-text px-5">
                            <p>
                                #1. Với nhân viên <br />
                                Tiệm nhà len kỳ vọng sẽ xây dựng được một tổ chức cởi mở, một môi trường năng động với một văn hóa riêng. Và ở đó các bạn sẽ phát huy hết khả năng của mình, và nhận được những phần lương, thưởng xứng đáng. Ngoài lương thì các bạn nhân viên của Tiệm nhà len còn nhận được các ESOP (cổ phần thưởng) hàng năm nếu có đóng góp tốt.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 text-center">
                        <div className="about-content-img-1">
                            <img src={about_2} alt="about-header-img" />
                        </div>
                    </div>
                </div>

                <div className="row d-flex justify-content-center align-items-center mt-4">
                    <div className="col-12 col-lg-5 text-center">
                        <div className="about-content-img-1 pb-2">
                            <img src={about_3} alt="about-header-img" />
                        </div>
                    </div>
                    <div className="col-12 col-lg-5">
                        <div className="about-content-text px-5">
                            <p>
                                #2. Với khách hàng <br />
                                Tiệm nhà len kỳ vọng mang lại giá cả tốt hơn cho khách hàng nhờ vào mô hình bán hàng trực tiếp thông qua nền tảng TMĐT. Thay vì việc phải bán giá sản phẩm x4-x6 lần giá vốn như truyền thống thì Tiệm nhà len thường là x1.8-x2.5 lần mà chúng tôi vẫn có phần lời nhất định. Ngoài ra Tiệm nhà len còn hướng tới mang lại một trải nghiệm mua sắm tốt hơn dành cho khách hàng nhờ vào việc tập trung rất nhiều vào dịch vụ khách hàng.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default About;