  
const mongoose = require('mongoose');


const DonateActionSchemea = new mongoose.Schema(
    {
        fullName: {
            type: String,
            default: "Nhà hảo tâm",
        },
        phone: {
            default: "",
            type: String,
        },
        message: {
            default: "",
            type: String,
        },
        amountToDonate: {
            type: String,
            required: [true, 'Vui lòng cung cấp số tiền donate']
        },
        donateEvent:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "DonateEnvent",
            required: [true, 'Vui lòng cung cấp id chuong trình quyên góp']
        },
        donator :{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
        
    }
    
);


const DonateAction = mongoose.model('DonateAction', DonateActionSchemea);

module.exports = DonateAction;
