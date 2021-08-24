  
const mongoose = require('mongoose');


const DonateEnventSchemea = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Vui lòng cung cấp tiêu đề bài đăng']
        },
        image: [{
            default: "",
            type: String,
        }],
        summary: {
            type: String,
            required: [true, 'Vui lòng cung cấp tóm tắt bài đăng']
        },
        content: {
            type: String,
            required: [true, 'Vui lòng cung cấp nội dung bài đăng']
        },
        startDay: {
            type: Date,
            required: [true, 'Vui lòng cung cấp ngày bắt đầu nhận donate']
        },
        endDay: {
            type: Date,
            required: [true, 'Vui lòng cung cấp ngày kết thúc doante']
        },
        setAmount: {
            type: String,
            required: [true, 'Vui lòng cung cấp số tiền cần donate']
        },
        currentAmount: {
            default: "0",
            type: String,
        },
        status: {
            enum: ['Chưa đủ', 'Đã đủ', 'Dừng nhận donate'],
            default: 'Chưa đủ',
            type: String,
        },
        hotPost:{
            type: Boolean,
            default: false
        },
        poster:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserAdmin",
            required: [true, 'Vui lòng cung cấp id người đăng']
        },
        categoryPost:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CategoryDonateEvent",
            required: [true, 'Vui lòng cung cấp id loại bài đăng']
        },
        numberOfDonations: {
            default: "0",
            type: Number,
        },
        happinessContent: {
            type: String
        },
        imageHappiness: [{
            type: String
        }],
        requestChangeStatus: {
            type: Boolean,
            default: false
        },
        listEmail: [{
            default: [],
            type: String
        }]

    }
    
);

DonateEnventSchemea.virtual('donateActions', {
    ref: 'DonateAction',
    localField: '_id',
    foreignField: 'donateEvent',
})


const DonateEnvent = mongoose.model('DonateEnvent', DonateEnventSchemea);

module.exports = DonateEnvent;