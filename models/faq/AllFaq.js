import mongoose from 'mongoose';

const faqDataSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
});

const faqDataModel =  mongoose.model('faqData', faqDataSchema);

export default faqDataModel;