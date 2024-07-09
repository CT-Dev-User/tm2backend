import mongoose from 'mongoose';

const contactUsSchema = new mongoose.Schema({
    headerData: {
        title: { type: String },
        subTitle: { type: String },
        headerImage: { type: String }
    },
    address: { type: String },
    CompanyContactData: [{
        title: { type: String },
        email: { type: String },
        mobNo: { type: String }
    }],
    buildingImg: { type: String }
});

const contactUsModel = mongoose.model('contactUs', contactUsSchema);

export default contactUsModel;