//THESE ARE THE PACKAGES THAT WE HAVE JUST INSTALLED//
const express = require('express');
const bodyParser = require('body-Parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

//THESE LINES ARE FOR GETTING THE DATA FROM THE DATABASE//    
const db = mysql.createConnection ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL');
});

app.get ('/', (req, res) => {
    res.send('Backend is working!'); //THE RESPONSE SENDS A MESSAGE TO TELL ME THAT EVERYTHING IS RUNNING SMOOTHLY//
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//STAFF ENTITIES :

// POST STAFF
app.post('/addStaff', (req, res) => {
    const { name, email, password , gender, role } = req.body; // Assuming staff data is in request body
    const sql = "INSERT INTO Staff (name, email, password, gender, role) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, email, password ,gender, role], (err, result) => {
        if (err) {
            console.error('Error adding staff:', err);
            res.status(500).send('Error adding staff');
            return;
        }
        res.send('Staff member added successfully!');
    });
});

// GET (STAFF)
app.get ('/getStaff', (req, res) => {
    console.log('req.body:', req.body);
    db.query('SELECT * FROM Staff',(err, results) => {
        if(err) {
            console.error('Error fetching staff members:', err);
            res.status(500).send('Error fetching staff members');
            return;
        }
        res.json(results);
    });
});

//UPDATE (STAFF)
app.put('/updateStaff', (req,res) => {
    const { staff_id, name, email, password } = req.body;
    const query = `UPDATE Staff SET name = '${name}', email = '${email}', password = '${password}' WHERE staff_id = ${staff_id}`;
    db.query(query, (err, result) => {
        if(err) throw err;
        res.send('Staff member has been updated successfully');
    });
});

//DELETE (STAFF) "I used DELETE instead of POST & used req.query instead of req.body
app.delete('/deleteStaff', (req,res) => {
    const { staff_id } = req.query;
    const query = `DELETE FROM Staff WHERE staff_id = ${staff_id}`;
    db.query(query, (err, result) => {
        if(err) throw err;
        res.send('Staff member deleted successfully');
    });
});

//LOGIN (STAFF) - I wrote /loginStaff instead of Login only
app.post('/loginStaff', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Staff WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if(err) {
            console.error('Error during login:', err);
            res.status(500).send('Server error');
            return;
        }

        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

//SEARCH API (STAFF)
app.get('/searchStaff', (req, res) => {
    const { name,  email, gender } = req.query;
    const query = 'SELECT * FROM Staff WHERE name LIKE ? OR email LIKE ? OR gender LIKE ?';

    db.query(query, [`%${name}%`, `%${email}%`, `${gender}`], (err, results) => {
        if(err) {
            console.error('Error during search:', err);
            res.status(500).send('Error during search');
            return;
        }

        res.json({message: 'Success', staff: results});
    });
});

// -----------------------------------------------------"SPONSOR"SECTION------------------------------------------------------ //

// POST (SPONSOR)
app.post('/addSponsor', (req, res) => {
    const { sponsor_name, email, password , Address, description, end_date, start_date } = req.body;
    const sql = "INSERT INTO Sponsor (sponsor_name, email, password , Address, description, end_date, start_date) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [sponsor_name, email, password , Address, description, end_date, start_date], (err, result) => {
        if (err) {
            console.error('Error adding sponsor:', err);
            res.status(500).send('Error adding sponsor');
            return;
        }
        res.send('Sponsor has been added successfully!');
    });
});

// GET (SPONSOR)
app.get ('/getSponsor', (req, res) => {
    console.log('req.body:', req.body);
    db.query('SELECT * FROM Sponsor',(err, results) => {
        if(err) {
            console.error('Error fetching sponsors:', err);
            res.status(500).send('Error fetching sponsors');
            return;
        }
        res.json(results);
    });
});

// UPDATE (SPONSOR)
app.put('/updateSponsor', (req,res) => {
    const { sponsor_id, sponsor_name, email, end_date, start_date } = req.body;
    const query = `UPDATE Sponsor SET sponsor_name = '${sponsor_name}', email = '${email}', end_date = '${end_date}',  start_date = '${start_date}' WHERE sponsor_id = ${sponsor_id}`;
    db.query(query, (err, result) => {
        if(err) throw err;
        res.send('Sponsor has been updated successfully');
    });
});

