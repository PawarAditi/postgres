const { Client } = require('pg');
const express = require('express')
var bodyparser = require('body-parser')

var app = express()
app.use(bodyparser.urlencoded({
    extended : true
}))
//creating template

app.set('view engine','ejs')
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    port: 5432,
    password: 'admin',
    
});

client.connect();
/*
app.get("/create" , function(req,res){
    const query = "CREATE TABLE users (email varchar,firstName varchar,lastName varchar,age int)"

    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Table is successfully created');
        client.end();
    });
    res.send("Table created")
})*/
//create table

app.get("/insert",function(req,res){
    const queryI = "INSERT INTO users (email, firstName, lastName, age)VALUES ('adpawar18@gmail.com', 'aditi', 'pawar', 22)"

    client.query(queryI, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data insert successful');
        
    });
    res.send("Record inserted")
})

app.get("/select" , function(req,res){
    var selectQuery = "select * from users"

    client.query(selectQuery, function(err, result){
        if(err)
        {
            console.log("Err in select query")
            return
        }
        if( result.rowCount > 0 )
        {
            //console.log("Result : ", result.rows)
            for( var tempRow of result.rows )
            {
                console.log(tempRow)
                console.log("*****************")
            }
        }
        else{
            console.log("No information is retrieved")
        }
    })
   // res.render('read',{title : 'list', userData : res})

    res.send("Records selected")
})

app.get("/update" , function(req,res){
    const queryU =" UPDATE users SET age = 22 WHERE email = 'adpawar18@gmail.com'"


client.query(queryU, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data update successful');
    
    });
    res.send("Updated record")
})
app.get("/delete" , function(req,res){
    const queryD = "DELETE FROM users WHERE email = 'adpawar18@gmail.com'"

    client.query(queryD, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data delete successful');
        
    });
    res.send("Deleted record")
})
app.listen(3007,function(err,result){
    console.log("Server started");
})