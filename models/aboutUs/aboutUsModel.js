import mongoose from 'mongoose';

const aboutUsSchema = new mongoose.Schema({
    headerData: {
        headerImg: { type: String },
        heading: { type: String },
        subTitle: { type: String }
    },
    subNav: {
        title: { type: String }
    },
    aboutUsDesc: {
        desc: { type: String },
        socialIcon: [{
            title: { type: String },
            icon: { type: String }
        }],
        Aboutimage: { type: String }
    },
    ourTeam: {
        title: { type: String },
        subTitle: { type: String },
        team: [{
            memberName: { type: String },
            memberProfilePic: { type: String },
            position: { type: String }
        }]
    },
    ourPartener: [{
        title: { type: String },
        companyLogo: { type: String }
    }],
    gallery: [{
        event: { type: String },
        image: { type: String }
    }],
    programsWeProvide: [{
        title: { type: String }
    }],

});

const aboutUsModel = mongoose.model('aboutUsData', aboutUsSchema);

export default aboutUsModel;