const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')


/* GET home page. */
router.get('/health', function (req, res, next) {
  res.send('Express RESTful API');
});

/**
 * This function comment is parsed by doctrine
 * @route POST /users/signup
 * @group User Signup - User Signup
 * @param {User.model} user.body.required - name, email, Phone, Address
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/users/signup', async (req, res) => {
  //console.log(req.body)
  const user = new User(req.body)
  //console.log(user)
  try {
    const userCreated = await user.save()

    const token = userCreated.generateAuthToken()

    res.status(201).send({ userCreated, token })
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }

})

/**
 * This function comment is parsed by doctrine
 * @route POST /users/login
 * @group User Signin - User Signup
 * @param {string} email.required - Email
 * @param {string} password.required - Password
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/users/login', async (req, res) => {
  try {
    //console.log(req.body.email+ req.body.password)
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

/**
 * This function comment is parsed by doctrine
 * @route POST /users/logout
 * @group User SignOut - User Signup
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/users/logout', auth, async (req, res) => {
  try {

    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.authToken
    })

    await req.user.save()

    res.status(202).send()

  } catch (e) {
    res.status(401).send(e)
  }
})

/**
 * This function comment is parsed by doctrine
 * @route GET /users/me
 * @group User Me
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})


/**
 * This function comment is parsed by doctrine
 * @route PATCH /users/me
 * @group User Edit - User Edit
 * @param {User.model} user.body.required - name, email, Phone, Address
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  //console.log(updates)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    //return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const user = await User.findById(req.body._id)

    updates.forEach((update) => {
      if (req.body[update]) {
        console.log(update)
        user[update] = req.body[update]
      }

    })

    await user.save()

    //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    console.log(e);
    res.status(400).send(e)
  }
})


router.get('/users/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }
        //console.log(user.tasks)
        res.send({ user, tasks:user.tasks })
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save()

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})


module.exports = router
