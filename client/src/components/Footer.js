import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import "../style/bootstrap-grid.min.css";
import "../style/Footer.scss";
const Footer = () => {
    return (
        <>

            <div className="footer">
                <Divider />
                <div className="container">
                    <div className="footer_text col-10 offset-1 ">
                        <div className="row">
                            <div className="footer_text-head">
                                <div className="img ">
                                    <img width="40px" src="../images/logo.png" alt="logo" />
                                </div>

                            </div>
                        </div>
                        <Divider />
                        <div className="wapper_menu">
                            <div className="row">
                                <div className="col-3">
                                    <div className="menu_item">
                                        <div className="menu_item-text">
                                            <ul>
                                                <li>
                                                    <p className="text-bold">About Us</p>
                                                </li>
                                                <li>
                                                    <Link to="gioi-thieu" > <span className="btn-text">About Us</span></Link>

                                                </li>
                                             {/*    <li>
                                                    <a href="#/">Terms & Conditions</a>
                                                </li>
                                                <li>
                                                    <a href="#/">Privacy Policy</a>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">

                                </div>
                                <div className="col-3">

                                </div>
                                <div className="col-3">
                                    <div className="menu_item">
                                        <div className="menu_item-text">
                                            <ul>
                                                <li>
                                                    <p className="text-bold">Help</p>
                                                </li>

                                                <li>
                                                    <Link to="/lien-he">Contact Us</Link>

                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_end">
                    <div className="container">
                        <div className="footer_end_text col-10 offset-1 ">
                            <p style={{textAlign:"center"}}> Copyright © Đoàn Văn Duy Tâm & Quách Trọng Nhân</p>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}

export default Footer;
