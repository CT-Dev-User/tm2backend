import mongoose from 'mongoose';

const testimonialsSchema = new mongoose.Schema({
    heading: { type: String },
    desc: { type: String },
    Title: { type: String },
    reviewData: [{
        studentName: { type: String },
        position: { type: String },
        review: { type: String },
        reviewPoints: { type: String },
        reviewVideo: { type: String }

    }]
});

const testimonialsModel = mongoose.model('testimonialsData', testimonialsSchema);

export default testimonialsModel;