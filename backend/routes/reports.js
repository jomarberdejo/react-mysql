
const express = require('express')

const router = express.Router();
const connection = require('../databaseConfig/db')


router.get('/', (req, res) => {
    const sql = `
    SELECT 
    r.report_id,
    r.severity, 
    r.description, 
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

router.post('/', (req, res) => {
    const { severity, description, userId } = req.body;
    const sql = 'INSERT INTO reports (severity, description, user_id) VALUES (?, ?, ?)';
    const values = [severity, description, userId];
    connection.query(sql, values, (error, result) => {
        if (error) {
            res.json({ error: error.message });
        } else {
            res.json({ message: 'Report added successfully', result });
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
