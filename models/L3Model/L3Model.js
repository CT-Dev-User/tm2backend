import mongoose from "mongoose";

let L3PageSchema = new mongoose.Schema({
    Coursecategory: { type: String },
    course: { type: String },
    headerData: {
        title: { type: String },
        subTitle: { type: String },
        headerImage: { type: String }
    },
    aboutCourse:
    {
        Title: { type: String },
        subTitle: { type: String },
        highlights: [{
            title: { type: String },
            logoImage: { type: String },
        }]
    },
    Course_Curriculum:
    {
        Title: { type: String },
        SubTitle: { type: String },
        curriculumData: [{
            heading: { type: String },
            topics: [{ topic: { type: String } }],
            keyTakeaways: [{ keys: { type: String } }]
        }]
    },
    studentReview: [{
        studentName: { type: String },
        position: { type: String },
        profilePicImage: { type: String },
        review: { type: String }

    }],

    skillsYouLearn: {
        title: { type: String },
        skills: [{
            title: { type: String }
        }]
    },
    TopInDemadTools: {
        title: { type: String },
        subTitle: { type: String },
        tools: [{
            title: { type: String },
            logoImage: { type: String }
        }]
    },
    industryReleventProjects: {
        Title: { type: String },
        SubTitle: { type: String },
        Populerprojects: [{
            heading: { type: String },
            logo: { type: String },
            projectName: { type: String },
            desc: { type: String },
            certificates: [{
                title: { type: String }
            }],
            toolsLogo1: { type: String },
            toolsLogo2: { type: String },
            toolsLogo3: { type: String },
            toolsLogo4: { type: String },
            toolsLogo5: { type: String },
            toolsLogo6: { type: String }
        }],
        LatestProjects: [{
            heading: { type: String },
            logo: { type: String },
            projectName: { type: String },
            desc: { type: String },
            certificates: [{
                title: { type: String }
            }],
            toolsLogo1: { type: String },
            toolsLogo2: { type: String },
            toolsLogo3: { type: String },
            toolsLogo4: { type: String },
            toolsLogo5: { type: String },
            toolsLogo6: { type: String }
        }]
    },

    upCommingBatches: {
        Title: { type: String },
        brocherImage: { type: String },
        batches: [{
            date: { type: String },
            timing: { type: String },
            duration: { type: String },
            mode: { type: String }
        }]
    },

    tutionFeesAndUpcomingBatches: {
        Title: { type: String },
        SubTitle: { type: String },
        heading: { type: String },
        sessionInfo: [{ info: { type: String } }],
        feesOptions: [{
            paymentOption: { type: String },
            discount: { type: String },
            desc: { type: String },
            fees: { type: String },
            emi: { type: String }
        }],
        benefitsOfLearning: [{
            ben: { type: String }
        }]
    },

    earnCertificates: {
        Title: { type: String },
        SubTitle: { type: String },
        certificateImage:
            { type: String },
        data: [{
            rank: { type: String },
            certName: { type: String },
            rankGivenBy: { type: String }
        }],
        gallaryImage: []
    },

    jobOpportunities: {
        Title: { type: String },
        jobsData: [{
            jobTitle: { type: String },
            salary: { type: String }
        }]
    },
    instructors: [{
        name: { type: String },
        profileImg: { type: String },
        position: { type: String },
        company: { type: String }
    }],
    creators: [{
        name: { type: String },
        profileImg: { type: String },
        position: { type: String },
        company: { type: String }
    }]
});

export const L3PageModel = mongoose.model("L3PageData", L3PageSchema);