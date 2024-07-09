import masterClassModel from '../../models/masterClassModels/masterClasses.js';
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

// Create MasterClass
export const createMasterClass = async (req, res) => {
    try {
        const { title, subtitle, masterClassData } = req.body;
        const parsedData = { masterClassData: JSON.parse(masterClassData || '{}') };


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

        await handleArrayFileUploads('masterClassImage', parsedData.masterClassData.data || [], 'image');

        const newMasterClass = new masterClassModel({
            title,
            subtitle,
            masterClassData: parsedData.masterClassData
        });

        await newMasterClass.save();
        res.status(201).json({ message: 'MasterClass created successfully', newMasterClass });
    } catch (error) {
        res.status(500).json({ message: 'Error creating MasterClass', error: error.message });
    }
};

// Get MasterClass by ID
export const getMasterClass = async (req, res) => {
    try {
        const { id } = req.params;
        const masterClass = await masterClassModel.findById(id);
        if (!masterClass) return res.status(404).json({ error: 'MasterClass not found' });
        res.status(200).json(masterClass);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Delete MasterClass by ID
export const deleteMasterClass = async (req, res) => {
    try {
        const { id } = req.params;
        const masterClass = await masterClassModel.findByIdAndDelete(id);
        if (!masterClass) return res.status(404).json({ error: 'MasterClass not found' });

        res.status(200).json({ message: 'MasterClass deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
