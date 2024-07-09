import mongoose from 'mongoose';

const hireFromUsSchema = new mongoose.Schema({
    headerData: {
        title: { type: String },
        subTitle: { type: String },
        headerImage: { type: String }
    },
    companiesHireFromUs: {
        Title: { type: String },
        subTitle: { type: String },
        descList: [{
            title: { type: String }
        }],
        companyLogos: [{
            companyName: { type: String },
            logo: { type: String }
        }]
    },
    candidateRole: {
        category: { type: String },
        Technical_Highlights: [{
            logo: { type: String },
            highlight: { type: String },
        }],
        toolsCovered: [{
            toolName: { type: String },
            toolLogo: { type: String }
        }],
        softSkillHighlights: [{
            heading: { type: String },
            points: [{ point: { type: String } }]
        }],

        Inventory_Available: [{
            count: { type: String },
            desc: { type: String }
        }],
        Hiring_Facts: [{
            count: { type: String },
            desc: { type: String }
        }]
    },
    pastHiringProcessOverview: {
        title: { type: String },
        subTitle: { type: String },
        batch: [{
            startMonth: { type: String },
            endMonth: { type: String },
            points: []
        }]
    }
});

const hireFromUsModel = mongoose.model('hireFromUsData', hireFromUsSchema);

export default hireFromUsModel;