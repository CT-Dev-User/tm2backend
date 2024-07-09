import FaqData from '../../models/faq/AllFaq.js';

// Create a new FAQ entry
export const createFaq = async (req, res) => {
    const { question, answer } = req.body;

    try {
        const newFaq = new FaqData({ question, answer });
        await newFaq.save();
        res.status(201).json(newFaq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all FAQs
export const getAllFaqs = async (req, res) => {
    try {
        const faqs = await FaqData.find();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get FAQ by ID
export const getFaqById = async (req, res) => {
    const { id } = req.params;

    try {
        const faq = await FaqData.findById(id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update FAQ by ID
export const updateFaq = async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;

    try {
        const updatedFaq = await FaqData.findByIdAndUpdate(
            id,
            { question, answer },
            { new: true, runValidators: true }
        );

        if (!updatedFaq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        res.status(200).json(updatedFaq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete FAQ by ID
export const deleteFaq = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFaq = await FaqData.findByIdAndDelete(id);

        if (!deletedFaq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        res.status(200).json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
