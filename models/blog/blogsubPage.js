import mongoose from 'mongoose';

const blogsubPageSchema = new mongoose.Schema({
    blogCategory: { type: String },
    headerData: {
        title: { type: String },
        subTitle: { type: String },
        headerImage: { type: String }
    },
    title: { type: String },
    date: { type: String },
    readTime: { type: String },
    views: { type: String },
    blogData: [{
        title: { type: String },
        desc: { type: String }
    }],
    relatedCourse: {
        title: { type: String },
        subTitle: { type: String },
        courseData: [{
            courseName: { type: String },
            courseImage: { type: String },
            star: { type: Number },
            rating: { type: String },
            enrollements: { type: String },
            courseLevel: { type: String },
        }]
    },
    similarBlog: {
        title: { type: String },
        subTitle: { type: String },
        blogs: [{
            blogImage: { type: String },
            title: { type: String },
            date: { type: String },
            readTime: { type: String },
        }]
    }

});

const blogsubPageModel = mongoose.model('blogsubPage', blogsubPageSchema);

export default blogsubPageModel;