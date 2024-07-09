import blogsubPageModel from '../../models/blog/blogsubPage.js';
import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs';

// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath);
        return result.secure_url;
    } catch (error) {
        throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
    }
};

// Helper function to handle file uploads for objects
const handleObjectFileUploads = async (fileKey, targetObject, propertyToUpdate) => {
    if (req.files && req.files[fileKey]) {
        const file = req.files[fileKey][0];
        const imageUrl = await uploadToCloudinary(file.path);
        targetObject[propertyToUpdate] = imageUrl;
        fs.unlinkSync(file.path); // Delete local file after upload
    }
};

// Helper function to handle file uploads for arrays of objects
const handleArrayFileUploads = async (fileKey, targetArray, propertyToUpdate) => {
    if (req.files && req.files[fileKey]) {
        for (let i = 0; i < req.files[fileKey].length; i++) {
            const file = req.files[fileKey][i];
            const imageUrl = await uploadToCloudinary(file.path);
            if (targetArray[i]) {
                targetArray[i][propertyToUpdate] = imageUrl;
            }
            fs.unlinkSync(file.path); // Delete local file after upload
        }
    }
};

// Create Blog Sub Page
export const createBlogSubPage = async (req, res) => {
    try {
        const {
            blogCategory,
            headerData,
            title,
            date,
            readTime,
            views,
            blogData,
            relatedCourse,
            similarBlog
        } = req.body;

        const parsedData = {
            headerData: JSON.parse(headerData || '{}'),
            blogData: JSON.parse(blogData || '[]'),
            relatedCourse: JSON.parse(relatedCourse || '{}'),
            similarBlog: JSON.parse(similarBlog || '{}')
        };

        await handleObjectFileUploads('headerImage', parsedData.headerData, 'headerImage');
        await handleArrayFileUploads('courseImages', parsedData.relatedCourse.courseData || [], 'courseImage');
        await handleArrayFileUploads('similarBlogImages', parsedData.similarBlog.blogs || [], 'blogImage');

        const newBlogSubPage = new blogsubPageModel({
            blogCategory,
            headerData: parsedData.headerData,
            title,
            date,
            readTime,
            views,
            blogData: parsedData.blogData,
            relatedCourse: parsedData.relatedCourse,
            similarBlog: parsedData.similarBlog
        });

        await newBlogSubPage.save();
        res.status(201).json({ message: 'Blog Sub Page created successfully', newBlogSubPage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Blog Sub Page', error: error.message });
    }
};

// Get Blog Sub Page by ID
export const getBlogSubPage = async (req, res) => {
    try {
        const blogSubPage = await blogsubPageModel.find();
        if (!blogSubPage) return res.status(404).json({ error: 'Blog Sub Page not found' });
        res.status(200).json(blogSubPage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete Blog Sub Page by ID
export const deleteBlogSubPage = async (req, res) => {
    try {
        const { id } = req.params;
        const blogSubPage = await blogsubPageModel.findByIdAndDelete(id);
        if (!blogSubPage) return res.status(404).json({ error: 'Blog Sub Page not found' });

        res.status(200).json({ message: 'Blog Sub Page deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
