const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

const User = require('../../models/User');



router.post('/', (req, res)=>{
    const { email, password} = req.body

    if(!email || !password){
        return res.status(400).json({ msg: 'Please Fill All Fields' })
    }

    User.findOne({ email })
    .then( user=>{
        if(!user) return res.status(400).json({ msg: 'User Does Not Exits' })
     

        bcrypt.compare(password, user.password)
        .then(
            isMatch=>{
                if(!isMatch)
                    return res.status(400).json({ msg: 'Invalid Credentials' })
                    user=>{
                        res.json({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                            }
                        })
                    }
                
                res.json({user: user})
            }
        )
    } )
})



module.exports = router