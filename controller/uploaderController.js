

// controllers/uploadController.js

const multer = require('multer');
const path = require('path');

// Define the storage location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/photos')); 
  },
  filename: (req, file, cb) => {
 
    cb(null, file.originalname); 
  }
});

const uploadPhoto = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } 
}).single('photo');

module.exports = {
  uploadPhoto
};

