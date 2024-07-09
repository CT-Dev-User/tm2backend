import mongoose from 'mongoose';

const webinarSchema = new mongoose.Schema({
    title: { type: String },
    subtitle: { type: String },
    webinarData: {
        category: { type: String },
        data: [{
            image: { type: String },
            webinarTrainer: { type: String },
            webinarTrainerPosition: { type: String },
            webinarTrainerCompany: { type: String },
            webinarName: { type: String },
            StartTime: { type: String },
            EndTime: { type: String },
            peopleRegistered: { type: String },
        }]
    }
});

const webinarModel = mongoose.model('webinar', webinarSchema);

export default webinarModel;