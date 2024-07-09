import contactUsormModel from '../../models/contactUs/contactUsForm.js';

// Create a new contact form entry
export const createContactFormEntry = async (req, res) => {
    try {
        const { name, email, phoneNo, currentlyPursing, year, courseChooseWithTM } = req.body;

        const newContactFormEntry = new contactUsormModel({
            name,
            email,
            phoneNo,
            currentlyPursing,
            year,
            courseChooseWithTM
        });

        await newContactFormEntry.save();
        res.status(201).json({ message: 'Contact form entry created successfully', newContactFormEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error creating contact form entry', error: error.message });
    }
};

// Get all contact form entries
export const getAllContactFormEntries = async (req, res) => {
    try {
        const contactFormEntries = await contactUsormModel.find();
        res.status(200).json(contactFormEntries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contact form entries', error: error.message });
    }
};


// Delete a contact form entry by ID
export const deleteContactFormEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContactFormEntry = await contactUsormModel.findByIdAndDelete(id);
        if (!deletedContactFormEntry) return res.status(404).json({ message: 'Contact form entry not found' });

        res.status(200).json({ message: 'Contact form entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contact form entry', error: error.message });
    }
};
