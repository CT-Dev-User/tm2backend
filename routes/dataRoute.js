import express from 'express';
import upload from '../middlware/multer.js';
import {
    createL2PageData,
    getAllL2PageData,
    getL2PageDataById,
    getL2PageDataByCourseCategory,
    updateL2PageData,
    deleteL2PageData
} from '../controllers/L2PageController/L2PageController.js';
import {
    createL3Page,
    getL3PagesByCategory,
    getL3PagesByCourseAndCategory,
    deleteL3Page,
    getL3PagesData
} from '../controllers/L3Controller/L3Controller.js';

import { createFaq, deleteFaq, getAllFaqs, getFaqById, updateFaq } from '../controllers/faqData/AllFaqController.js';
import { createAboutUsPage, deleteAboutUsPageData, getAllAboutUsData } from '../controllers/aboutUs/aboutUsController..js';
import { createTestimonials, deleteTestimonials, getAllTestimonials, getTestimonialsById, updateTestimonials } from '../controllers/aboutUs/testimonials.js';
import { createMorqueData, deleteMorqueData, getAllMorqueData, getMorqueDataById, updateMorqueData } from '../controllers/morqueData/morqueData.js';
import { createReferAndEarnData, deleteReferAndEarnDataById, getAllReferAndEarnData, getReferAndEarnDataById } from '../controllers/referAndEarn/referAndEarnController.js';
import { createHireFromUsPage, deleteHireFromUsDataById, getAllHireFromUsData, getHireFromUsDataById } from '../controllers/HireFromUs/hireFromUs.js';
import { createContactUs, deleteContactUsDataById, getAllContactUsData } from '../controllers/contactUsController/contactUsController.js';
import { createBecomeInstructorData, deleteBecomeInstructor, getBecomeInstructor } from '../controllers/becomeInstructor/becomeInstructor.js';
import { createCommunitiesPage, deletecommunityPageData, getCommunityPagesData } from '../controllers/communities/communitiesController.js';
import { createContactFormEntry, deleteContactFormEntryById, getAllContactFormEntries } from '../controllers/contactUsController/contactUsForm.js';
import { createPlacedProfileTestimonials, deletePlacedProfilePageData, getPlacedProfilePagesData } from '../controllers/placedProfileTestimonials/placedProfileTestimonials.js';
import { Addalumni, deleteAlumniPageData, getAllAlumniData } from '../controllers/placedProfileTestimonials/alumniController.js';
import { createCollegeCollaborationPage, deleteCollegeCollaborationPage, getAllCollegeCollaborationPages } from '../controllers/collegeCollab/collegeCollab.js';
import { createCompanyCollaborationPage, deleteCompanyCollaborationPage, getCompanyCollaborationPage } from '../controllers/companyCollab/companyCollab.js';
import { createMasterClass, deleteMasterClass, getMasterClass } from '../controllers/masterClassControllers/masterClass.js';
import { createMasterClassMainPage, deleteMasterClassMainPage, getMasterClassMainPage } from '../controllers/masterClassControllers/mainPageController.js';
import { createWorkshop, deleteWorkshop, getWorkshop } from '../controllers/masterClassControllers/workshop.js';
import { createWebinar, deleteWebinar, getWebinar } from '../controllers/masterClassControllers/webinar.js';
import { createMasterClassSubPage, deleteMasterClassSubPage, getMasterClassSubPage } from '../controllers/masterClassControllers/masterClassSubPage/masterClassSubPageController.js';
import { createBlogSubPage, deleteBlogSubPage, getBlogSubPage } from '../controllers/blogs/blogSubPage.js';
import { createMainBlogPage, deleteMainBlogPage, getMainBlogPage } from '../controllers/blogs/blogController.js';

const router = express.Router();

// L2 Page Routes
router.post('/add-course-category', upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'practioners', maxCount: 100 },
    { name: 'masterClass', maxCount: 100 },
    { name: 'companyLogoImages', maxCount: 100 }
]), createL2PageData);

