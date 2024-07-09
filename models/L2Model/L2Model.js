import mongoose from "mongoose";

let L2PageSchema = new mongoose.Schema({
    Coursecategory: { type: String, required: true },
    headerData: {
        title: { type: String, },
        subTitle: { type: String, },
        headerImage: { type: String, }
    },
    WhyNeedMasterClass:
    {
        Title: { type: String, },
        data: [{
            title: { type: String, },
            subTitle: { type: String, },
        }]
    },
    extensiveProgram:
    {
        Title: { type: String, },
        SubTitle: { type: String, },
        programsData: [{
            bgGradient: { type: String, },
            programLevel: { type: String, },
            programName: { type: String, },
            duration: { type: String, },
            programMode: [{ mode: { type: String, } }],
            programBenefits: [{ benefits: { type: String, } }],
        }]
    },
    crashCourseData: {
        Title: { type: String, },
        SubTitle: { type: String, },
        courseData: [{
            bgGradient: { type: String, },
            courseLevel: { type: String, },
            courseName: { type: String, },
            duration: { type: String, },
            courseBenefits: [{ benefits: { type: String, } }],
        }]

    },
    practionersData: {
        Title: { type: String, },
        SubTitle: { type: String, },
        companyLogoImages: [{ logo: { type: String } }],//array remains in cms------------------
        practioners: [{
            name: { type: String, },
            position: { type: String, },
            company: { type: String, },
            profileImage: { type: String, }
        }]
    },
    masterClassData: {
        Title: { type: String, },
        SubTitle: { type: String, },
        masterClass: [{
            name: { type: String, },
            position: { type: String, },
            company: { type: String, },
            profileImage: { type: String, },
            classTitle: { type: String, },
            date: { type: String, },
            time: { type: String, }

        }]

    }

});

export const L2PageModel = mongoose.model("L2PageData", L2PageSchema);
