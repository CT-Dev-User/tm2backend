import { L3PageModel } from '../../models/L3Model/L3Model.js';
import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs';

// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath);
        fs.unlinkSync(filePath);
        return result.secure_url;

    } catch (error) {
        throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
    }
};

// Create a new L3 Page
export const createL3Page = async (req, res) => {
    try {
        const {
            Coursecategory,
            course,
            headerData,
            aboutCourse,
            Course_Curriculum,
            studentReview,
            skillsYouLearn,
            TopInDemadTools,
            industryReleventProjects,
            upCommingBatches,
            tutionFeesAndUpcomingBatches,
            earnCertificates,
            jobOpportunities,
            instructors,
            creators,
        } = req.body;
        
        // Parse JSON strings from request body
        const parsedData = {
            headerData: JSON.parse(headerData || '{}'),
            aboutCourse: JSON.parse(aboutCourse || '{}'),
            Course_Curriculum: JSON.parse(Course_Curriculum || '{}'),
            studentReview: JSON.parse(studentReview || '[]'),
            skillsYouLearn: JSON.parse(skillsYouLearn || '{}'),
            TopInDemadTools: JSON.parse(TopInDemadTools || '{}'),
            industryReleventProjects: JSON.parse(industryReleventProjects || '{}'),
            upCommingBatches: JSON.parse(upCommingBatches || '[]'),
            tutionFeesAndUpcomingBatches: JSON.parse(tutionFeesAndUpcomingBatches || '{}'),
            earnCertificates: JSON.parse(earnCertificates || '{}'),
            jobOpportunities: JSON.parse(jobOpportunities || '[]'),
            instructors: JSON.parse(instructors || '[]'),
            creators: JSON.parse(creators || '[]'),
        };

        // Handle file uploads and update parsedData accordingly
        const handleFileUploads = async (fileKey, targetArray, propertyToUpdate) => {
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

        const handleFileUploadsUpcomingBatches = async (fileKey, targetArray, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                const file = req.files[fileKey][0]; // Assuming only one file is expected
                const imageUrl = await uploadToCloudinary(file.path);
                targetArray[propertyToUpdate] = imageUrl;
                fs.unlinkSync(file.path); // Delete local file after upload
            }
        };

        const handleFileUploadsearnCertificates = async (fileKey, targetObject, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                const file = req.files[fileKey][0]; // Assuming only one file is expected
                const imageUrl = await uploadToCloudinary(file.path);
                targetObject[propertyToUpdate] = imageUrl;
                fs.unlinkSync(file.path); // Delete local file after upload
            }
        };

        const handleFileUploadsGalleryImage = async (fileKey, targetObject, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                const galleryImgArr = [];
                for (let i = 0; i < req.files[fileKey].length; i++) {
                    const file = req.files[fileKey][i];
                    const imageUrl = await uploadToCloudinary(file.path);
                    galleryImgArr.push(imageUrl);
                    fs.unlinkSync(file.path); // Delete local file after upload
                }
                targetObject[propertyToUpdate] = galleryImgArr;
            }
        };

        // Example usage:
        await handleFileUploads('headerImage', [parsedData.headerData], 'headerImage');
        await handleFileUploads('aboutCourseLogoImages', parsedData.aboutCourse.highlights || [], 'logoImage');
        await handleFileUploads('studentReviewProfilePicImage', parsedData.studentReview || [], 'profilePicImage');
        await handleFileUploads('TopInDemadToolsLogoImages', parsedData.TopInDemadTools.tools || [], 'logoImage');
        await handleFileUploads('PopularProjectsLogoImages', parsedData.industryReleventProjects.Populerprojects || [], 'logo');
        await handleFileUploads('LatestProjectsLogoImages', parsedData.industryReleventProjects.LatestProjects || [], 'logo');
        await handleFileUploads('PopulartechTools1', parsedData.industryReleventProjects.Populerprojects || [], 'toolsLogo1');
        await handleFileUploads('PopulartechTools2', parsedData.industryReleventProjects.Populerprojects || [], 'toolsLogo2');
        await handleFileUploads('PopulartechTools3', parsedData.industryReleventProjects.Populerprojects || [], 'toolsLogo3');
        await handleFileUploads('PopulartechTools4', parsedData.industryReleventProjects.Populerprojects || [], 'toolsLogo4');
        await handleFileUploads('PopulartechTools5', parsedData.industryReleventProjects.Populerprojects || [], 'toolsLogo5');
        await handleFileUploads('PopulartechTools6', parsedData.industryReleventProjects.Populerprojects || [], 'toolsLogo6');
        await handleFileUploads('LatesttechTools1', parsedData.industryReleventProjects.LatestProjects || [], 'toolsLogo1');
        await handleFileUploads('LatesttechTools2', parsedData.industryReleventProjects.LatestProjects || [], 'toolsLogo2');
        await handleFileUploads('LatesttechTools3', parsedData.industryReleventProjects.LatestProjects || [], 'toolsLogo3');
        await handleFileUploads('LatesttechTools4', parsedData.industryReleventProjects.LatestProjects || [], 'toolsLogo4');
        await handleFileUploads('LatesttechTools5', parsedData.industryReleventProjects.LatestProjects || [], 'toolsLogo5');
        await handleFileUploads('LatesttechTools6', parsedData.industryReleventProjects.LatestProjects || [], 'toolsLogo6');
        await handleFileUploadsUpcomingBatches('upCommingBatchesBrocherImage', parsedData.upCommingBatches, 'brocherImage');
        await handleFileUploadsearnCertificates('earnCertificatesCertificateImage', parsedData.earnCertificates, 'certificateImage');
        await handleFileUploadsGalleryImage('earnCertificatesGallaryImage', parsedData.earnCertificates, 'gallaryImage');
        await handleFileUploads('instructorProfileImage', parsedData.instructors, 'profileImg');
        await handleFileUploads('creatorProfileImage', parsedData.creators, 'profileImg');

        const newL3Page = new L3PageModel({
            Coursecategory,
            course,
            headerData: parsedData.headerData,
            aboutCourse: parsedData.aboutCourse,
            Course_Curriculum: parsedData.Course_Curriculum,
            studentReview: parsedData.studentReview,
            skillsYouLearn: parsedData.skillsYouLearn,
            TopInDemadTools: parsedData.TopInDemadTools,
            industryReleventProjects: parsedData.industryReleventProjects,
            upCommingBatches: parsedData.upCommingBatches,
            tutionFeesAndUpcomingBatches: parsedData.tutionFeesAndUpcomingBatches,
            earnCertificates: parsedData.earnCertificates,
            jobOpportunities: parsedData.jobOpportunities,
            instructors: parsedData.instructors,
            creators: parsedData.creators,
        });

        await newL3Page.save();
        res.status(201).json({ message: 'L3 Page created successfully', newL3Page });

    } catch (error) {
        res.status(500).json({ message: 'Error creating L3 Page', error: error.message });
    }
};

