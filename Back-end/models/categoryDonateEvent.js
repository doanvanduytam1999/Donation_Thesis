  
const mongoose = require('mongoose');


const CategoryDonateEventSchemea = new mongoose.Schema(
    {
        tenloai: {
            type: String,
            required: [true, 'Vui lòng cung cấp tên loại bài đăng']
        },
    }, 
    
);

CategoryDonateEventSchemea.virtual('donateEnvents', {
    ref: 'DonateEnvent',
    localField: '_id',
    foreignField: 'loaibaidang',
})


const CategoryDonateEvent = mongoose.model('CategoryDonateEvent', CategoryDonateEventSchemea);

module.exports = CategoryDonateEvent;