


import express from 'express'
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from '../controllers/homeController/courseCategory.js';
import upload from '../middlware/multer.js';


const homeRouter = express.Router(); 

homeRouter.get('/get-courses', getAllCourses);
homeRouter.get('/get-course-by-id/:id', getCourseById);
homeRouter.post('/add-course', upload.single('logo'), createCourse);
homeRouter.put('/update-course/:id', upload.single('logo'), updateCourse);
homeRouter.delete('/delete-course/:id', deleteCourse);



export default homeRouter

