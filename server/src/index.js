// import dependencies

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// define the Express app
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("user_info.db");

// security helmet
app.use(helmet());

// enable cors
app.use(cors());

// parse application/json content-type
app.use(bodyParser());
app.use(bodyParser.json());

// log http requests
app.use(morgan('combined'));


db.serialize(function() {
    db.run("CREATE TABLE if not exists user_info (info TEXT)");
    /*var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM user_info", function(err, row) {
        console.log(row.id + ": " + row.info);
    });*/
});

function getUsersInfos () {
    return new Promise((resolve, rej) => {
        let datas = [];
        let counter = 0;
        db.serialize(function() {
            const stmt = db.prepare('SELECT * FROM user_info').all();
            stmt.finalize();
            db.run("CREATE TABLE if not exists user_info (info TEXT)");
            db.each("SELECT rowid AS id, info FROM user_info", function (err, row) {
                counter++;
                datas.push(row.info);
                if(counter === 10) {
                    return resolve(datas)
                }
            });
        });
    })
}

getDatas = function(callback) {
    db.each("SELECT rowid AS id, info FROM user_info", function (err, row) {
        callback(row)
    });
}

getDatas(function(row) {
    console.log(1);
})

app.get('/users_infos', (req, res) => {
    getUsersInfos().then(resolve => {
        res.send(resolve)
    })
});

// run server
app.listen(7777, () => {
    console.log('keep calm and listen to port 7777')
});