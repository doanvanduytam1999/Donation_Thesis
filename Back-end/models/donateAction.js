  
const mongoose = require('mongoose');


const DonateActionSchemea = new mongoose.Schema(
    {
        tenNguoiDonate: {
            type: String,
            default: "Ẩn danh",
        },
        soDienThoai: {
            default: "",
            type: String,
        },
        loiNhan: {
            default: "",
            type: String,
        },
        soTienDonate: {
            type: String,
            required: [true, 'Vui lòng cung cấp ngày bắt đầu nhận donate']
        },
        chuongTringQuyenGop:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "DonateEnvent"
        },
        userDonate :{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
        
    }
    
);


const DonateAction = mongoose.model('DonateAction', DonateActionSchemea);

module.exports = DonateAction;
