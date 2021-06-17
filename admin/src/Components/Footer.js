import React from 'react';
import {FacebookOutlined,TwitterOutlined,InstagramOutlined,YoutubeOutlined} from '@ant-design/icons';
import "../styles/bootstrap-grid.min.css";
import "./Footer.scss";
import { Divider } from 'antd';
const Footer = () => {
    return (
        <> 
      
            <div className="footer">
            <Divider />
                <div className="container">
                    <div className="footer_text col-10 offset-1 ">
                        <div className="row">
                        <div className="footer_text-head">
                            Quách Trọng Nhân   
                        </div>
                        </div>
                        </div>
                        <Divider />
                        
                </div>
               
            </div>
           
        </>
    );
}

export default Footer;