router.get('/get-course-category', getAllL2PageData);
router.get('/get-course-category-by-id/:id', getL2PageDataById);
router.get('/get-course-category-by-category/:Coursecategory', getL2PageDataByCourseCategory);
router.put('/update-course-category/:id', upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'practioners', maxCount: 100 },
    { name: 'masterClass', maxCount: 100 },
    { name: 'companyLogoImages', maxCount: 100 }
]), updateL2PageData);
router.delete('/delete-course-category/:id', deleteL2PageData);

// L3 Page Routes
const cpUpload = upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'aboutCourseLogoImages', maxCount: 100 },
    { name: 'studentReviewProfilePicImage', maxCount: 100 },
    { name: 'TopInDemadToolsLogoImages', maxCount: 100 },
    { name: 'PopularProjectsLogoImages', maxCount: 100 },
    { name: 'LatestProjectsLogoImages', maxCount: 100 },
    { name: 'PopulartechTools1', maxCount: 100 },
    { name: 'PopulartechTools2', maxCount: 100 },
    { name: 'PopulartechTools3', maxCount: 100 },
    { name: 'PopulartechTools4', maxCount: 100 },
    { name: 'PopulartechTools5', maxCount: 100 },
    { name: 'PopulartechTools6', maxCount: 100 },
    { name: 'LatesttechTools1', maxCount: 100 },
    { name: 'LatesttechTools2', maxCount: 100 },
    { name: 'LatesttechTools3', maxCount: 100 },
    { name: 'LatesttechTools4', maxCount: 100 },
    { name: 'LatesttechTools5', maxCount: 100 },
    { name: 'LatesttechTools6', maxCount: 100 },
    { name: 'upCommingBatchesBrocherImage', maxCount: 1 },
    { name: 'earnCertificatesCertificateImage', maxCount: 1 },
    { name: 'earnCertificatesGallaryImage', maxCount: 100 },
    { name: 'instructorProfileImage', maxCount: 100 },
    { name: 'creatorProfileImage', maxCount: 100 }
]);

router.post('/add-landingpage', cpUpload, createL3Page);
router.get('/get-landingpage-by-category/:category', getL3PagesByCategory);
router.get('/get-landingpage-by-course-and-category/:category/:course', getL3PagesByCourseAndCategory);
router.delete('/delete-landingpage/:id', deleteL3Page);
router.get('/get-landingpage', getL3PagesData);

// faq routes
router.post('/add-faq', createFaq);
router.get('/get-faq', getAllFaqs);
router.get('/get-faq-by-id', getFaqById);
router.get('/update-faq-by-id', updateFaq);
router.get('/delete-faq-by-id', deleteFaq);


// about Us routes 
const multerFields = upload.fields([
    { name: 'headerImg', maxCount: 1 },
    { name: 'Aboutimage', maxCount: 1 },
    { name: 'socialIconLogo', maxCount: 100 },
    { name: 'memberProfilePic', maxCount: 100 },
    { name: 'companyLogo', maxCount: 100 },
    { name: 'galleryImage', maxCount: 100 }

]);

// Define the routes
router.post('/add-aboutus', multerFields, createAboutUsPage);
router.get('/get-aboutus', getAllAboutUsData);
router.delete('/delete-aboutus/:id', deleteAboutUsPageData);

// testimonials data
router.post('/testimonials', upload.array('reviewVideo', 100), createTestimonials); // Adjust the field name as needed
router.get('/testimonials', getAllTestimonials);
router.get('/testimonials/:id', getTestimonialsById);
router.put('/testimonials/:id', upload.array('reviewVideo', 100), updateTestimonials); // Adjust the field name as needed
router.delete('/testimonials/:id', deleteTestimonials);

// Define the routes
router.post('/add-morqueData', createMorqueData);
router.get('/get-morqueData', getAllMorqueData);
router.get('/get-morque-data-by-id-morqueData/:id', getMorqueDataById);
router.put('/update-morqueData/:id', updateMorqueData);
router.delete('/delete-morqueData/:id', deleteMorqueData);

// refer and earn 
const uploadReferAndEarnImages = upload.fields([
    { name: 'headerImg', maxCount: 1 },
    { name: 'earnGreatRewardImage', maxCount: 1 },
])
// refer and earn 
router.post('/add-refer-and-earn-data', uploadReferAndEarnImages, createReferAndEarnData)
router.get('/get-refer-and-earn-data', getAllReferAndEarnData)
router.get('/get-refer-and-earn-data-by-id/:id', getReferAndEarnDataById)
router.delete('/delete-refer-and-earn-data-by-id/:id', deleteReferAndEarnDataById)


