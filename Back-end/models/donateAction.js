  
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
        
    }
    
);


const DonateAction = mongoose.model('DonateAction', DonateActionSchemea);

module.exports = DonateAction;
// 1 truong hop donate (bai post): 1 truong trinh quyen gop
// 1 loại truong trinh quyen gop
// bai dang cua 1 truong trinh quyen gop