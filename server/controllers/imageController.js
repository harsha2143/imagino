import FormData from 'form-data';
import axios from 'axios';
import user from '../models/user.js'; // Assuming you have a user model

export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        const userId = req.user.id; // Get userId from req.user
        const currentUser = await user.findById(userId);
        if (!prompt || !currentUser) {
            return res.status(400).json({ message: "Missing prompt or userId", success: false });
        }

        // Check if user has enough credits
        if (currentUser.creditBalance <= 0) {
            return res.status(403).json({ message: "Insufficient credits", success: false });
        }

        // Simulate image generation (replace with actual image generation logic)

        const formData = new FormData();
        formData.append('prompt', prompt);
        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer',
        });

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        await user.findByIdAndUpdate(userId, {
            $inc: { creditBalance: -1 }, // Deduct one credit for image generation
        });

        res.status(200).json({ message: "Image generated successfully", success: true, creditBalance: currentUser.creditBalance - 1, resultImage });
    } catch (error) {
        console.error("Error generating image:", error);
        res.status(500).json({ message: error.message, success: false, error });
    }
}