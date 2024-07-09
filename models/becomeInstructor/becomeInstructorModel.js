import mongoose from 'mongoose';

const becomeInstructorSchema = new mongoose.Schema({
    headerData: {
        title: { type: String },
        subTitle: { type: String },
        headerImage: { type: String }
    },
    becomeInstructorInfo: {
        desc: { type: String },
        image1: { type: String },
        image2: { type: String },
        image3: { type: String },
    },
    What_is_for_you: {
        title: { type: String },
        image: { type: String },
        desc: { type: String }
    },
    whatDoesItTake: {
        title: { type: String },
       data: [{
            Title: { type: String },
            points: [{ title: { type: String } }],
            Image: { type: String }
        }]
    },
    whyMentorWithUs: {
        dataArr: [{
            title: { type: String },
            desc: { type: String }
        }],
        Image: { type: String }
    }
});

const becomeInstructorModel = mongoose.model('becomeInstructor', becomeInstructorSchema);

export default becomeInstructorModel;