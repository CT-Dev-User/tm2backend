import companyCollaborationModel from '../../models/companyCollab/companyCollab.js';
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

// Create Company Collaboration Page
export const createCompanyCollaborationPage = async (req, res) => {
    try {
        const {
            headerData,
            highLightsData,
            mouCollaborationDesc,
            ourParteners,
            companyCOllaborationsData,
            collaborationPhoto
        } = req.body;

        const parseData = {
            headerData: JSON.parse(headerData || '{}'),
            highLightsData: JSON.parse(highLightsData || '{}'),
            ourParteners: JSON.parse(ourParteners || '{}'),
            companyCOllaborationsData: JSON.parse(companyCOllaborationsData || '[]'),
            collaborationPhoto: JSON.parse(collaborationPhoto || '[]')
        };

        // Handle file uploads and update parseData accordingly
        const handleFileUploads = async (fileKey, targetArray, propertyToUpdate) => {
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

        // Example usage:
        await handleFileUploads('headerImg', [parseData.headerData], 'headerImg');
        await handleFileUploads('Companylogos', parseData.headerData.Companylogos || [], 'companyLogo');
        await handleFileUploads('highLightsImage', [parseData.highLightsData], 'image');
        await handleFileUploads('ourPartenerImg', [parseData.ourParteners], 'ourPartenerImg');
        await handleFileUploads('companyLogoData', parseData.ourParteners.companyLogoData || [], 'companyLogo');
        await handleFileUploads('collaborationPhoto', parseData.collaborationPhoto || [], 'eventImage');

        const newCompanyCollaboration = new companyCollaborationModel({
            headerData: parseData.headerData,
            highLightsData: parseData.highLightsData,
            mouCollaborationDesc,
            ourParteners: parseData.ourParteners,
            companyCOllaborationsData: parseData.companyCOllaborationsData,
            collaborationPhoto: parseData.collaborationPhoto
        });

        await newCompanyCollaboration.save();
        res.status(201).json({ message: 'Company Collaboration Page created successfully', newCompanyCollaboration });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Company Collaboration Page', error: error.message });
    }
};

// Get Company Collaboration Page by ID
export const getCompanyCollaborationPage = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await companyCollaborationModel.findById(id);
        if (!page) return res.status(404).json({ error: 'Company Collaboration Page not found' });
        res.status(200).json(page);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Update Company Collaboration Page by ID
export const updateCompanyCollaborationPage = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            headerData,
            highLightsData,
            mouCollaborationDesc,
            ourParteners,
            companyCOllaborationsData,
            collaborationPhoto
        } = req.body;

        const parseData = {
            headerData: JSON.parse(headerData || '{}'),
            highLightsData: JSON.parse(highLightsData || '{}'),
            ourParteners: JSON.parse(ourParteners || '{}'),
            companyCOllaborationsData: JSON.parse(companyCOllaborationsData || '[]'),
            collaborationPhoto: JSON.parse(collaborationPhoto || '[]')
        };

        // Handle file uploads and update parseData accordingly
        const handleFileUploads = async (fileKey, targetArray, propertyToUpdate) => {
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

        // Example usage:
        await handleFileUploads('headerImg', [parseData.headerData], 'headerImg');
        await handleFileUploads('Companylogos', parseData.headerData.Companylogos || [], 'companyLogo');
        await handleFileUploads('highLightsImage', [parseData.highLightsData], 'image');
        await handleFileUploads('ourPartenerImg', [parseData.ourParteners], 'ourPartenerImg');
        await handleFileUploads('companyLogoData', parseData.ourParteners.companyLogoData || [], 'companyLogo');
        await handleFileUploads('collaborationPhoto', parseData.collaborationPhoto || [], 'eventImage');

        const updatedCompanyCollaboration = await companyCollaborationModel.findByIdAndUpdate(id, {
            headerData: parseData.headerData,
            highLightsData: parseData.highLightsData,
            mouCollaborationDesc,
            ourParteners: parseData.ourParteners,
            companyCOllaborationsData: parseData.companyCOllaborationsData,
            collaborationPhoto: parseData.collaborationPhoto
        }, { new: true });

        if (!updatedCompanyCollaboration) return res.status(404).json({ error: 'Company Collaboration Page not found' });

        res.status(200).json(updatedCompanyCollaboration);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Company Collaboration Page', error: error.message });
    }
};

// Delete College Collaboration Page by ID
export const deleteCompanyCollaborationPage = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the document by ID
        const page = await companyCollaborationModel.findById(id);

        // If document does not exist, return 404
        if (!page) return res.status(404).json({ error: 'College Collaboration Page not found' });

        // Delete the document
        await collegeCollaborationModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'College Collaboration Page deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


