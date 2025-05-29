const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRECT) {
    throw new Error('Missing required Cloudinary environment variables');
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRECT
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Wanderlust',
        allowedFormats: ["png", "jpg", "jpeg"],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    },
});

module.exports = {
    cloudinary,
    storage
};