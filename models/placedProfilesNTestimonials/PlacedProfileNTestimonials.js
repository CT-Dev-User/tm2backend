// header
// Our Alumni
// related program
// Testimonials

import mongoose from 'mongoose';

const placedProfileTestimonialsSchema = new mongoose.Schema({
    headerData: {
        title: { type: String },
        subTitle: { type: String },
        headerImage: { type: String },
        jobInternship: { type: String },
        jobProfile: { type: String },
        jobLevel: { type: String }
    },
    relatedProgram: [{
        programImg: { type: String },
        programLevel: { type: String },
        programName: { type: String },
        programType: { type: String },
        aboutProgram: { type: String },
        duration: { type: String },
    }],
    tesimonials: [{
        studentName: { type: String },
        position: { type: String },
        review: { type: String },
        reviewPoints: { type: String },
        reviewVideo: { type: String }
    }]
})

const placedProfileTestimonialsModels = mongoose.model('placedProfileTestimonials', placedProfileTestimonialsSchema);

export default placedProfileTestimonialsModels;