import testimonialsModel from '../../models/testimonials/testimonials.js'; // Adjust the path to your model
import cloudinary from 'cloudinary';

// Create a new testimonials entry
export const createTestimonials = async (req, res) => {
  try {
    const { heading, desc, Title, reviewData } = req.body;
    const newReviewData = reviewData.map(review => {
      if (review.reviewVideo) {
        const result = cloudinary.uploader.upload(review.reviewVideo, {
          resource_type: 'video'
        });
        review.reviewVideo = result.secure_url;
      }
      return review;
    });

    const testimonials = new testimonialsModel({
      heading,
      desc,
      Title,
      reviewData: newReviewData
    });

    await testimonials.save();
    res.status(201).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all testimonials entries
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialsModel.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single testimonials entry by ID
export const getTestimonialsById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonials = await testimonialsModel.findById(id);
    if (!testimonials) {
      return res.status(404).json({ message: 'Testimonials data not found' });
    }
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a testimonials entry by ID
export const updateTestimonials = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedReviewData = updatedData.reviewData.map(review => {
      if (review.reviewVideo) {
        const result = cloudinary.uploader.upload(review.reviewVideo, {
          resource_type: 'video'
        });
        review.reviewVideo = result.secure_url;
      }
      return review;
    });

    const testimonials = await testimonialsModel.findByIdAndUpdate(id, {
      ...updatedData,
      reviewData: updatedReviewData
    }, { new: true });

    if (!testimonials) {
      return res.status(404).json({ message: 'Testimonials data not found' });
    }
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a testimonials entry by ID
export const deleteTestimonials = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonials = await testimonialsModel.findByIdAndDelete(id);
    if (!testimonials) {
      return res.status(404).json({ message: 'Testimonials data not found' });
    }
    res.status(200).json({ message: 'Testimonials data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
