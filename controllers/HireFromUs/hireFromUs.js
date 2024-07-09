import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs';
import hireFromUsModel from '../../models/HireFromUs/hireFromUsModel.js';

// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath);
        return result.secure_url;
    } catch (error) {
        throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
    }
};

export const createHireFromUsPage = async (req, res) => {
    try {
        const {
            headerData,
            companiesHireFromUs,
            candidateRole,
            pastHiringProcessOverview

        } = req.body
        const parseData = {
            headerData: JSON.parse(headerData || '{}'),
            companiesHireFromUs: JSON.parse(companiesHireFromUs || '{}'),
            candidateRole: JSON.parse(candidateRole || '{}'),
            pastHiringProcessOverview: JSON.parse(pastHiringProcessOverview || '{}')
        };

        
        // handle object file upload
        const handleObjectFileUploads = async (fileKey, targetObject, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                const file = req.files[fileKey][0];
                const imageUrl = await uploadToCloudinary(file.path);
                targetObject[propertyToUpdate] = imageUrl;
                fs.unlinkSync(file.path);
            }
        };

        // handle array file upload
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

        // Example file uploads usage:
        await handleObjectFileUploads('headerImage', [parseData.headerData], 'headerImage');
        await handleArrayFileUploads('companyLogosImages', parseData.companiesHireFromUs.companyLogos || [], 'logo');
        await handleArrayFileUploads('TechnicalHighlightsLogos', parseData.candidateRole.Technical_Highlights || [], 'logo');
        await handleArrayFileUploads('toolsCoveredLogo', parseData.candidateRole.toolsCovered || [], 'toolLogo');


        const hireFromUsPage = new hireFromUsModel({
            headerData: parseData.headerData,
            companiesHireFromUs: parseData.companiesHireFromUs,
            candidateRole: parseData.candidateRole,
            pastHiringProcessOverview: parseData.pastHiringProcessOverview,


        })
        await hireFromUsPage.save();
        res.status(201).json({ message: 'Hire from Us Page created successfully', hireFromUsPage })
    } catch (error) {
        res.status(500).json({ message: 'Error creating Hire from Us Page', error: error.message });
    }
}

// Get all hire from us  Pages Data
export const getAllHireFromUsData = async (req, res) => {
    try {
        const pages = await hireFromUsModel.find();
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all hire from us Pages by category
export const getHireFromUsDataById = async (req, res) => {
    try {
        const pages = await hireFromUsModel.find({ _id: req.params.id });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete hire from us Page by ID
export const deleteHireFromUsDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await hireFromUsModel.findByIdAndDelete(id);
        if (!page) return res.status(404).json({ error: 'L3 Page not found' });

        res.status(200).json({ message: 'L3 Page deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};