const router = require('express').Router()
const {User, Image} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findAll({
      where: {
        id: req.params.userId
      },
      include: {
        model: Image
      }
    })
    res.json(user[0])
  } catch (error) {
    next(error)
  }
})

// router.get('/:userId', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       attributes: ['id', 'email'],
//       include: {
//         model: Image
//       }
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })
