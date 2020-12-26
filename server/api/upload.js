const router = require('express').Router()
const {PORT} = require('../index')
// const path = require('path')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/images')
  },
  filename: (req, file, cb) => {
    console.log(file)
    let filetype = ''
    if (file.mimetype === 'image/gif') {
      filetype = 'gif'
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png'
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg'
    }
    cb(null, 'image-' + Date.now() + '.' + filetype)
  }
})

const upload = multer({storage: storage})

router.post('/image', upload.single('file'), function(req, res, next) {
  console.log('req.file', req.file)
  if (!req.file) {
    res.status(500)
    return next(err)
  }
  console.log('PORT', PORT)
  res.json({
    fileUrl: `http://localhost:${PORT}/uploads/images/` + req.file.filename
  })
})

module.exports = router
