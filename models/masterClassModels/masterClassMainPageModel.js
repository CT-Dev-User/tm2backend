import mongoose from 'mongoose';

const masterClassMainPageSchema = new mongoose.Schema({
    headerData: {
        headerImg: { type: String },
        heading: { type: String },
        subTitle: { type: String },
    },
});

const masterClassMainPageModel = mongoose.model('masterClassMainPage', masterClassMainPageSchema);

export default masterClassMainPageModel;