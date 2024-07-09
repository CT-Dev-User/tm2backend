import express from 'express';
import mongoose from 'mongoose';
import queryFormDataModel from '../../models/aboutUs/queryFormData.js';

const queryformrouter = express.Router();

// Create a new query form data entry
queryformrouter.post('/add-queryform-data', async (req, res) => {
    const { fullName, email, phone, workExperince } = req.body;

    try {
        const newQueryFormData = new queryFormDataModel({
            fullName,
            email,
            phone,
            workExperince,
        });

        await newQueryFormData.save();
        res.status(201).json(newQueryFormData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all query form data entries
queryformrouter.get('/get-queryform-data', async (req, res) => {
    try {
        const queryFormDatas = await queryFormDataModel.find();
        res.status(200).json(queryFormDatas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single query form data entry by ID
queryformrouter.get('/get-queryform-data-by-id/:id', async (req, res) => {
    try {
        const queryFormData = await queryFormDataModel.findById(req.params.id);
        if (!queryFormData) return res.status(404).json({ message: 'Query form data not found' });
        res.status(200).json(queryFormData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a query form data entry by ID
queryformrouter.put('/update-queryform-data/:id', async (req, res) => {
    const { fullName, email, phone, workExperince } = req.body;

    try {
        const updatedQueryFormData = await queryFormDataModel.findByIdAndUpdate(
            req.params.id,
            { fullName, email, phone, workExperince },
            { new: true }
        );

        if (!updatedQueryFormData) return res.status(404).json({ message: 'Query form data not found' });
        res.status(200).json(updatedQueryFormData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a query form data entry by ID
queryformrouter.delete('delete-queryform-data/:id', async (req, res) => {
    try {
        const deletedQueryFormData = await queryFormDataModel.findByIdAndDelete(req.params.id);
        if (!deletedQueryFormData) return res.status(404).json({ message: 'Query form data not found' });
        res.status(200).json({ message: 'Query form data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default queryformrouter;
