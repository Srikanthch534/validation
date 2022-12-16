const express = require('express')
const app = express();
const bcrypt = require('bcrypt');
const con = require('./mysqlconnection/db')
app.use(express.json())

const port = 7002;
app.listen(port, function () {
    console.log(`seriver connected on port no ${port}`);

})

app.post("/users",function (req, res) {
    const { username, name, password, location } = req.body;
    if (username === '') {
        res.status(401).send("Invalid username")
    }
    const selectquery = `SELECT * FROM user_table WHERE username = '${username}'`;
    con.query(selectquery, function (error, results) {
        if (error) {
            res.send(400).send("Error in the database")
        } else {

            if (results.length === 0) {

                var insertdata = `
                INSERT INTO user_table
                (
                    username,name,password,location
                )
                VALUES
                (
                    '${username}', '${name}', '${password}','${location}'
                )`;

                con.query(insertdata, function (error, results) {
                    if (error) {
                        console.log(error);
                        res.status(400).send("Error in the database")
                    } else {
                        res.send("Successfully inserted the data")
                    }
                })
            } else {
                res.send("user already exits")
            }
        }
        
    })
 
})

