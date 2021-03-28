const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {

    console.log('Auth Function executed !!')

    try {
        
        const authToken = req.header('Authorization').replace('Bearer ', '')
        //console.log('Auth Header ->' + authToken)
        //const decoded = jwt.verify(authToken, process.env.JWT_SECRET)
        const decoded = jwt.verify(authToken, 'myseretkeysubha')
       // console.log('Id ->' + decoded._id)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': authToken })
        //console.log('user ->' + user)
        if (!user) {
            throw new Error()
        }
        //await user.populate('tasks').execPopulate()

        req.authToken = authToken
        req.user = user
        next()

    } catch (e) {
        res.status(401).send({ error: 'Please authenticate !!'})
    }
    
}

module.exports = auth