// Get all L3 Pages by category
export const getL3PagesByCategory = async (req, res) => {
    try {
        const pages = await L3PageModel.find({ Coursecategory: req.params.category });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get L3 Pages by course and category
export const getL3PagesByCourseAndCategory = async (req, res) => {
    try {
        const pages = await L3PageModel.find({ Coursecategory: req.params.category, course: req.params.course });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getL3PagesData = async (req, res) => {
    try {
        const pages = await L3PageModel.find();
        if (pages) {
            res.status(200).json(pages);
        } else {
            res.status(200).json("data not found")
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update L3 Page by ID
// export const updateL3Page = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const {
//             Coursecategory, course, headerData, aboutCourse, Course_Curriculum, studentReview,
//             skillsYouLearn, TopInDemadTools, industryReleventProjects, upCommingBatches,
//             tutionFeesAndUpcomingBatches, earnCertificates, jobOpportunities, instructors
//         } = req.body;

//         const updatedL3Page = {
//             Coursecategory,
//             course,
//             headerData: {
//                 ...headerData,
//                 headerImage: req.files.headerImage ? await uploadImage(req.files.headerImage[0]) : headerData.headerImage
//             },
//             aboutCourse: {
//                 ...aboutCourse,
//                 highlights: await Promise.all(aboutCourse.highlights.map(async (highlight, index) => ({
//                     ...highlight,
//                     logoImage: req.files.aboutCourseLogoImages ? await uploadImage(req.files.aboutCourseLogoImages[index]) : highlight.logoImage
//                 })))
//             },
//             Course_Curriculum: {
//                 ...Course_Curriculum,
//                 brochure: req.files.Course_CurriculumBrochure ? await uploadImage(req.files.Course_CurriculumBrochure[0]) : Course_Curriculum.brochure,
//                 curriculumData: Course_Curriculum.curriculumData.map(curriculum => ({
//                     ...curriculum,
//                     topics: curriculum.topics
//                 }))
//             },
//             studentReview: {
//                 ...studentReview,
//                 profilePicImage: req.files.studentReviewProfilePicImage ? await uploadImage(req.files.studentReviewProfilePicImage[0]) : studentReview.profilePicImage
//             },
//             skillsYouLearn,
//             TopInDemadTools: {
//                 ...TopInDemadTools,
//                 tools: await Promise.all(TopInDemadTools.tools.map(async (tool, index) => ({
//                     ...tool,
//                     logoImage: req.files.TopInDemadToolsLogoImages ? await uploadImage(req.files.TopInDemadToolsLogoImages[index]) : tool.logoImage
//                 })))
//             },
//             industryReleventProjects: {
//                 ...industryReleventProjects,
//                 projects: await Promise.all(industryReleventProjects.projects.map(async (project, index) => ({
//                     ...project,
//                     projectData: await Promise.all(project.projectData.map(async (projectData, subIndex) => ({
//                         ...projectData,
//                         logo: req.files.industryReleventProjectsLogoImages ? await uploadImage(req.files.industryReleventProjectsLogoImages[subIndex]) : projectData.logo,
//                         certificates: await Promise.all(projectData.certificates.map(async (certificate, certIndex) => ({
//                             ...certificate,
//                             image: req.files.industryReleventProjectsCertificateImages ? await uploadImage(req.files.industryReleventProjectsCertificateImages[certIndex]) : certificate.image
//                         }))),
//                         logosImageArr: await Promise.all(projectData.logosImageArr.map(async (logo, logoIndex) => ({
//                             ...logo,
//                             logo: req.files.industryReleventProjectsLogosImageArr ? await uploadImage(req.files.industryReleventProjectsLogosImageArr[logoIndex]) : logo.logo
//                         })))
//                     })))
//                 })))
//             },
//             upCommingBatches: {
//                 ...upCommingBatches,
//                 brocherImage: req.files.upCommingBatchesBrocherImage ? await uploadImage(req.files.upCommingBatchesBrocherImage[0]) : upCommingBatches.brocherImage
//             },
//             tutionFeesAndUpcomingBatches,
//             earnCertificates: {
//                 ...earnCertificates,
//                 certificateImage: await Promise.all(earnCertificates.certificateImage.map(async (image, index) => ({
//                     ...image,
//                     image: req.files.earnCertificatesCertificateImage ? await uploadImage(req.files.earnCertificatesCertificateImage[index]) : image.image
//                 }))),
//                 gallaryImage: await Promise.all(earnCertificates.gallaryImage.map(async (image, index) => ({
//                     ...image,
//                     image: req.files.earnCertificatesGallaryImage ? await uploadImage(req.files.earnCertificatesGallaryImage[index]) : image.image
//                 })))
//             },
//             jobOpportunities,
//             instructors
//         };

//         const page = await L3PageModel.findByIdAndUpdate(id, updatedL3Page, { new: true });
//         if (!page) return res.status(404).json({ error: 'L3 Page not found' });

//         res.status(200).json(page);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Delete L3 Page by ID
export const deleteL3Page = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await L3PageModel.findByIdAndDelete(id);
        if (!page) return res.status(404).json({ error: 'L3 Page not found' });

        res.status(200).json({ message: 'L3 Page deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};