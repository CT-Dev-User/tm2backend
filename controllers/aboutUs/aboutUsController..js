import aboutUsModel from "../../models/aboutUs/aboutUsModel.js";
import cloudinary from "../../middlware/cloudinary.js";
import fs from 'fs'

// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    console.log(filePath, "filepath");
    const result = await cloudinary.v2.uploader.upload(filePath);
    return result.secure_url;
};

export const createAboutUsPage = async (req, res) => {
    try {
        const headerData = JSON.parse(req.body.headerData)
        const aboutUsDesc = JSON.parse(req.body.aboutUsDesc)
        const ourTeam = JSON.parse(req.body.ourTeam)
        const ourPartener = JSON.parse(req.body.ourPartener)
        const gallery = JSON.parse(req.body.gallery);
        const programsWeProvide = JSON.parse(req.body.programsWeProvide)




        if (req.files) {
            if (req.files.headerImg) {
                const headerImageUrl = await uploadToCloudinary(req.files.headerImg[0].path);
                headerData.headerImg = headerImageUrl;
                fs.unlinkSync(req.files.headerImg[0].path)
            }
            if (req.files.Aboutimage) {
                const AboutimageUrl = await uploadToCloudinary(req.files.Aboutimage[0].path);
                aboutUsDesc.Aboutimage = AboutimageUrl;
                fs.unlinkSync(req.files.Aboutimage[0].path)
            }

            if (req.files.socialIconLogo) {
                for (let i = 0; i < req.files.socialIconLogo.length; i++) {
                    const socialIconUrl = await uploadToCloudinary(req.files.socialIconLogo[i].path);
                    aboutUsDesc.socialIcon[i].icon = socialIconUrl;
                    fs.unlinkSync(req.files.socialIconLogo[i].path)
                }
            }
            if (req.files.memberProfilePic) {
                for (let i = 0; i < req.files.memberProfilePic.length; i++) {
                    const memberProfilePicUrl = await uploadToCloudinary(req.files.memberProfilePic[i].path)
                    ourTeam.team[i].memberProfilePic = memberProfilePicUrl;
                    fs.unlinkSync(req.files.memberProfilePic[i].path)
                }
            }
            if (req.files.companyLogo) {
                for (let i = 0; i < req.files.companyLogo.length; i++) {
                    const companyLogoUrl = await uploadToCloudinary(req.files.companyLogo[i].path);
                    ourPartener[i].companyLogo = companyLogoUrl;
                    fs.unlinkSync(req.files.companyLogo[i].path)
                }
            }
            if (req.files.galleryImage) {
                for (let i = 0; i < req.files.galleryImage.length; i++) {
                    const galleryImageUrl = await uploadToCloudinary(req.files.galleryImage[i].path);
                    gallery[i].image = galleryImageUrl;
                    fs.unlinkSync(req.files.galleryImage[i].path)
                }
            }
        }
        const aboutUsPageData = new aboutUsModel({
            headerData,
            aboutUsDesc,
            ourTeam,
            ourPartener,
            gallery,
            programsWeProvide,
        })
        await aboutUsPageData.save();
        res.status(201).json(aboutUsPageData)

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}

// Get about us Page Data
export const getAllAboutUsData = async (req, res) => {
    try {
        const AboutUsDataData = await aboutUsModel.find();
        res.status(200).json(AboutUsDataData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete about us Page Data by ID
export const deleteAboutUsPageData = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAboutUsPageData = await aboutUsModel.findByIdAndDelete(id);

        if (!deletedAboutUsPageData) {
            return res.status(404).json({ message: 'about Us Page Data not found' });
        }

        res.status(200).json({ message: 'about Us Page Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};