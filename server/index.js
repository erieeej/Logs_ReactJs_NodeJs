const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')
// ********** Data Access Layer starts
const db = mysql.createPool({
host: "localhost", 
user: "root",
password: "" , 
database: "logs"
});
// Data Access Layer tends ************.

//  *********** Controller layer starts :
app.use(cors());
app.use(express.json());//grap info from the front end as json
app.use(bodyParser.urlencoded({extended: true}));
app.get('/api/getbyid/:id', (req, res) => { // to get info, send to the frontend a json
    const sqlSelect = "SELECT * FROM camera_reviews where id = ?";
    db.query(sqlSelect,[req.params.id], (err, result) => {
        res.send(result);//to display info from the backend
    });

});
app.get('/api/get', (req, res) => { // to get info, send to the frontend a json
    const sqlSelect = "SELECT * FROM camera_reviews";
    db.query(sqlSelect, (err, result) => {
        res.send(result);//to display info from the backend
    });

});

//create
app.post('/api/insert', (req, res) => {
    const Name = req.body.Name; //to request smth from the frontend ( req to grab the data from the fte to the bce)
    const Description = req.body.Description;
    const sqlInsert = "INSERT INTO camera_reviews (Name, Description) VALUES (?,?)"
    db.query(sqlInsert, [Name, Description ], (err, result) => {
        if (result) {
            console.log(result) ; 
            res.json(result) ;
        }
        else {

        }
    });
});
// Controller layer ends**********

app.put("/api/update", (req, res) =>{
    const name = req.body.Name;
    const review = req.body.Description;
    const sqlUpdate = " UPDATE camera_reviews SET Description = ? WHERE Name = ?";
    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err);
    });
});

app.listen(3001, () => {
console.log("runnind on port 3001");
});
