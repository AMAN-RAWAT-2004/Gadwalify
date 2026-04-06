const express = require('express');
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require("google-auth-library");
const User = require('./../models/User');
const mongoose=require('mongoose')
const router = express.Router()
const {
    protect,
    admin
} = require('../middlewares/authentication');

const signToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECURE, {
        expiresIn: process.env.JWT_EXPIRE
    })

}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        avatar: picture
      });
    }

    const authToken = signToken(user._id);

    res.json({ token: authToken });

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
});

router.post('/signup', async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json('User Already Exists')
        }
        user = new User({
            name,
            email,
            password
        })
        await user.save()
        const token = signToken(user._id)
        res.status(201).json({
            message: 'Successfully Signed up',
            token,
            data: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role

            }

        })



    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }

})

router.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;
    try {
        if (!email || !password) return res.status(404).json({
            message: 'Required Fields are empty'
        })
        const user = await User.findOne({
            email
        }).select('+password')
        if (!user) return res.status(404).json({
            message: 'Invalid user'
        })
        const isMatch = await user.matchPassword(password)
        if (!isMatch) return res.status(404).json({
            message: 'Password Incorrect'
        })
        const token = signToken(user._id)
        res.status(201).json({
            message: 'Successfully Logged in',
            token,
            data: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role

            }

        })
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }

})

router.get('/profile', protect, async (req, res) => {
    res.json(req.user)
})


router.get('/',protect,admin, async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password') 
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      message: 'Users fetched successfully',
      totalUsers:users.length,
      data: users,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});


router.get('/:id',protect,admin, async (req, res) => {
  const { id } = req.params;

  try {
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid user id',
      });
    }

    const user = await User.findById(id)
      .select('-password') 
      .lean();

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json({
      message: 'User fetched successfully',
      data: user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
});
module.exports = router;