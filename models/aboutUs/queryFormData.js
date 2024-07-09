import mongoose from 'mongoose';

const queryFormDataSchema = new mongoose.Schema({
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    workExperince: { type: String },
});

const queryFormDataModel = mongoose.model('queryFormData', queryFormDataSchema);

export default queryFormDataModel;