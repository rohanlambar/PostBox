import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloud.js'; // Import Cloudinary config

// Configure Multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'posts', // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Allowed file types
  },
});

const upload = multer({ storage });

export default upload;
