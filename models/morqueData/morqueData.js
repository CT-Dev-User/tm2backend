import mongoose from 'mongoose';

const morqueDataSchema = new mongoose.Schema({
    batchStarts: { type: String },
    seats: { type: String }
});

const morqueDataModel = mongoose.model('morqueData', morqueDataSchema);

export default morqueDataModel;