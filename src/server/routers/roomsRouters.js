const express = require('express')
const Rooms = require('../models/room')
const router = new express.Router()
const auth = require('../middleware/auth')


/* GET home page. */
router.get('/health', function (req, res, next) {
  res.send('Express RESTful API');
});



/**
 * This function comment is parsed by doctrine
 * @route GET /rooms
 * @group Rooms
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/rooms', async (req, res) => {
  Rooms.find({}, (err,rooms) =>{
    res.send(rooms);
  }).populate({
    path: 'members',
    populate: {
      path: 'members',
      model: 'user'
    }
 });

})

/**
 * This function comment is parsed by doctrine
 * @route GET /rooms
 * @group Rooms
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
 router.get('/rooms/:id', async (req, res) => {
  const _id = req.params.id

  try{

    const room = await Rooms.findById(_id).populate({
      path: 'members',
      populate: {
        path: 'members',
        model: 'user'
      },
   }).populate({
    path: 'messages.postedBy',
    populate: {
      path: 'messages.postedBy',
      model: 'user'
    },
 });


    if (!room) {
        return res.status(404).send()
    }


    //console.log(user.tasks)
    res.send(room)
  }catch (e) {
    console.log(e)
    res.status(500).send()
}

})

/**
 * This function comment is parsed by doctrine
 * @route POST /rooms
 * @group Room creation - Room creation
 * @param {Room.model} Rooms.required - name
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
 router.post('/rooms', async (req, res) => {
  //console.log(req.body)
  const rooms = new Rooms(req.body)
  //console.log(rooms)
  try {
    const roomsCreated = await rooms.save();

    //res.status(201).sendStatus(catalogCreated)
    res.sendStatus(201)
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }

})


module.exports = router
