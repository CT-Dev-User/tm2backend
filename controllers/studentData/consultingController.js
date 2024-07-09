import consultingDataModel from '../../models/studentsData/consultingModel.js';

// Create a new consulting data entry
export const createConsultingData = async (req, res) => {
    const { fullName, email, phoneNo } = req.body;

    try {
        const newConsultingData = new consultingDataModel({ fullName, email, phoneNo });
        await newConsultingData.save();
        res.status(201).json(newConsultingData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all consulting data entries
export const getAllConsultingData = async (req, res) => {
    try {
        const consultingData = await consultingDataModel.find();
        res.status(200).json(consultingData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Delete consulting data by ID
export const deleteConsultingData = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedConsultingData = await consultingDataModel.findByIdAndDelete(id);

        if (!deletedConsultingData) {
            return res.status(404).json({ message: 'Consulting data not found' });
        }
        
        res.status(200).json({ message: 'Consulting data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
