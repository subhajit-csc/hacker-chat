const mongoose = require('mongoose')
const validator = require('validator')
const { toJSON, paginate } = require('./plugins');

/**
 * @typedef Rooms
 * @property {string} name.required - Room Name - eg: Dev Team
 * @property {string} desc - Room Description - eg: Dev Team
 * @property {Array.<User>} members.required - members
 * @property {Array.<Messages>} messages.required - messages
 */
/**
 * @typedef Messages
 * @property {string} text.required - message - eg: First message
 * @property {string} postedBy - sender - eg: sender 1
 */


const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  }
  ],
  messages:[ {

    text: {
      type: String,
      trim: true
    },
    postedBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  }
  }
  ]
}, {
  timestamps: true,
  versionKey: false
})


// add plugin that converts mongoose to json
roomSchema.plugin(toJSON);
roomSchema.plugin(paginate);

//Define Text Index
roomSchema.index({
  name: "text",
  description: "text"
},
  {
    weights: {
      text: 1
    },
    name: "TextIndex"
  });


const Rooms = mongoose.model('rooms', roomSchema)

module.exports = Rooms
