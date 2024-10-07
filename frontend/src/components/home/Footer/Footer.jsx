import React from 'react';
import './Footer.css';
import fb_logo from '../../../assets/images/home/fb.png';
import tt_logo from '../../../assets/images/home/tt.png';
import tw_logo from '../../../assets/images/home/tw.png';
import p_logo from '../../../assets/images/home/p.png';

const Footer = () => {
    return (
        <div className="footer d-flex justify-content-evenly px-5 pt-3">
            <div className="footer-card">
                <div className="footer-card-title border-bottom border-secondary border-2 w-100 pb-2">
                    <span className='text-uppercase fw-bold fs-5 border-bottom border-secondary border-3 pb-2'>Liên hệ</span>
                </div>
                <ul className='list-unstyled mt-4'>
                    <li className='pb-4'><i className="fa-solid fa-phone"></i> Tư vấn dịch vụ: 0343930185</li>
                    <li className='pb-4'><i className="fa-solid fa-phone"></i> Hỗ trợ sử dụng: 0343930185</li>
                    <li className='pb-4'><i className="fa-solid fa-phone"></i> Hỗ trợ vận chuyển: 0343930185</li>
                    <li className='pb-4'><i className="fa-solid fa-envelope"></i> Email: tiemnhalenn88@gmail.com</li>
                    <li className='pb-4'><i className="fa-solid fa-clock"></i> 7:00am – 22:00pm thứ 2 - thứ 7</li>
                </ul>
            </div>
            <div className="footer-card">
                <div className="footer-card-title border-bottom border-secondary border-2 w-100 pb-2">
                    <span className='text-uppercase fw-bold fs-5 border-bottom border-secondary border-3 pb-2'>Chính sách</span>
                </div>
                <ul className='list-unstyled mt-4'>
                    <li className='pb-4'><i className="fa-solid fa-chevron-right"></i> Chính sách vận chuyển</li>
                    <li className='pb-4'><i className="fa-solid fa-chevron-right"></i> Điều khoản mua hàng</li>
                    <li className='pb-4'><i className="fa-solid fa-chevron-right"></i> Chính sách đổi trả</li>
                    <li className='pb-4'><i className="fa-solid fa-chevron-right"></i> Bảo mật thông tin</li>
                    <li className='pb-4'>
                        <img className='me-1' src={fb_logo} alt="" style={{ width: '50px' }} />
                        <img className='me-1' src={tt_logo} alt="" style={{ width: '50px' }} />
                        <img className='me-1' src={tw_logo} alt="" style={{ width: '50px' }} />
                        <img className='me-1' src={p_logo} alt="" style={{ width: '50px' }} />
                    </li>
                </ul>
            </div>
            {/* <div className="footer-card">
                <div className="footer-card-title border-bottom border-secondary border-2 w-100 pb-2">
                    <span className='text-uppercase fw-bold fs-5 border-bottom border-secondary border-3 pb-2'>Fanpages facebook</span>
                </div>

            </div>
            <div className="footer-card">
                <div className="footer-card-title border-bottom border-secondary border-2 w-100 pb-2">
                    <span className='text-uppercase fw-bold fs-5 border-bottom border-secondary border-3 pb-2'>Google map</span>
                </div>
            </div> */}
        </div>
    )
}

export default Footer;