import masterClassSubPageModel from '../../../models/masterClassModels/MasterClassSubPage/masterClassSubPage.js';
import cloudinary from '../../../middlware/cloudinary.js';
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

// Create MasterClass SubPage
export const createMasterClassSubPage = async (req, res) => {
    try {
        const {
            headerData,
            masterClassSchedule,
            aboutThisMasterClass,
            thisMasterClassFor,
            aboutTm,
            ourMission,
            aboutMasterClass,
            upComingEvents
        } = req.body;

        const parsedData = {
            headerData: JSON.parse(headerData || '{}'),
            masterClassSchedule: JSON.parse(masterClassSchedule || '[]'),
            aboutThisMasterClass: JSON.parse(aboutThisMasterClass || '{}'),
            thisMasterClassFor: JSON.parse(thisMasterClassFor || '[]'),
            aboutTm: JSON.parse(aboutTm || '{}'),
            ourMission: JSON.parse(ourMission || '[]'),
            aboutMasterClass: JSON.parse(aboutMasterClass || '{}'),
            upComingEvents: JSON.parse(upComingEvents || '[]')
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

        await handleObjectFileUploads('headerImg', [parsedData.headerData], 'headerImg');
        await handleArrayFileUploads('mentorProfileImage', parsedData.aboutThisMasterClass.mentorData || [], 'mentorProfileImage');
        await handleArrayFileUploads('companyLogo', parsedData.aboutThisMasterClass.mentorData || [], 'companyLogo');
        await handleArrayFileUploads('thisMasterClassForlogo', parsedData.thisMasterClassFor || [], 'logo');
        await handleArrayFileUploads('upComingEventsMentorProfileImage', parsedData.upComingEvents || [], 'mentorProfileImage');

        const newMasterClassSubPage = new masterClassSubPageModel({
            headerData: parsedData.headerData,
            masterClassSchedule: parsedData.masterClassSchedule,
            aboutThisMasterClass: parsedData.aboutThisMasterClass,
            thisMasterClassFor: parsedData.thisMasterClassFor,
            aboutTm: parsedData.aboutTm,
            ourMission: parsedData.ourMission,
            aboutMasterClass: parsedData.aboutMasterClass,
            upComingEvents: parsedData.upComingEvents
        });

        await newMasterClassSubPage.save();
        res.status(201).json({ message: 'MasterClass SubPage created successfully', newMasterClassSubPage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating MasterClass SubPage', error: error.message });
    }
};

// Get MasterClass SubPage by ID
export const getMasterClassSubPage = async (req, res) => {
    try {
        const masterClassSubPage = await masterClassSubPageModel.find();
        if (!masterClassSubPage) return res.status(404).json({ error: 'MasterClass SubPage not found' });
        res.status(200).json(masterClassSubPage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete MasterClass SubPage by ID
export const deleteMasterClassSubPage = async (req, res) => {
    try {
        const { id } = req.params;
        const masterClassSubPage = await masterClassSubPageModel.findByIdAndDelete(id);
        if (!masterClassSubPage) return res.status(404).json({ error: 'MasterClass SubPage not found' });

        res.status(200).json({ message: 'MasterClass SubPage deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
