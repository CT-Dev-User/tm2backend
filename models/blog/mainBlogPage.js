import mongoose from 'mongoose';

const mainBlogPageSchema = new mongoose.Schema({
    headerData: {
        title: { type: String },
        subTitle: { type: String },
        headerImage: { type: String }
    },
    recentBlog: {
        blogImg: { type: String },
        blogTitle: { type: String },
        date: { type: String },
        readTime: { type: String }
    },
    recentRelatedBlog: [{
        blogImg: { type: String },
        blogTitle: { type: String },
        date: { type: String },
        readTime: { type: String }
    }],
    ourBlog:{
        category:{type:String},
        blogData:[{
            blogImg: { type: String },
            blogTitle: { type: String },
            date: { type: String },
            readTime: { type: String }
        }]
    },
    relatedCourse:{
        title: { type: String },
        subTitle: { type: String },
        courseData: [{
            courseName: { type: String },
            courseImage: { type: String },
            star: { type: Number },
            rating: { type: String },
            enrollements: { type: String },
            courseLevel:{type: String},
        }]
    }
});
const mainBlogPageModel = mongoose.model('mainBlogPage', mainBlogPageSchema);

export default mainBlogPageModel;