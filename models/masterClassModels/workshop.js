import mongoose from 'mongoose';

const workshopSchema = new mongoose.Schema({
    title: { type: String },
    subtitle: { type: String },
    workshopData: {
        category: { type: String },
        data: [{
            image: { type: String },
            workshopTrainer: { type: String },
            workshopTrainerPosition: { type: String },
            workshopTrainerCompany: { type: String },
            workshopName: { type: String },
            StartTime: { type: String },
            EndTime: { type: String },
            peopleRegistered: { type: String },
        }]
    }
});

const workshopModel = mongoose.model('workshop', workshopSchema);

export default workshopModel;