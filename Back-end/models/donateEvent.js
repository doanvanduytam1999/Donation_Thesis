  
const mongoose = require('mongoose');


const DonateEnventSchemea = new mongoose.Schema(
    {
        tieuDe: {
            type: String,
            required: [true, 'Vui lòng cung cấp tiêu đề bài đăng']
        },
        hinhAnh: [{
            default: "",
            type: String,
        }],
        tomTat: {
            type: String,
            required: [true, 'Vui lòng cung cấp tóm tắt bài đăng']
        },
        noiDung: {
            type: String,
            required: [true, 'Vui lòng cung cấp nội dung bài đăng']
        },
        ngayBatDau: {
            type: String,
            required: [true, 'Vui lòng cung cấp ngày bắt đầu nhận donate']
        },
        ngayKetThuc: {
            type: String,
            required: [true, 'Vui lòng cung cấp ngày kết thúc doante']
        },
        soTienCanDonate: {
            type: String,
            required: [true, 'Vui lòng cung cấp số tiền cần donate']
        },
        soTienDonateHieTai: {
            default: "0",
            type: String,
        },
        trangThai: {
            default: 'Chưa đủ',
            type: String,
        },
        tinNoiBat:{
            type: Boolean,
            default: false
        },
        nguoiDang:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserAdmin"
        },
        loaiBaiDang:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CategoryDonateEvent"
        }
    }
    
);

DonateEnventSchemea.virtual('donateActions', {
    ref: 'DonateAction',
    localField: '_id',
    foreignField: 'chuongTrinhQuyenGop',
})


const DonateEnvent = mongoose.model('DonateEnvent', DonateEnventSchemea);

module.exports = DonateEnvent;