const multer = require('multer');
const path = require('path');
const sanitize = require('sanitize-filename');

const uploadDir = path.join(__dirname, '../uploads/');

const storage = multer.diskStorage({
  destination: uploadDir,  // Folder to store the uploaded images
  filename: function (req, file, cb) {
    const sanitizedFilename = sanitize(file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    cb(null, sanitizedFilename);
  }
});

function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!'); 
  }
}

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 4000000 },  // Max file size: 4MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

module.exports = upload;
