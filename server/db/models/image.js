const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  fileUrl: {
    type: Sequelize.STRING(1024),
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^[/images/].+[[png]|[jpg]|[jpeg]]$/g
    },
    defaultValue: '/images/default.png'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: 'default.png'
  }
})

module.exports = Image
