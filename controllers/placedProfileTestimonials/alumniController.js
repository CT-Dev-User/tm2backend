import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs';
import alumniModels from '../../models/placedProfilesNTestimonials/alumni.js';

// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath);
        return result.secure_url;
    } catch (error) {
        throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
    }
};

export const Addalumni = async (req, res) => {
    try {
        const {
            title,
            subTitle,
            data,
            alumniDataByCategory
        } = req.body;

        const parseData = {
            title,
            subTitle,
            data: JSON.parse(data || '[]'),
            alumniDataByCategory: JSON.parse(alumniDataByCategory || '{}')
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

        // // Handle file uploads for data array
        // for (let i = 0; i < parseData.data.length; i++) {
        //     await handleObjectFileUploads(`dataImage${i}`, parseData.data[i], 'image');
        // }

        // Handle file uploads for allAlumni array
        if (parseData.alumniDataByCategory && parseData.alumniDataByCategory.allAlumni) {
            for (let i = 0; i < parseData.alumniDataByCategory.allAlumni.length; i++) {
                await handleObjectFileUploads(`alumniProfileImage${i}`, parseData.alumniDataByCategory.allAlumni[i], 'alumniProfile');
            }
        }

        const newAlumni = new alumniModels({
            title: parseData.title,
            subTitle: parseData.subTitle,
            data: parseData.data,
            alumniDataByCategory: parseData.alumniDataByCategory
        });

        await newAlumni.save();
        res.status(201).json({ message: 'Alumni data added successfully', newAlumni });
    } catch (error) {
        res.status(500).json({ message: 'Error adding alumni data', error: error.message });
    }
};

// Get about us Page Data
export const getAllAlumniData = async (req, res) => {
    try {
        const AboutUsDataData = await alumniModels.find();
        res.status(200).json(AboutUsDataData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete about us Page Data by ID
export const deleteAlumniPageData = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPageData = await alumniModels.findByIdAndDelete(id);

        if (!deletedPageData) {
            return res.status(404).json({ message: 'about Us Page Data not found' });
        }

        res.status(200).json({ message: 'about Us Page Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
