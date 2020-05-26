const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

const User = require('../../models/Report');



router.post('/', (req, res)=>{
    const {name, actType, desc, department, email} = req.body

    if(!name || !actType){
        return res.status(400).json({ msg: 'You Can Not Leave The Form Blank!' })
    }

    const newReport = new User({
        name,
        email,
        reportData:
        {
        actType,
        desc,
        department,
        date: Date.now()
    }})


    newReport.save()
            .then(
                user=>{
                    res.json({
                        user: {
                            id: user.id,
                            name: user.name,
                            report: user.reportData[0].actType,
                            date: user.reportData[0].date,
                        }
                    })
                }
            )


        
    

    

})



router.get('/', (req, res)=>{
    const  email = req.query.email
    Report.find({email: email})
    .sort({date: -1})
    .then(reports=>res.json(reports))
})

module.exports = router