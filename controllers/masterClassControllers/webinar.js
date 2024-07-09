import webinarModel from '../../models/masterClassModels/webinar.js';
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

// Create Webinar
export const createWebinar = async (req, res) => {
    try {
        const { title, subtitle, webinarData } = req.body;
        const parsedData ={ webinarData: JSON.parse(webinarData || '{}')};

        // Handle file uploads for webinarData
      
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

        await handleArrayFileUploads('webinarImage', parsedData.webinarData.data || [], 'image');

        const newWebinar = new webinarModel({
            title,
            subtitle,
            webinarData: parsedData.webinarData
        });

        await newWebinar.save();
        res.status(201).json({ message: 'Webinar created successfully', newWebinar });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Webinar', error: error.message });
    }
};

// Get Webinar by ID
export const getWebinar = async (req, res) => {
    try {
        const { id } = req.params;
        const webinar = await webinarModel.findById(id);
        if (!webinar) return res.status(404).json({ error: 'Webinar not found' });
        res.status(200).json(webinar);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Delete Webinar by ID
export const deleteWebinar = async (req, res) => {
    try {
        const { id } = req.params;
        const webinar = await webinarModel.findByIdAndDelete(id);
        if (!webinar) return res.status(404).json({ error: 'Webinar not found' });

        res.status(200).json({ message: 'Webinar deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
