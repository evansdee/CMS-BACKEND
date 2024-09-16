const express = require('express');
const { uploadPhoto } = require('../controller/uploaderController');
const { authentication } = require('../controller/authController');
const router = express.Router();

// Route to upload a file
router.post('/',authentication, (req, res) => {
  uploadPhoto(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Prepend hostname to the file URL
    const fileUrl = `http://${process.env.DB_HOST}:${process.env.APP_PORT}/uploads/photos/${req.file.filename}`;
    res.json({ fileUrl });
  });
});

module.exports = router;
