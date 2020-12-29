const router = require('express').Router()
const {PORT} = require('../index')
const {Image, User} = require('../db/models')

const express = require('express')
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({limit: '12mb', extended: true}))
router.use(express.json())

const fs = require('fs')
const path = require('path')

const multer = require('multer')

// !REPLACE this with a process Var
const uploadsURL = './public/uploads/images/'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsURL)
  },
  filename: (req, file, cb) => {
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
  if (!req.file) {
    res.status(500)
    // return next(err)
  }

  const imageObject = {
    fileUrl: `http://localhost:${PORT}/uploads/images/` + 'test'
  }
  res.json(imageObject)
})

router.post('/upload-image', async (req, res) => {
  try {
    if (!req.files) {
      res.status(401).send({
        status: false,
        message: 'No file uploaded'
      })
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let userImage = req.files.file

      let imageName = req.body.hashName
        ? req.body.hashName +
          '.' +
          userImage.name
            .split('.')
            .slice(-1)
            .pop()
        : userImage.name

      let fileUrl = uploadsURL + imageName

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      userImage.mv(fileUrl)

      let uploadedFileUrl =
        '/' +
        fileUrl
          .split('public/')
          .slice(-1)
          .pop()

      //send response
      res.status(201).send({
        status: true,
        message: 'File is uploaded',
        data: {
          originalName: userImage.name,
          hashName: imageName,
          mimetype: userImage.mimetype,
          size: userImage.size,
          uploadedFileUrl: uploadedFileUrl
        }
      })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/remove-image/:imageId', async (req, res, next) => {
  try {
    const response = await Image.findAll({
      where: {
        id: req.params.imageId
      }
    })

    const imageToDelete = response[0]

    const pathToRemove = path.join('./public/' + imageToDelete.fileUrl)

    fs.unlinkSync(pathToRemove)
    // try {

    // } catch (err) {
    //   res.sendStatus(500)
    //   throw 'Could not remove image from file.'
    // }

    // deletedImage instanceof Image
    const deletedImage = imageToDelete.destroy()
    // const deletedImage = imageToDelete.destroy({ force: true });

    res.status(204).json(deletedImage)
  } catch (error) {
    next(error)
  }
})

// router.post('/upload-images', async (req, res) => {
//   try {
//     if (!req.files) {
//       res.send({
//         status: false,
//         message: 'No file uploaded',
//       })
//     } else {
//       let data = []

//       //loop all files
//       _.forEach(_.keysIn(req.files.photos), (key) => {
//         let photo = req.files.photos[key]

//         //move photo to uploads directory
//         photo.mv('./uploads/' + photo.name)

//         //push file details
//         data.push({
//           name: photo.name,
//           mimetype: photo.mimetype,
//           size: photo.size,
//         })
//       })

//       //return response
//       res.send({
//         status: true,
//         message: 'Files are uploaded',
//         data: data,
//       })
//     }
//   } catch (err) {
//     res.status(500).send(err)
//   }
// })

router.post('/record', async (req, res, next) => {
  try {
    const image = await Image.create(req.body)

    const user = await User.findByPk(req.body.userId)

    user.addImage(image)

    const imageValues = image.dataValues
    res.status(201).json(imageValues)
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Image already exists')
    } else {
      next(err)
    }
  }
})

module.exports = router
