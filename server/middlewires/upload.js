
const multer = require('multer');
const path = require('path');
const sanitize = require('sanitize-filename');
const uploadDir = path.join(__dirname, '../uploads/');

const storage = multer.diskStorage({
  destination: uploadDir,  
  filename: function (req, file, cb) {
    if (req.body.f_Name) {
      const sanitizedName = sanitize(req.body.f_Name.replace(/\s+/g, '_').toLowerCase());  
      const sanitizedFilename = `${sanitizedName}${path.extname(file.originalname)}`;
      cb(null, sanitizedFilename);
    } else {
      const fallbackFilename = sanitize(file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      cb(null, fallbackFilename);
    }
  }
});

function checkFileType(file, cb) {
  
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
