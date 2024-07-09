import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs';
import becomeInstructorModel from '../../models/becomeInstructor/becomeInstructorModel.js';

// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    const result = await cloudinary.v2.uploader.upload(filePath);
    return result.secure_url;
};

export const createBecomeInstructorData = async (req, res) => {
    try {
        const {
            headerData,
            becomeInstructorInfo,
            What_is_for_you,
            whatDoesItTake,
            whyMentorWithUs
        } = req.body;

        const parseData = {
            headerData: JSON.parse(headerData || '{}'),
            becomeInstructorInfo: JSON.parse(becomeInstructorInfo || '{}'),
            What_is_for_you: JSON.parse(What_is_for_you || '{}'),
            whatDoesItTake: JSON.parse(whatDoesItTake || '{}'),
            whyMentorWithUs: JSON.parse(whyMentorWithUs || '{}'),
        };

        if (req.files) {
            if (req.files.headerImage) {
                const headerImgResult = await uploadToCloudinary(req.files.headerImage[0].path);
                parseData.headerData.headerImage = headerImgResult;
                try {
                    fs.unlinkSync(req.files.headerImage[0].path);
                } catch (err) {
                    console.error(`Error deleting file: ${req.files.headerImage[0].path}`, err);
                }
            }
            if (req.files.becomeInstructorInfoImg1) {
                const becomeInstructorInfoImg1Result = await uploadToCloudinary(req.files.becomeInstructorInfoImg1[0].path);
                parseData.becomeInstructorInfo.image1 = becomeInstructorInfoImg1Result;
                try {
                    fs.unlinkSync(req.files.becomeInstructorInfoImg1[0].path);
                } catch (err) {
                    console.error(`Error deleting file: ${req.files.becomeInstructorInfoImg1[0].path}`, err);
                }
            }
            if (req.files.becomeInstructorInfoImg2) {
                const becomeInstructorInfoImg2Result = await uploadToCloudinary(req.files.becomeInstructorInfoImg2[0].path);
                parseData.becomeInstructorInfo.image2 = becomeInstructorInfoImg2Result;
                try {
                    fs.unlinkSync(req.files.becomeInstructorInfoImg2[0].path);
                } catch (err) {
                    console.error(`Error deleting file: ${req.files.becomeInstructorInfoImg2[0].path}`, err);
                }
            }
            if (req.files.becomeInstructorInfoImg3) {
                const becomeInstructorInfoImg3Result = await uploadToCloudinary(req.files.becomeInstructorInfoImg3[0].path);
                parseData.becomeInstructorInfo.image3 = becomeInstructorInfoImg3Result;
                try {
                    fs.unlinkSync(req.files.becomeInstructorInfoImg3[0].path);
                } catch (err) {
                    console.error(`Error deleting file: ${req.files.becomeInstructorInfoImg3[0].path}`, err);
                }
            }
            if (req.files.WhatDoesItTakeImg) {
                for (let i = 0; i < req.files.WhatDoesItTakeImg.length; i++) {
                    const WhatDoesItTakeImgResult = await uploadToCloudinary(req.files.WhatDoesItTakeImg[i].path);
                    parseData.whatDoesItTake.data[i].Image = WhatDoesItTakeImgResult;
                    try {
                        fs.unlinkSync(req.files.WhatDoesItTakeImg[i].path);
                    } catch (err) {
                        console.error(`Error deleting file: ${req.files.WhatDoesItTakeImg[i].path}`, err);
                    }
                }
            }
            

            if (req.files.whatDoesItTakeImg) {
                const whatDoesItTakeImgResult = await uploadToCloudinary(req.files.whatDoesItTakeImg[0].path);
                parseData.whatDoesItTake.Image = whatDoesItTakeImgResult;
                try {
                    fs.unlinkSync(req.files.whatDoesItTakeImg[0].path);
                } catch (err) {
                    console.error(`Error deleting file: ${req.files.whatDoesItTakeImg[0].path}`, err);
                }
            }
            if (req.files.whyMentorWithUsImg) {
                const whyMentorWithUsImgResult = await uploadToCloudinary(req.files.whyMentorWithUsImg[0].path);
                parseData.whyMentorWithUs.Image = whyMentorWithUsImgResult;
                try {
                    fs.unlinkSync(req.files.whyMentorWithUsImg[0].path);
                } catch (err) {
                    console.error(`Error deleting file: ${req.files.whyMentorWithUsImg[0].path}`, err);
                }
            }
        }

        const becomeInstructorPage = new becomeInstructorModel({
            headerData: parseData.headerData,
            becomeInstructorInfo: parseData.becomeInstructorInfo,
            What_is_for_you: parseData.What_is_for_you,
            whatDoesItTake: parseData.whatDoesItTake,
            whyMentorWithUs: parseData.whyMentorWithUs,
        });

        await becomeInstructorPage.save();
        res.status(201).json({
            message: 'Become Instructor Page created successfully', becomeInstructorPage
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Become Instructor data Page', error: error.message });
    }
};


export const getBecomeInstructor = async (req, res) => {
    try {
        const pages = await becomeInstructorModel.find();
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteBecomeInstructor = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await becomeInstructorModel.findByIdAndDelete(id);
        if (!page) return res.status(404).json({ error: 'become instructor data Page not found' });

        res.status(200).json({ message: 'Error deleting become instructor data Page' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};