// hire from us Routes
const hireFromUsUpload = upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'companyLogosImages', maxCount: 100 },
    { name: 'TechnicalHighlightsLogos', maxCount: 100 },

])

router.post('/add-hire-from-us-data', hireFromUsUpload, createHireFromUsPage)
router.get('/get-hire-from-us-data', getAllHireFromUsData)
router.get('/get-hire-from-us-data-by-id/:id', getHireFromUsDataById)
router.delete('/delete-hire-from-us-data-by-id/:id', deleteHireFromUsDataById)


// contact us routes
const contactUsUpload = upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'buildingImg', maxCount: 1 }
])

router.post('/add-contact-us-data', contactUsUpload, createContactUs)
router.get('/get-contact-us-data', getAllContactUsData)
router.delete('/delete-contact-us-data-by-id/:id', deleteContactUsDataById)

// become Instructor routes
const becomeInstructorUpload = upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'becomeInstructorInfoImg1', maxCount: 1 },
    { name: 'becomeInstructorInfoImg2', maxCount: 1 },
    { name: 'becomeInstructorInfoImg3', maxCount: 1 },
    { name: 'WhatIsForYouImg', maxCount: 100 },
    { name: 'whatDoesItTakeImg', maxCount: 1 },
    { name: 'whyMentorWithUsImg', maxCount: 1 },
])

router.post('/add-become-instructor-data', becomeInstructorUpload, createBecomeInstructorData)
router.get('/get-become-instructor-data', getBecomeInstructor)
router.delete('/delete-become-instructor-data-by-id/:id', deleteBecomeInstructor)


// community page routes
const communityUpload = upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'instructorProfile', maxCount: 100 },
    { name: 'creatorProfile', maxCount: 100 },
    { name: 'tmCommunityProfileImg', maxCount: 100 },
    { name: 'tmCommunitycompanyLogo', maxCount: 100 },
    { name: 'relatedCourseImg', maxCount: 100 },
    { name: 'learningBetterWithTmCommunityProfileImg', maxCount: 100 },
])

router.post('/add-community-page-data', communityUpload, createCommunitiesPage)
router.get('/get-community-page-data', getCommunityPagesData)
router.delete('/delete-community-page-data-by-id/:id', deletecommunityPageData)

// contact us form 
router.post('/add-contact-us-form-data', createContactFormEntry)
router.get('/get-contact-us-form-data', getAllContactFormEntries)
router.delete('/delete-contact-us-form-data-by-id/:id', deleteContactFormEntryById)

// community page routes
const placedProfileTestimonialsUpload = upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'relatedProgramImage', maxCount: 100 },
    { name: 'tesimonialsReviewvideo', maxCount: 100 },

])

router.post('/add-placed-profile-testimonial-page-data', placedProfileTestimonialsUpload, createPlacedProfileTestimonials)
router.get('/get-placed-profile-testimonial-page-data', getPlacedProfilePagesData)
router.delete('/delete-placed-profile-testimonial -page-data-by-id/:id', deletePlacedProfilePageData)


// alumni data routes
const alumniDataUpload = upload.fields([
    { name: 'alumniProfile', maxCount: 100 },
])

router.post('/add-placed-profile-testimonial-page-data', alumniDataUpload, Addalumni)
router.get('/get-placed-profile-testimonial-page-data', getAllAlumniData)
router.delete('/delete-placed-profile-testimonial -page-data-by-id/:id', deleteAlumniPageData)

// collegecollaboration
const collegeCollabUpload = upload.fields([
    { name: 'headerImg', maxCount: 1 },
    { name: 'Companylogos', maxCount: 100 },
    { name: 'highLightsImage', maxCount: 1 },
    { name: 'ourPartenerImg', maxCount: 1 },
    { name: 'companyLogoData', maxCount: 100 },
    { name: 'collaborationPhoto', maxCount: 100 }
]);