// DELETE (SPONSOR)
app.delete('/deleteSponsor', (req,res) => {
    const { sponsor_id } = req.query;
    const query = `DELETE FROM Sponsor WHERE sponsor_id = ${sponsor_id}`;
    db.query(query, (err, result) => {
        if(err) throw err;
        res.send('Sponsor deleted successfully');
    });
});

// LOGIN (SPONSOR)
app.post('/loginSponsor', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Sponsor WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if(err) {
            console.error('Error during login:', err);
            res.status(500).send('Server error');
            return;
        }

        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// SEARCH (SPONSOR)
app.get('/searchSponsor', (req, res) => {
    const { sponsor_name,  email, start_date, end_date } = req.query;
    const query = 'SELECT * FROM Sponsor WHERE sponsor_name LIKE ? OR email LIKE ? OR start_date LIKE ? OR end_date LIKE ?';

    db.query(query, [`%${sponsor_name}%`, `%${email}%`, `%${start_date}%`, `%${end_date}%`], (err, results) => {
        if(err) {
            console.error('Error during search:', err);
            res.status(500).send('Error during search');
            return;
        }

        res.json({message: 'Successful', sponsor: results});
    });
});

// -----------------------------------------------------"DONATION"SECTION------------------------------------------------------ //

// POST (DONATION)
app.post('/addDonation', (req, res) => {
    const { donation_status, donation_note, type , amount, unit, date, staff_id_fk, sponsor_id_fk } = req.body;
    const sql = "INSERT INTO Donation (donation_status, donation_note, type , amount, unit, date, staff_id_fk, sponsor_id_fk) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [donation_status, donation_note, type , amount, unit, date, staff_id_fk, sponsor_id_fk], (err, result) => {
        if (err) {
            console.error('Error adding donation:', err);
            res.status(500).send('Error adding donation');
            return;
        }
        res.send('Donation has been added successfully!');
    });
});

// GET (DONATION)
app.get ('/getDonation', (req, res) => {
    console.log('req.body:', req.body);
    db.query('SELECT * FROM Donation',(err, results) => {
        if(err) {
            console.error('Error fetching donations:', err);
            res.status(500).send('Error fetching donations');
            return;
        }
        res.json(results);
    });
});

// UPDATE (DONATION)
app.put('/updateDonation', (req,res) => {
    const { donation_code, donation_status, type, amount, unit } = req.body;
    const query = `UPDATE Donation SET donation_status = '${donation_status}', type = '${type}', amount = '${amount}',  unit = '${unit}' WHERE donation_code = ${donation_code}`;
    db.query(query, (err, result) => {
        if(err) throw err;
        res.send('Donation has been updated successfully');
    });
});

// DELETE (DONATION)
app.delete('/deleteDonation', (req,res) => {
    const { donation_code } = req.query;
    const query = `DELETE FROM Donation WHERE donation_code = ${donation_code}`;
    db.query(query, (err, result) => {
        if(err) throw err;
        res.send('Donation deleted successfully');
    });
});

// SEARCH (DONATION)
app.get('/searchDonation', (req, res) => {
    const { donation_status,  type, unit, amount, date } = req.query;
    const query = 'SELECT * FROM Donation WHERE donation_status LIKE ? OR type LIKE ? OR unit LIKE ? OR amount LIKE ? OR date LIKE ? ';

    db.query(query, [`%${donation_status}%`, `%${type}%`, `%${unit}%`, `%${amount}%`, `%${date}%` ], (err, results) => {
        if(err) {
            console.error('Error during search:', err);
            res.status(500).send('Error during search');
            return;
        }

        res.json({message: 'Successful', Donation: results});
    });
});

// -----------------------------------------------------"ORPHAN" SECTION------------------------------------------------------ //
// -----------------------------------------------------"COURSE"SECTION------------------------------------------------------ //
// -----------------------------------------------------"FEEDBACK"SECTION------------------------------------------------------ //
// -----------------------------------------------------"LOGIN"SECTION------------------------------------------------------ //
