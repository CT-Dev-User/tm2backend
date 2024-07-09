import mongoose from 'mongoose';

const collegeCollaborationSchema = new mongoose.Schema({
    headerData: {
        headerImg: { type: String },
        heading: { type: String },
        subTitle: { type: String },
        Companylogos: [{
            companyName: { type: String },
            companyLogo: { type: String }
        }]
    },
    highLightsData: {
        highLightsPoints: [{
            point: { type: String }
        }],
        image: { type: String }
    },
    mouCollaborationDesc: { type: String },
    ourParteners: {
        ourPartenerImg: { type: String },
        companyLogoData: [{
            companyName: { type: String },
            companyLogo: { type: String }
        }]
    },
    collegeCOllaborationsData: [{
        collegeName: { type: String },
        city: { type: String }
    }],
    collaborationPhoto: [{
        eventName: { type: String },
        eventImage: { type: String }
    }]
});

const collegeCollaborationModel = mongoose.model('collegeCollaborationData', collegeCollaborationSchema);

export default collegeCollaborationModel;