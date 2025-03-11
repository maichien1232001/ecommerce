const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'ecommerce/products', // Thư mục lưu ảnh trên Cloudinary
        });
        return result;
    } catch (error) {
        throw new Error('Image upload failed');
    }
};
