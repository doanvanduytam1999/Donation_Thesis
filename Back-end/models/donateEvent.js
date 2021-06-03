  
const mongoose = require('mongoose');


const DonateEnventSchemea = new mongoose.Schema(
    {
        tieude: {
            type: String,
            required: [true, 'Vui lòng cung cấp tiêu đề bài đăng']
        },
        hinhanh: [{
            type: String,
        }],
        noidung: {
            type: String,
            required: [true, 'Vui lòng cung cấp nội dung bài đăng']
        },
        ngaybatdau: {
            type: String,
            required: [true, 'Vui lòng cung cấp ngày bắt đầu nhận donate']
        },
        ngayketthuc: {
            type: String,
            required: [true, 'Vui lòng cung cấp ngày kết thúc doante']
        },
        soTienCanDonate: {
            type: String,
            required: [true, 'Vui lòng cung cấp số tiền cần donate']
        },
        soTienDonateHieTai: {
            default: '0',
            type: String,
        },
        trangthai: {
            default: 'Chưa đủ',
            type: String,
        },
        tinnoibat:{
            type: Boolean,
            default: false
        },
        nguoidang:{
            type: mongoose.Schema.Types.ObjectId,
        },
        nguoiDaDonate:[{
            type: mongoose.Schema.Types.ObjectId,
        }],
        loaibaidang:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CategoryDonateEvent"
        }
    }, 
    
);


const DonateEnvent = mongoose.model('DonateEnvent', DonateEnventSchemea);

module.exports = DonateEnvent;