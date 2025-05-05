const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('./s3');
const path = require('path');

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME, // имя твоего бакета
    acl: 'public-read', // или 'private' если не хочешь публичный доступ
    key: function (req, file, cb) {
      const fileName = Date.now().toString() + path.extname(file.originalname);
      cb(null, `uploads/${fileName}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // лимит 5MB
});

module.exports = upload;