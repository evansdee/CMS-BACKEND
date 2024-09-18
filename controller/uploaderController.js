const multer = require('multer');
const path = require('path');

// Define the storage location for photos
const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/photos')); // Save photos in the 'photos' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name for the photo
  }
});

// Define the storage location for certificates
const certificateStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/certificates')); // Save certificates in the 'certificate' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name for the certificate
  }
});

// Create the upload handlers for photos and certificates
const uploadPhoto = multer({
  storage: photoStorage,
  limits: { fileSize: 1024 * 1024 * 100 } // Limit the file size to 5MB
}).single('photo');

const uploadCertificate = multer({
  storage: certificateStorage,
  limits: { fileSize: 1024 * 1024 * 100 } // Limit the file size to 5MB
}).single('certImg');

// Export both upload handlers
module.exports = {
  uploadPhoto,
  uploadCertificate
};
