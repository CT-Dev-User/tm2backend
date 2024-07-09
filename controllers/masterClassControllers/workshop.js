import workshopModel from '../../models/masterClassModels/workshop.js';
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

// Create Workshop
export const createWorkshop = async (req, res) => {
    try {
        const { title, subtitle, workshopData } = req.body;
        const parsedData = { workshopData: JSON.parse(workshopData || '{}') };

        // Handle file uploads for workshopData
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

        await handleArrayFileUploads('workshopImage', parsedData.workshopData.data || [], 'image');

        const newWorkshop = new workshopModel({
            title,
            subtitle,
            workshopData: parsedData.workshopData
        });

        await newWorkshop.save();
        res.status(201).json({ message: 'Workshop created successfully', newWorkshop });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Workshop', error: error.message });
    }
};

// Get Workshop by ID
export const getWorkshop = async (req, res) => {
    try {
        const { id } = req.params;
        const workshop = await workshopModel.findById(id);
        if (!workshop) return res.status(404).json({ error: 'Workshop not found' });
        res.status(200).json(workshop);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Workshop by ID
export const updateWorkshop = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, subtitle, workshopData } = req.body;
        const parsedData = { workshopData: JSON.parse(workshopData || '{}') };

        // Handle file uploads for workshopData
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

        await handleArrayFileUploads('workshopImage', parsedData.workshopData.data || [], 'image');

        const updatedWorkshop = await workshopModel.findByIdAndUpdate(id, {
            title,
            subtitle,
            workshopData: parsedData.workshopData
        }, { new: true });

        if (!updatedWorkshop) return res.status(404).json({ error: 'Workshop not found' });

        res.status(200).json(updatedWorkshop);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Workshop', error: error.message });
    }
};

// Delete Workshop by ID
export const deleteWorkshop = async (req, res) => {
    try {
        const { id } = req.params;
        const workshop = await workshopModel.findByIdAndDelete(id);
        if (!workshop) return res.status(404).json({ error: 'Workshop not found' });

        res.status(200).json({ message: 'Workshop deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
