  
const mongoose = require('mongoose');


const CategoryDonateEventSchemea = new mongoose.Schema(
    {
        CategoryName: {
            type: String,
            required: [true, 'Vui lòng cung cấp tên loại bài đăng']
        },
    }, 
    
);

CategoryDonateEventSchemea.virtual('donateEnvents', {
    ref: 'DonateEnvent',
    localField: '_id',
    foreignField: 'categoryPost',
})


const CategoryDonateEvent = mongoose.model('CategoryDonateEvent', CategoryDonateEventSchemea);

module.exports = CategoryDonateEvent;