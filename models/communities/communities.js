import mongoose from 'mongoose';

const communitiesSchema = new mongoose.Schema({
    headerData: {
        title: { type: String },
        subTitle: { type: String },
        headerImage: { type: String }
    },
    instructors: [{
        name: { type: String },
        profileImg: { type: String },
        position: { type: String },
        company: { type: String }
    }],
    creators: [{
        name: { type: String },
        profileImg: { type: String },
        position: { type: String },
        company: { type: String }
    }],
    TmCommunity: {
        title: { type: String },
        subTitle: { type: String },
        communitiesData: [{
            mentorName: { type: String },
            profileImg:{type:String},
            position: { type: String },
            companyLogo: { type: String }
        }]
    },
    relatedCourse: { 
        title: { type: String },
        subTitle: { type: String },
        courseData: [{
            courseName: { type: String },
            courseImage: { type: String },
            star: { type: Number },
            rating: { type: String },
            enrollements: { type: String },
            courseLevel:{type: String},
        }]
    },
    learningBetterWithTmCommunity:{
        title: { type: String },
        subTitle: { type: String },
        communities: [{
            profileImg:{type:String},
            mentorName: { type: String },
            position: { type: String },
        }]  
    }
});

const communitiesModel = mongoose.model('communities', communitiesSchema);

export default communitiesModel;