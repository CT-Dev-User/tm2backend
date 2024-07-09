import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs';
import placedProfileTestimonialsModels from '../../models/placedProfilesNTestimonials/PlacedProfileNTestimonials.js';


// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath);
        return result.secure_url;
    } catch (error) {
        throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
    }
};

export const createPlacedProfileTestimonials = async (req, res) => {
    try {
        const {
            headerData,
            relatedProgram,
            tesimonials
        } = req.body

        const parseData = {
            headerData: JSON.parse(headerData || '{}'),
            relatedProgram: JSON.parse(relatedProgram || '[]'),
            tesimonials: JSON.parse(tesimonials || '[]')
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
        await handleArrayFileUploads('relatedProgramImage', parseData.relatedProgram || [], 'programImg');
        await handleArrayFileUploads('tesimonialsReviewvideo', parseData.tesimonials || [], 'reviewVideo');


        const P2TestimonialsPage = new placedProfileTestimonialsModels({
            headerData: parseData.headerData,
            relatedProgram: parseData.relatedProgram,
            tesimonials: parseData.tesimonials
        })

        await P2TestimonialsPage.save();
        res.status(201).json({ message: 'Placed Profile Testimonials Page created successfully', P2TestimonialsPage })


    } catch (error) {
        res.status(500).json({ message: 'Error creating Contact Us Page', error: error.message });

    }
}


export const getPlacedProfilePagesData = async (req, res) => {
    try {
        const pages = await placedProfileTestimonialsModels.find();
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
export const deletePlacedProfilePageData = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAboutUsPageData = await placedProfileTestimonialsModels.findByIdAndDelete(id);

        if (!deletedAboutUsPageData) {
            return res.status(404).json({ message: 'about Us Page Data not found' });
        }

        res.status(200).json({ message: 'about Us Page Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
