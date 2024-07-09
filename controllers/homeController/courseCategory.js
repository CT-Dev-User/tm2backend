import cloudinary from '../../middlware/cloudinary.js'; // Ensure you have the Cloudinary configuration file correctly set up
import HomePageCourses from '../../models/HomePage/courseCategory.js';

// Get all courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await HomePageCourses.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single course by ID
export const getCourseById = async (req, res) => {
    try {
        const course = await HomePageCourses.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new course
export const createCourse = async (req, res) => {
    const { Coursecategory, points } = req.body;

    try {
        // Upload logo to Cloudinary if it exists
        let logo = null;
        if (req.file) {
            const uploadResult = await cloudinary.v2.uploader.upload(req.file.path);
            logo = uploadResult.secure_url;
        }
        const newCourse = new HomePageCourses({ Coursecategory, logo, points: JSON.parse(points) });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a course by ID
export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { Coursecategory, points } = req.body;

    try {
        // Upload new logo to Cloudinary if it exists
        let logo = null;
        if (req.file) {
            const uploadResult = await cloudinary.v2.uploader.upload(req.file.path);
            logo = uploadResult.secure_url;
        }

        const updateData = { Coursecategory, points };
        if (logo) {
            updateData.logo = logo;
        }

        const updatedCourse = await HomePageCourses.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a course by ID
export const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCourse = await HomePageCourses.findByIdAndDelete(id);

        if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a point to the points array of a course by ID
export const addPointToCourse = async (req, res) => {
    const { id } = req.params;
    const { point } = req.body;

    try {
        const updatedCourse = await HomePageCourses.findByIdAndUpdate(
            id,
            { $push: { points: { point } } },
            { new: true, runValidators: true }
        );

        if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
