import mainBlogPageModel from '../../models/blog/mainBlogPage.js';
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

// Create Main Blog Page
export const createMainBlogPage = async (req, res) => {
    try {
        const {
            headerData,
            recentBlog,
            recentRelatedBlog,
            ourBlog,
            relatedCourse
        } = req.body;

        const parsedData = {
            headerData: JSON.parse(headerData || '{}'),
            recentBlog: JSON.parse(recentBlog || '{}'),
            recentRelatedBlog: JSON.parse(recentRelatedBlog || '[]'),
            ourBlog: JSON.parse(ourBlog || '{}'),
            relatedCourse: JSON.parse(relatedCourse || '{}')
        };

        await handleObjectFileUploads('headerImage', parsedData.headerData, 'headerImage');
        await handleObjectFileUploads('blogImg', parsedData.recentBlog, 'blogImg');
        await handleArrayFileUploads('recentRelatedBlogImages', parsedData.recentRelatedBlog || [], 'blogImg');
        await handleArrayFileUploads('ourBlogImages', parsedData.ourBlog.blogData || [], 'blogImg');
        await handleArrayFileUploads('relatedCourseImages', parsedData.relatedCourse.courseData || [], 'courseImage');

        const newMainBlogPage = new mainBlogPageModel({
            headerData: parsedData.headerData,
            recentBlog: parsedData.recentBlog,
            recentRelatedBlog: parsedData.recentRelatedBlog,
            ourBlog: parsedData.ourBlog,
            relatedCourse: parsedData.relatedCourse
        });

        await newMainBlogPage.save();
        res.status(201).json({ message: 'Main Blog Page created successfully', newMainBlogPage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Main Blog Page', error: error.message });
    }
};

// Get Main Blog Page by ID
export const getMainBlogPage = async (req, res) => {
    try {
        const mainBlogPage = await mainBlogPageModel.find();
        if (!mainBlogPage) return res.status(404).json({ error: 'Main Blog Page not found' });
        res.status(200).json(mainBlogPage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete Main Blog Page by ID
export const deleteMainBlogPage = async (req, res) => {
    try {
        const { id } = req.params;
        const mainBlogPage = await mainBlogPageModel.findByIdAndDelete(id);
        if (!mainBlogPage) return res.status(404).json({ error: 'Main Blog Page not found' });

        res.status(200).json({ message: 'Main Blog Page deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
