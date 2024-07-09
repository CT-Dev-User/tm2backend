import collegeCollaborationModel from '../../models/collegeCollab/collegeCollab.js';
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

// Create a new College Collaboration Page
export const createCollegeCollaborationPage = async (req, res) => {
    try {
        const {
            headerData,
            highLightsData,
            mouCollaborationDesc,
            ourParteners,
            collegeCOllaborationsData,
            collaborationPhoto
        } = req.body;

        // Parse JSON strings from request body
        const parseData = {
            headerData: JSON.parse(headerData || '{}'),
            highLightsData: JSON.parse(highLightsData || '{}'),
            mouCollaborationDesc: mouCollaborationDesc || '',
            ourParteners: JSON.parse(ourParteners || '{}'),
            collegeCOllaborationsData: JSON.parse(collegeCOllaborationsData || '[]'),
            collaborationPhoto: JSON.parse(collaborationPhoto || '[]')
        };

        // Handle file uploads and update parsedData accordingly
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

        await handleFileUploads('headerImg', [parseData.headerData], 'headerImg');
        await handleFileUploads('Companylogos', parseData.headerData.Companylogos || [], 'companyLogo');
        await handleFileUploads('highLightsImage', [parseData.highLightsData], 'image');
        await handleFileUploads('ourPartenerImg', [parseData.ourParteners], 'ourPartenerImg');
        await handleFileUploads('companyLogoData', parseData.ourParteners.companyLogoData || [], 'companyLogo');
        await handleFileUploads('collaborationPhoto', parseData.collaborationPhoto || [], 'eventImage');

        const newCollegeCollaboration = new collegeCollaborationModel({
            headerData: parseData.headerData,
            highLightsData: parseData.highLightsData,
            mouCollaborationDesc,
            ourParteners: parseData.ourParteners,
            collegeCOllaborationsData: parseData.collegeCOllaborationsData,
            collaborationPhoto: parseData.collaborationPhoto
        });

        await newCollegeCollaboration.save();
        res.status(201).json({ message: 'College Collaboration Page created successfully', newCollegeCollaboration });

    } catch (error) {
        res.status(500).json({ message: 'Error creating College Collaboration Page', error: error.message });
    }
};

// Get all College Collaboration Pages
export const getAllCollegeCollaborationPages = async (req, res) => {
    try {
        const pages = await collegeCollaborationModel.find();
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete College Collaboration Page by ID
export const deleteCollegeCollaborationPage = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the document by ID
        const page = await collegeCollaborationModel.findById(id);

        // If document does not exist, return 404
        if (!page) return res.status(404).json({ error: 'College Collaboration Page not found' });

        // Delete the document
        await collegeCollaborationModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'College Collaboration Page deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
