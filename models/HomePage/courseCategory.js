import mongoose from 'mongoose';

const HomePageCoursesSchema = new mongoose.Schema({
    Coursecategory: { type: String, required: true },
    logo: { type: String, required: true },
    points: [{ point: { type: String, required: true } }]
});

const HomePageCourses = mongoose.models.HomePageCourses || mongoose.model('HomePageCourses', HomePageCoursesSchema);

export default HomePageCourses;