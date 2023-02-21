
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//Authenticate the user & get token
//@route: POST /api/user/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body
    //res.send({ email, password })

    //Looks for user by email
    const user = await User.findOne({ email })
    //Checking to see if user and password match
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

export { authUser }


