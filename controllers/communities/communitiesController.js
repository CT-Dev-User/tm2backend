import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs';
import communitiesModel from '../../models/communities/communities.js';

// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath);
        return result.secure_url;
    } catch (error) {
        throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
    }
};

export const createCommunitiesPage = async (req, res) => {
    try {

    } catch (error) {
        const {
            headerData,
            instructors,
            creators,
            TmCommunity,
            relatedCourse,
            learningBetterWithTmCommunity
        } = req.body;

        const parseData = {
            headerData: JSON.parse(headerData || '{}'),
            instructors: JSON.parse(instructors || '[]'),
            creators: JSON.parse(creators || '[]'),
            TmCommunity: JSON.parse(TmCommunity || '[]'),
            relatedCourse: JSON.parse(relatedCourse || '[]'),
            learningBetterWithTmCommunity: JSON.parse(learningBetterWithTmCommunity || '[]'),
        }

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
        await handleObjectFileUploads('headerImage', [parseData.headerData], 'headerImage');
        await handleArrayFileUploads('instructorProfile', parseData.instructors || [], 'profileImg');
        await handleArrayFileUploads('creatorProfile', parseData.creators || [], 'profileImg');
        await handleArrayFileUploads('tmCommunityProfileImg ', parseData.TmCommunity.communitiesData || [] , '   profileImg');
        await handleArrayFileUploads('tmCommunitycompanyLogo', parseData.TmCommunity.communitiesData || [] , 'companyLogo');
        await handleArrayFileUploads('relatedCourseImg', parseData.relatedCourse.courseData || [], 'courseImage');
        await handleObjectFileUploads('learningBetterWithTmCommunityProfileImg ', parseData.learningBetterWithTmCommunity.communities || [], 'profileImg');

        const communitiesPage = new communitiesModel({
            headerData: parseData.headerData,
            instructors: parseData.instructors,
            creators: parseData.creators,
            TmCommunity: parseData.TmCommunity,
            relatedCourse: parseData.relatedCourse,
            learningBetterWithTmCommunity: parseData.learningBetterWithTmCommunity
        });

        await communitiesPage.save();
        res.status(201).json({ message: 'communities Page created successfully', communitiesPage });
    }
}

export const getCommunityPagesData = async (req, res) => {
    try {
        const pages = await communitiesModel.find();
        if (pages) {
            res.status(200).json(pages);
        } else {
            res.status(200).json("data not found")
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete comminity controller
 export const deletecommunityPageData = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAboutUsPageData = await communitiesModel.findByIdAndDelete(id);

        if (!deletedAboutUsPageData) {
            return res.status(404).json({ message: 'about Us Page Data not found' });
        }

        res.status(200).json({ message: 'about Us Page Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

