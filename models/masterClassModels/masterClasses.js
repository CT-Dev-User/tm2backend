import mongoose from 'mongoose';

const masterClassSchema = new mongoose.Schema({
    title: { type: String },
    subtitle: { type: String },
    masterClassData: {
        category: { type: String },
        data: [{
            image: { type: String },
            masterClassTrainer: { type: String },
            masterClassTrainerPosition: { type: String },
            masterClassTrainerCompany: { type: String },
            masterClassName: { type: String },
            StartTime: { type: String },
            EndTime: { type: String },
            peopleRegistered: { type: String },
        }]
    }
});

const masterClassModel = mongoose.model('masterClass', masterClassSchema);

export default masterClassModel;