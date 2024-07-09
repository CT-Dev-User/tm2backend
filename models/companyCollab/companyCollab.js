import mongoose from 'mongoose';

const companyCollaborationSchema = new mongoose.Schema({
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
    companyCOllaborationsData: [{
        collegeName: { type: String },
        city: { type: String }
    }],
    collaborationPhoto: [{
        eventName: { type: String },
        eventImage: { type: String }
    }]
});

const companyCollaborationModel = mongoose.model('companyCollaborationData', companyCollaborationSchema);

export default companyCollaborationModel;