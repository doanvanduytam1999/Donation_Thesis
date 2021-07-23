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
                <div className='col-6 offset-6'>
                    <h3 style={{ fontSize: "30px" }}>Thông tin tài khoản</h3>
                </div>
                <div>
                    <ProFile></ProFile>
                </div>
            </div>

        </>
    );
}

export default Profile;
