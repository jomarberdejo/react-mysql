
const express = require('express')



const multer = require('multer');
const path = require('path');
const router = express.Router();
const connection = require('../databaseConfig/db')


router.get('/', (req, res) => {
    const sql = `
    SELECT 
    r.report_id,
    r.severity, 
    r.description, 
    r.file_path,
    DATE_FORMAT(r.reported_at, '%Y-%m-%d %H:%i:%s') AS reported_at, 
    u.firstname
FROM 
    reports AS r
JOIN 
    users AS u ON r.user_id = u.user_id
`;

    connection.query(sql, (error, result) => {
        if (error) {
            res.json(error);
        } else {
            res.json(result);
        }
    });
});


//GET SINGLE reports
router.get('/:id' , (req, res) => {
    const {id} = req.params;
    const sql = `
    SELECT 
    r.report_id,
    r.severity, 
    r.description, 
    r.file_path,
    DATE_FORMAT(r.reported_at, '%Y-%m-%d %H:%i:%s') AS reported_at, 
    u.firstname
FROM 
    reports AS r
JOIN 
    users AS u ON r.user_id = u.user_id WHERE report_id = ${Number(id)}
`;

    connection.query(sql, (error, result) => {
        if (error) {
            res.json(error);
        } else {
            res.json(result);
        }
    });
})






const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({ storage: storage });


router.post('/', upload.single('file'), (req, res) => {
    const { severity, description, userId } = req.body;
    const file = req.file;
    console.log('File details:', file);

    const sql = 'INSERT INTO reports (severity, description, user_id, file_path) VALUES (?, ?, ?, ?)';
    const values = [severity, description, userId, file.path];

    connection.query(sql, values, (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(200).json({ message: 'Report added successfully', result });
        }
    });
});


//DELETE reports
router.delete('/:id' , (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM reports WHERE report_id = ${Number(id)}`;


    connection.query(sql, (error, result) => {
        if (error){
            res.json({
                error: error.message
            })
        }
        else{
            res.json({
                message: "Report deleted successfully", result
            })
        }
    })
})


//UPDATE reports
router.patch('/:id' , (req, res) => {
    const {severity: severityValue, description:descriptionValue} = req.body;
    const {id} = req.params

    const sql = `UPDATE reports SET severity= '${severityValue}', description= '${descriptionValue}' WHERE report_id = ${Number(id)}`

    connection.query(sql, (error, result) => {
        if (error){
            res.json({
                error: error.message
            })
        }
        else{
            res.json({
                message: "Report updated successfully", result
            })
        }
    })
})




module.exports = router
