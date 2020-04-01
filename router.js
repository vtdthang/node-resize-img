const express = require('express');
const path = require('path');

const upload = require('./uploadMiddleware');
const Resize = require('./resize');

const router = express.Router();

router.get('/', async function (req, res) {
  await res.render('index');
});

router.post('/post', upload.single('image'), async function (req, res) {
    const imagePath = path.join(__dirname, '/public/images');
    const fileUpload = new Resize(imagePath);

    if(!req.file) {
        res.status(400).json({error: 'Please choose file'});
    }

    const filename = await fileUpload.save(req.file.buffer);

    return res.status(200).json({name: filename});
});

module.exports = router;