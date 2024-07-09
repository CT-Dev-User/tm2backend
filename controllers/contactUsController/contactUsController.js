import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs';
import contactUsModel from '../../models/contactUs/contactUsModel.js';


// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath);
        return result.secure_url;
    } catch (error) {
        throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
    }
};

export const createContactUs = async (req, res) => {
    try {
        const {
            headerData,
            address,
            CompanyContactData
        } = req.body;

        const parseData = {
            headerData: JSON.parse(headerData || '{}'),
            CompanyContactData: JSON.parse(CompanyContactData || '[]')
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

        await handleObjectFileUploads('headerImage', parseData.headerData, 'headerImage');

        let buildingImgUrl = '';
        if (req.files && req.files['buildingImg']) {
            const file = req.files['buildingImg'][0];
            buildingImgUrl = await uploadToCloudinary(file.path);
            fs.unlinkSync(file.path);
        }

        const contactUsPage = new contactUsModel({
            headerData: parseData.headerData,
            CompanyContactData: parseData.CompanyContactData,
            address,
            buildingImg: buildingImgUrl
        });

        await contactUsPage.save();
        res.status(201).json({ message: 'Contact Us Page created successfully', contactUsPage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Contact Us Page', error: error.message });
    }
};



// Get all contact us Pages Data
export const getAllContactUsData = async (req, res) => {
    try {
        const pages = await contactUsModel.find();
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete contact us Page by ID
export const deleteContactUsDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await contactUsModel.findByIdAndDelete(id);
        if (!page) return res.status(404).json({ error: 'contact Us Page not found' });

        res.status(200).json({ message: 'contact Us Page deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};