const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const express = require('express');
const router = express.Router();

router.post('/uploadimage', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // console.log(req.file);
    res.status(200).json(req.file);
});

router.get('/getstaticfile', async (req, res) => {
    try {

    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Error' });
    }
})

module.exports = router