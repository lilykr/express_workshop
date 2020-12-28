const { Router } = require('express');

const router = Router();

const mysql = require('mysql');
const { route } = require('../app');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'postulants'
})
connection.connect()

router.get('/postulants', (req, res) => {
    connection.query("SELECT * FROM mock_data", (err, results) => {
        if (err) {
            res.status(500).send('Something broke!')
        }
        else {
            res.status(200).send(results);
        }
    })
});

router.get('/names', (req, res) => {
    connection.query("SELECT first_name, last_name FROM mock_data", (err, results) => {
        if (err) {
            res.status(500).send('Something broke!')
        }
        else {
            res.status(200).send(results);
        }
    })
});

router.get('/readytowork', (req, res) => {
    connection.query("SELECT * FROM mock_data WHERE ready_to_work LIKE '%1%' ", (err, results) => {
        if (err) {
            res.status(500).send('Something broke!')
        }
        else {
            res.status(200).send(results);
        }
    })
});

router.get('/firstname/b', (req, res) => {
    connection.query("SELECT * FROM mock_data WHERE first_name LIKE 'b%' ", (err, results) => {
        if (err) {
            res.status(500).send('Something broke!')
        }
        else {
            res.status(200).send(results);
        }
    })
});

router.get('/birthday/superior', (req, res) => {
    connection.query("SELECT * FROM mock_data WHERE birthday >= '2020-09' ", (err, results) => {
        if (err) {
            res.status(500).send('Something broke!')
        }
        else {
            res.status(200).send(results);
        }
    })
});

router.get('/data/ascending', (req, res) => {
    connection.query("SELECT * FROM mock_data ORDER BY last_name ASC ", (err, results) => {
        if (err) {
            res.status(500).send('Something broke!')
        }
        else {
            res.status(200).send(results);
        }
    })
});

router.post('/postulant/new', (req, res) => {
    const { first_name, last_name, birthday, ready_to_work, years_of_experience } = req.body
    connection.query(
        "INSERT INTO mock_data (first_name, last_name, birthday, ready_to_work, years_of_experience) VALUES (?, ?, ?, ?, ?)",
        [first_name, last_name, birthday, ready_to_work, years_of_experience],
        (err, results) => {
            if (err) {
                res.status(500).send('Something broke!')
            }
            else {
                res.status(201).send("postulant successfully saved");
            }
        })
});

router.put('/postulant/:id', (req, res) => {
    const { id } = req.params
    const newData = req.body
    connection.query(
        "UPDATE mock_data SET ?  WHERE id = ?",
        [newData, id],
        (err, results) => {
            if (err) {
                res.status(500).send('something broke')
            }
            else {
                res.status(200).send("postulant sucessfully modified")
            }
        })
})

router.put('/postulant/:id/readytowork', (req, res) => {
    const { id } = req.params
    connection.query(
        "UPDATE mock_data SET ready_to_work = !ready_to_work WHERE id = ?",
        [id],
        (err, results) => {
            if (err) {
                res.status(500).send('something broke')
            }
            else {
                res.status(200).send("postulant sucessfully modified")
            }
        })
})

router.delete('/postulant/:id', (req, res) => {
    const { id } = req.params
    connection.query(
        "DELETE FROM mock_data WHERE id = ?",
        [id],
        (err, results) => {
            if (err) {
                res.status(500).send('something broke')
            }
            else {
                res.status(204).send("postulant sucessfully deleted")
            }
        })
})

router.delete('/postulants/not_ready', (req, res) => {
    connection.query(
        "DELETE FROM mock_data WHERE ready_to_work = 0",
        (err, results) => {
            if (err) {
                res.status(500).send('something broke')
            }
            else {
                res.status(204).send("postulants not ready to work successfully deleted")
            }
        })
})

module.exports = router;
