import masterClassMainPageModel from '../../models/masterClassModels/masterClassMainPageModel.js';
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

// Create MasterClass Main Page

export const createMasterClassMainPage = async (req, res) => {
    try {
        const { headerData } = req.body;
        const parseData = { headerData: JSON.parse(headerData || '{}') };

        // Handle file uploads and update parseData accordingly

        // handle object file upload
        const handleObjectFileUploads = async (fileKey, targetObject, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                const file = req.files[fileKey][0];
                const imageUrl = await uploadToCloudinary(file.path);
                targetObject[propertyToUpdate] = imageUrl;
                fs.unlinkSync(file.path);
            }
        };

        await handleObjectFileUploads('headerImage', [parseData.headerData], 'headerImage');

        const newMasterClassMainPage = new masterClassMainPageModel({
            headerData: parseData.headerData
        });

        await newMasterClassMainPage.save();
        res.status(201).json({ message: 'MasterClass Main Page created successfully', newMasterClassMainPage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating MasterClass Main Page', error: error.message });
    }
};

// Get MasterClass Main Page by ID
export const getMasterClassMainPage = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await masterClassMainPageModel.findById(id);
        if (!page) return res.status(404).json({ error: 'MasterClass Main Page not found' });
        res.status(200).json(page);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update MasterClass Main Page by ID
export const updateMasterClassMainPage = async (req, res) => {
    try {
        const { id } = req.params;
        const { headerData } = req.body;
        const parseData = JSON.parse(headerData || '{}');

        // Handle file uploads and update parseData accordingly
        if (req.files && req.files.headerImg) {
            const imageUrl = await uploadToCloudinary(req.files.headerImg[0].path);
            parseData.headerImg = imageUrl;
            fs.unlinkSync(req.files.headerImg[0].path); // Delete local file after upload
        }

        const updatedMasterClassMainPage = await masterClassMainPageModel.findByIdAndUpdate(id, {
            headerData: parseData
        }, { new: true });

        if (!updatedMasterClassMainPage) return res.status(404).json({ error: 'MasterClass Main Page not found' });

        res.status(200).json(updatedMasterClassMainPage);
    } catch (error) {
        res.status(500).json({ message: 'Error updating MasterClass Main Page', error: error.message });
    }
};

// Delete MasterClass Main Page by ID
export const deleteMasterClassMainPage = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await masterClassMainPageModel.findByIdAndDelete(id);
        if (!page) return res.status(404).json({ error: 'MasterClass Main Page not found' });

        res.status(200).json({ message: 'MasterClass Main Page deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
