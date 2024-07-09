import mongoose from 'mongoose';

const consultingDataSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
});

const consultingDataModel =  mongoose.model('consultingData', consultingDataSchema);

export default consultingDataModel;