const express = require('express')
const userController = require('../controllers/user')
const check = require('../middlewares/auth')
const uploadsCv = require('../middlewares/upload_pdf')
const uploadsVideo = require('../middlewares/upload_video')

const router = express.Router()

router.get('/test', userController.test)
router.post('/save-form',  check.auth, userController.saveForm)
router.post('/upload-cv/:id', [check.auth, uploadsCv.single('file0')], userController.uploadCv)
router.get('/get-cv/:file', check.auth, userController.getCv)
router.post('/upload-video/:id', [check.auth, uploadsVideo.single('file0')], userController.uploadVideo)
router.get('/get-video/:file', check.auth,  userController.getVideo)

module.exports = router