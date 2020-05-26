const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

const User = require('../../models/User');



router.post('/', (req, res)=>{
    const {name, email, password, phone, gender} = req.body

    if(!name || !email || !password || !phone || !gender){
        return res.status(400).json({ msg: 'Please Fill All Fields' })
    }

    User.findOne({ email })
    .then( user=>{
        if(user) return res.status(400).json({ msg: 'User Already Exits' })
        const newUser = new User({
            name,
            email,
            password,
            phone,
            gender
        })

        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(
                    user=>{
                        res.json({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                phone: user.phone,
                                gender: user.gender
                            }
                        })
                    }
                )
            })
        })
    } )
})


router.get('/',(req, res)=>{
    res.json({msg: 'get in user'})
})


module.exports = router