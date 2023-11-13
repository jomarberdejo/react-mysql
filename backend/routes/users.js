
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router();
const connection = require('../databaseConfig/db')


//GET ALL users
router.get('/' , (req, res) => {
    const sql = 'SELECT * FROM users';

    const result = connection.query(sql, (error, result)=> {
        if (error) {
            res.json(error)
        }
        else{
            res.json(result)
        }
    });

    
})

//GET SINGLE users
router.get('/:id' , (req, res) => {
    return res.json({
        message: 'Get single users'
    })
})

//ADD NEW users
router.post('/' , async(req, res) => {
    const salt = await bcrypt.genSalt(10)
    
    const {firstname:firstnameValue, lastname:lastnameValue, location:locationValue, email:emailValue, password:passwordValue} = req.body;

    const hashedPassword = await bcrypt.hash(passwordValue, salt)
    const roleValue = 'User'

    const sql = `SELECT * FROM users WHERE email = ?`
    values = [emailValue]

    connection.query(sql, values, (err, result)=> {
        if (err){
            res.json(err)
        }
        else{
            if (result.length > 0){
                res.json({message: "Email already in use"})
            }
            else{
                const sql = `INSERT INTO users (firstname, lastname, location, email, password, role) VALUES (?, ?, ?, ?, ?, ?)`
                const values = [
                    firstnameValue,
                    lastnameValue,
                    locationValue,
                    emailValue,
                    hashedPassword,
                    roleValue,
                ]
                const result = connection.query(sql, values, (err, result) => {
                    if (err){
                        res.json(err)
                    }
                    else{
                        res.json({ message: 'Register successfully', result });
                    }
                })
            }
        }
    })
})

//DELETE users
router.patch('/:id' , (req, res) => {
    return res.json({
        message: 'Update users'
    })
})


//UPDATE users
router.delete('/:id' , (req, res) => {
    return res.json({
        message: 'Delete users'
    })
})




module.exports = router
