  
const { data } = require('jquery');
const mongoose = require('mongoose');


const DonateEnventSchemea = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide title']
        },
        image: [{
            type: String,
        }],
        content: {
            type: String,
            required: [true, 'Please provide content']
        },
        expired: {
            type: String,
            required: [true, 'Please provide date expired']
        },
        soTienCanDonate: {
            type: String,
            required: [true, 'Please provide So tien can Donate']
        },
        soTienDonateHieTai: {
            type: String,
            required: [true, 'Please provide So tien Donate hien tai']
        },
        nguoiDaDonate:[{
            type: mongoose.Schema.Types.ObjectId,
        }]
    }, 
    
);


const DonateEnvent = mongoose.model('DonateEnvent', DonateEnventSchemea);

module.exports = DonateEnvent;