
const express = require('express')

const router = express.Router();
const connection = require('../databaseConfig/db')


//GET ALL STUDENTS
router.get('/' , (req, res) => {
    const sql = 'SELECT * FROM students';

    const result = connection.query(sql, (error, result)=> {
        if (error) {
            res.json(error)
        }
        else{
            res.json(result)
        }
    });

    
})

//GET SINGLE STUDENT
router.get('/:id' , (req, res) => {
    return res.json({
        message: 'Get single student'
    })
})

//ADD NEW STUDENT
router.post('/' , (req, res) => {
    return res.json({
        message: 'Add new student'
    })
})

//DELETE STUDENT
router.patch('/:id' , (req, res) => {
    return res.json({
        message: 'Update student'
    })
})


//UPDATE STUDENT
router.delete('/:id' , (req, res) => {
    return res.json({
        message: 'Delete student'
    })
})




module.exports = router
