import React,{useState} from 'react';
import ProFile from '../../Components/ProflieCpn';
const Profile = () => {
    const islogin = JSON.parse(localStorage.getItem("user"))
    const [AllDonate, setAllDonate] = useState([]);
    const [/* listDonates */, setListdonates] = useState([]);
    const [History, setHistory] = useState([]);
    //const [state, setstate] = useState([]);
    const DonateHistory = []
    return (
        <>
            <div className="container">

                <div className='wapper_edit_user'>
                    <h3  className='title_edit_user' >Thông tin tài khoản</h3>
                    <ProFile></ProFile>
                </div>
                <div>
                    
                </div>
            </div>

        </>
    );
}

export default Profile;
