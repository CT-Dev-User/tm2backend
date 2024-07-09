import mongoose from 'mongoose';

const masterClassSubPageSchema = new mongoose.Schema({
    headerData: {
        headerImg: { type: String },
        heading: { type: String },
        subTitle: { type: String },
    },
    masterClassSchedule: [{
        startOn: { type: String },
        endsOn: { type: String },
        venue: { type: String }
    }],

    aboutThisMasterClass: {
        title: { type: String },
        subTitle: { type: String },
        whatWillGetFromMasterClass: [{
            point: { type: String }
        }],
        mentorData: [{
            mentorProfileImage: { type: String },
            mentorPosition: { type: String },
            company: { type: String },
            companyLogo: { type: String }
        }],
        PointsAboutourMentor: {
            title: { type: String },
            points: [{ point: { type: String } }]
        }
    },
    thisMasterClassFor: [{
        title: { type: String },
        logo: { type: String }
    }],
    aboutTm: {
        title: { type: String },
        subTitle: { type: String },
    },
    ourMission: [{
        point: { type: String }
    }],
    aboutMasterClass: {
        title: { type: String },
        subTitle: { type: String },
        checkData: [{
            point: { type: String }
        }]
    },
    upComingEvents: [{
        eventName: { type: String },
        mentorProfileImage: { type: String },
        startDate: { type: String },
        StartTime: { type: String },
        endData: { type: String },
        endTime: { type: String },
        peopleRegistered: { type: String }

    }]
});

const masterClassSubPageModel = mongoose.model('masterClassSubPage', masterClassSubPageSchema);

export default masterClassSubPageModel;