import { L2PageModel } from '../../models/L2Model/L2Model.js';
import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs'
// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    console.log(filePath, "filepath");
    const result = await cloudinary.v2.uploader.upload(filePath);
    return result.secure_url;
};

// Create a new L2 Page Data
export const createL2PageData = async (req, res) => {
    try {
        console.log(req.body);
        // Parse stringified JSON
        const Coursecategory = req.body.Coursecategory;
        const headerData = JSON.parse(req.body.headerData);
        const WhyNeedMasterClass = JSON.parse(req.body.WhyNeedMasterClass);
        const extensiveProgram = JSON.parse(req.body.extensiveProgram);
        const crashCourseData = JSON.parse(req.body.crashCourseData);
        const practionersData = JSON.parse(req.body.practionersData);
        const masterClassData = JSON.parse(req.body.masterClassData);

        console.log(req.files, "files data");

        // Handle file uploads for header image and profile images
        if (req.files) {
            if (req.files.headerImage) {
                const headerImageUrl = await uploadToCloudinary(req.files.headerImage[0].path);
                headerData.headerImage = headerImageUrl;
                fs.unlinkSync(req.files.headerImage[0].path);
            }

            if (req.files.practioners) {
                for (let i = 0; i < req.files.practioners.length; i++) {
                    const profileImageUrl = await uploadToCloudinary(req.files.practioners[i].path);
                    practionersData.practioners[i].pxrofileImage = profileImageUrl;
                    fs.unlinkSync(req.files.practioners[i].path);
                }
            }

            if (req.files.masterClass) {
                for (let i = 0; i < req.files.masterClass.length; i++) {
                    const profileImageUrl = await uploadToCloudinary(req.files.masterClass[i].path);
                    masterClassData.masterClass[i].profileImage = profileImageUrl;
                    fs.unlinkSync(req.files.masterClass[i].path);
                }
            }

            if (req.files.companyLogoImages) {
                const companyLogoImages = [];
                for (let i = 0; i < req.files.companyLogoImages.length; i++) {
                    const logoUrl = await uploadToCloudinary(req.files.companyLogoImages[i].path);
                    companyLogoImages.push({ logo: logoUrl });
                    fs.unlinkSync(req.files.companyLogoImages[i].path);
                }
                // Assuming practionersData is a model instance or similar
                practionersData.companyLogoImages = companyLogoImages;
            }
        }
        const newL2PageData = new L2PageModel({
            Coursecategory,
            headerData,
            WhyNeedMasterClass,
            extensiveProgram,
            crashCourseData,
            practionersData,
            masterClassData
        });

        await newL2PageData.save();
        res.status(201).json(newL2PageData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all L2 Page Data
export const getAllL2PageData = async (req, res) => {
    try {
        const l2PageData = await L2PageModel.find();
        res.status(200).json(l2PageData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get L2 Page Data by ID
export const getL2PageDataById = async (req, res) => {
    const { id } = req.params;
    try {
        const l2PageData = await L2PageModel.findById(id);
        if (!l2PageData) {
            return res.status(404).json({ message: 'L2 Page Data not found' });
        }
        res.status(200).json(l2PageData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get L2 Page Data by Course Category
export const getL2PageDataByCourseCategory = async (req, res) => {
    const { Coursecategory } = req.params;
    try {
        const l2PageData = await L2PageModel.findOne({ Coursecategory });
        if (!l2PageData) {
            return res.status(404).json({ message: 'L2 Page Data not found' });
        }
        res.status(200).json(l2PageData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update L2 Page Data by ID
export const updateL2PageData = async (req, res) => {
    const { id } = req.params;
    const { Coursecategory, headerData, WhyNeedMasterClass, extensiveProgram, crashCourseData, practionersData, masterClassData } = req.body;

    try {
        // Handle file uploads for header image and profile images
        if (req.files) {
            if (req.files.headerImage) {
                const result = await uploadToCloudinary(req.files.headerImage[0].path);
                headerData.headerImage = result.secure_url;
                console.log(headerData, "<================headerdata")
            }

            if (req.files.practioners) {
                for (let i = 0; i < practionersData.practioners.length; i++) {
                    const result = await uploadToCloudinary(req.files.practioners[i].path);
                    practionersData.practioners[i].profileImage = result.secure_url;
                }
            }

            if (req.files.masterClass) {
                for (let i = 0; i < masterClassData.masterClass.length; i++) {
                    const result = await uploadToCloudinary(req.files.masterClass[i].path);
                    masterClassData.masterClass[i].speakersData.profileImage = result.secure_url;
                }
            }

            if (req.files.companyLogoImages) {
                for (let i = 0; i < req.files.companyLogoImages.length; i++) {
                    const logoUrl = await uploadToCloudinary(req.files.companyLogoImages[i].path);
                    practionersData.companyLogoImages[i].logo = logoUrl;
                }
            }
        }

        const updatedL2PageData = await L2PageModel.findByIdAndUpdate(
            id,
            {
                Coursecategory,
                headerData,
                WhyNeedMasterClass,
                extensiveProgram,
                crashCourseData,
                practionersData,
                masterClassData
            },
            { new: true, runValidators: true }
        );

        if (!updatedL2PageData) {
            return res.status(404).json({ message: 'L2 Page Data not found' });
        }

        res.status(200).json(updatedL2PageData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete L2 Page Data by ID
export const deleteL2PageData = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedL2PageData = await L2PageModel.findByIdAndDelete(id);

        if (!deletedL2PageData) {
            return res.status(404).json({ message: 'L2 Page Data not found' });
        }

        res.status(200).json({ message: 'L2 Page Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
