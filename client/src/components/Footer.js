import React from 'react';
import {FacebookOutlined,TwitterOutlined,InstagramOutlined,YoutubeOutlined} from '@ant-design/icons';
import "../style/bootstrap-grid.min.css";
import "../style/Footer.scss";
import { Divider } from 'antd';
const Footer = () => {
    return (
        <> 
        <Divider />
            <div className="footer">
                <div className="container">
                    <div className="footer_text col-10 offset-1 ">
                        <div className="row">
                        <div className="footer_text-head">
                            <div className="img ">
                                <img width="40px" src="../images/logo.png" alt="logo" />
                            </div>
                            <div className="list_icon">
                                <ul>
                                    <li><a href="#/"><FacebookOutlined /></a></li>
                                    <li><a href="#/"><TwitterOutlined /></a></li>
                                    <li><a href="#/"><InstagramOutlined /></a></li>
                                    <li><a href="#/"><YoutubeOutlined /></a></li>
                                </ul>
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
                                                   <a href="#/">About Us</a>
                                                </li>
                                                <li>
                                                   <a href="#/">Terms & Conditions</a>
                                                </li>
                                                <li>
                                                   <a href="#/">Privacy Policy</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="menu_item">
                                        <div className="menu_item-text">
                                        <ul>
                                                <li>
                                                    <p className="text-bold">Products</p>
                                                </li>
                                                <li>
                                                   <a href="#/">Shout Fund</a>
                                                </li>
                                                <li>
                                                   <a href="#/">Shout Terminal</a>
                                                </li>
                                                <li>
                                                   <a href="#/">Shout Button</a>
                                                </li>
                                                <li>
                                                    <a href="#/">Shout SMS </a>
                                                </li>
                                                <li>
                                                    <a href="#/">Shout QR</a>
                                                </li>
                                             
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="menu_item">
                                        <div className="menu_item-text">
                                        <ul>
                                                <li>
                                                    <p className="text-bold">Explore</p>
                                                </li>
                                                <li>
                                                   <a href="#/">Charities</a>
                                                </li>
                                                <li>
                                                   <a href="#/">Fundraisers</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="menu_item">
                                        <div className="menu_item-text">
                                        <ul>
                                                <li>
                                                    <p className="text-bold">Help</p>
                                                </li>
                                                <li>
                                                   <a href="#/">FAQs</a>
                                                </li>
                                                <li>
                                                   <a href="#/">Contact Us</a>
                                                </li>
                                                <li>
                                                   <a href="#/">Report an Issue</a>
                                                </li>
                                            </ul>
                                        </div>
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
                        <p>Shout fundraising services are provided by Shout For Good Pty Ltd (Shout). Shout is not a bank. Obligations of Shout are not deposits or liabilities of ANZ. ANZ does not stand behind or guarantee Shout or its obligations. Copyright © 2021 Shout For Good Pty Ltd.</p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Footer;