// Routes for college collaboration
router.post('/add-college-collaboration', collegeCollabUpload, createCollegeCollaborationPage);
router.get('/get-college-collab-data', getAllCollegeCollaborationPages)
router.delete('/delete-college-collaboration/:id', deleteCollegeCollaborationPage);


// company collaboration
const companyCollabUpload = upload.fields([
    { name: 'headerImg', maxCount: 1 },
    { name: 'Companylogos', maxCount: 100 },
    { name: 'highLightsImage', maxCount: 1 },
    { name: 'ourPartenerImg', maxCount: 1 },
    { name: 'companyLogoData', maxCount: 100 },
    { name: 'collaborationPhoto', maxCount: 100 }
]);

// Routes for college collaboration
router.post('/add-company-collaboration', companyCollabUpload, createCompanyCollaborationPage);
router.get('/get-company-collab-data', getCompanyCollaborationPage)
router.delete('/delete-company-collaboration/:id', deleteCompanyCollaborationPage);


// master class main page
const masterClasssMainUpload = upload.fields([
    { name: 'headerImg', maxCount: 1 }
]);

// Routes for master class main page
router.post('/add-master-class-main-page', masterClasssMainUpload, createMasterClassMainPage);
router.get('/get-master-class-main-page/:id', getMasterClassMainPage);
router.delete('/delete-master-class-main-page/:id', deleteMasterClassMainPage);


// master class
const masterClass = upload.fields([
    { name: 'masterClassImage', maxCount: 100 }
]);

// Routes for master class
router.post('/add-master-class', masterClass, createMasterClass);
router.get('/get-master-class/:id', getMasterClass);

router.delete('/delete-master-class/:id', deleteMasterClass);

//webinar routes 
const webinarUpload = upload.fields([
    { name: 'webinarImage', maxCount: 100 },
]);

// Routes for webinar
router.post('/add-webinar', webinarUpload, createWebinar);
router.get('/get-webinar/:id', getWebinar);
router.delete('/delete-webinar/:id', deleteWebinar);


// workshop routes
//webinar routes 
const workshopUpload = upload.fields([
    { name: 'webinarImage', maxCount: 100 },
]);

// Routes for webinar
router.post('/add-webinar', workshopUpload, createWorkshop);
router.get('/get-webinar/:id', getWorkshop);
router.delete('/delete-webinar/:id', deleteWorkshop);

// master class sub page

const masterClassSubPageUploads = upload.fields([
    { name: 'headerImg', maxCount: 1 }, // Add any other fields as necessary
    { name: 'mentorProfileImage', maxCount: 10 }, // Adjust the number as per your requirements
    { name: 'companyLogo', maxCount: 10 }, // Adjust the number as per your requirements
    { name: 'logo', maxCount: 10 }, // Adjust the number as per your requirements
]);

// Routes for masterClassSubPage
router.post('/add-masterClassSubPage', masterClassSubPageUploads, createMasterClassSubPage);
router.get('/get-masterClassSubPage', getMasterClassSubPage);
// router.put('/update-masterClassSubPage/:id', masterClassSubPageUploads, updateMasterClassSubPag);
router.delete('/delete-masterClassSubPage/:id', deleteMasterClassSubPage);

// blog main page controller
const blogMainUpload = upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'blogImg', maxCount: 1 },
    { name: 'recentRelatedBlogImages', maxCount: 10 }, 
    { name: 'ourBlogImages', maxCount: 10 }, 
    { name: 'relatedCourseImages', maxCount: 10 } 
]);

// Routes for mainBlogPage
router.post('/add-mainBlogPage', blogMainUpload, createMainBlogPage);
router.get('/get-mainBlogPage', getMainBlogPage);
router.delete('/delete-mainBlogPage/:id', deleteMainBlogPage);

// blog sub page
const blogSubPageUpload = upload.fields([
    { name: 'headerImage', maxCount: 1 },
    { name: 'courseImages', maxCount: 10 }, // Adjust the number as per your requirements
    { name: 'similarBlogImages', maxCount: 10 } // Adjust the number as per your requirements
]);

// Routes for blogsubPage
router.post('/add-blogSubPage', blogSubPageUpload, createBlogSubPage);
router.get('/get-blogSubPage', getBlogSubPage);
router.delete('/delete-blogSubPage/:id', deleteBlogSubPage);



export default router;
