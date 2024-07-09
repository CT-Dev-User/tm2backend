import referAndEarnModel from '../../models/referAndEarnModel/referAndEarn.js';
import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs';

// Function to upload image to Cloudinary
const uploadToCloudinary = async (filePath) => {
    console.log(filePath, "filepath");
    const result = await cloudinary.v2.uploader.upload(filePath);
    return result.secure_url;
};


export const createReferAndEarnData = async (req, res) => {
    try {
        const { heading, subTitle, title, subTitleReward, desc, programHighlights } = req.body;

        let headerImageUrl = '';
        let earnGreatRewardImageUrl = '';

        // Upload files to Cloudinary if they exist
        if (req.files) {
            if (req.files.headerImg) {
                const headerImgResult = await uploadToCloudinary(req.files.headerImg[0].path);
                headerImageUrl = headerImgResult;
                fs.unlinkSync(req.files.headerImg[0].path);
            }
            if (req.files.earnGreatRewardImage) {
                const earnGreatRewardImgResult = await uploadToCloudinary(req.files.earnGreatRewardImage[0].path);
                earnGreatRewardImageUrl = earnGreatRewardImgResult;
                fs.unlinkSync(req.files.earnGreatRewardImage[0].path);
            }
        }

        // Parse programHighlights JSON string
        const parsedProgramHighlights = JSON.parse(programHighlights);

        // Create new entry with Cloudinary image URL
        const newReferAndEarnData = new referAndEarnModel({
            headerData: {
                headerImg: headerImageUrl,
                heading,
                subTitle
            },
            earnGreatReward: {
                title,
                subTitle: subTitleReward,
                image: earnGreatRewardImageUrl, // Use Cloudinary URL
                desc,
                programHighlights: parsedProgramHighlights.map(highlight => ({
                    point: highlight.point
                }))
            }
        });

        await newReferAndEarnData.save();
        res.status(201).json(newReferAndEarnData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Controller function to get all refer and earn data entries
export const getAllReferAndEarnData = async (req, res) => {
    try {
        const referAndEarnData = await referAndEarnModel.find();
        res.status(200).json(referAndEarnData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get a single refer and earn data entry by ID
export const getReferAndEarnDataById = async (req, res) => {
    try {
        const referAndEarnData = await referAndEarnModel.findById(req.params.id);
        if (!referAndEarnData) return res.status(404).json({ message: 'Refer and Earn data not found' });
        res.status(200).json(referAndEarnData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteReferAndEarnDataById = async (req, res) => {
    try {
        const deletedData = await referAndEarnModel.findByIdAndDelete(req.params.id);
        if (!deletedData) {
            return res.status(404).json({ message: 'Refer and Earn data not found' });
        }
        res.status(200).json({ message: 'Refer and Earn data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};