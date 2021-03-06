const express = require('express');

const multer = require('multer');
const path = require('path');

const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    // convert a file name
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

const trailsController = require('../controllers/trails/trails');
const tagController = require('../controllers/trails/tag');
const trailIdController = require('../controllers/trails/trailId');
const commentController = require('../controllers/trails/comment');

router.get('/', trailsController.get);
router.post('/', upload.single('img'), trailsController.post);
router.get('/:tag', tagController);
router.get('/:tag/:trailId', trailIdController);
router.post('/:tag/:trailId/comment', upload.single('img'), commentController);

module.exports = router;
