import mongoose from 'mongoose';

const alumniSchema = new mongoose.Schema({
    title: { type: String },
    subTitle: { type: String },
    data: [{
        value: { type: String },
        desc: { type: String }
    }],
    alumniDataByCategory: {
        category: { type: String },
        allAlumni: [{
            alumniName: { type: String },
            alumniProfile: { type: String },
            position: { type: String },
            location: { type: String },
            beforePosition: { type: String },
            afterPosition: { type: String },
            descLine: { type: String }
        }]
    }
})
const alumniModels = mongoose.model('alumni', alumniSchema);

export default alumniModels;