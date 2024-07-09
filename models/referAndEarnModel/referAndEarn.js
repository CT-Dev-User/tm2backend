import mongoose from 'mongoose';

const referAndEarnSchema = new mongoose.Schema({
    headerData: {
        headerImg: { type: String },
        heading: { type: String },
        subTitle: { type: String }
    },
    earnGreatReward: {
        title: { type: String },
        subTitle: { type: String },
        image: { type: String },
        desc: { type: String },
        programHighlights: [{
            point: { type: String }
        }]
    }
});

const referAndEarnModel = mongoose.model('referAndEarnData', referAndEarnSchema);

export default referAndEarnModel;