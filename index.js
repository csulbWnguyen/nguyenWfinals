const express = require("express");
const app = express();
const path = require("path");
const {Pool} = require("pg");
const multer = require("multer");
const upload = multer();
require("dotenv").config();
const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized:false
  }
});
app.set("view engine", "ejs");

app.listen(3000,()=>{ {
    console.log("Server started (http://localhost:3000/) !");
}});

//imagine got numbers 8 and 10 increment 1 (start 8 end 10) (8+9+10)
//We need a function
//get array 8,9,10
//get array to add together.

app.get("/", (req, res) => { {
    //res.send ("Hello world!");
    res.render("index");
}});

app.get("/sum", (req, res) => {
  res.render("sum");
});

//get input from user: 
//imagine got numbers 8 and 10 increment 1 (start 8 end 10) (8+9+10)
//We need a function
//get array 8,9,10
//get array to add together.

app.post("/sum"),(req,res) =>{
  number1 = document.getElementById("starting");
  number2 = document.getElementById("ending");
  increment = document.getElementById("increment");
  result = document.getElementById("result");
  
  aNumber = [];
  for (let i=number1; i<=number2; i+=increment)
{
    aNumber.push(i);
    console.log(aNumber);
}

    const sum = aNumber.reduce((acc,value)=> acc+value,0);
  if (number1 >= number2){
    message = `Ending number must be less than starting number`
  }
  else {
    message =`The sum of the numbers from ${number1} to ${number2} incremented by 2 is ${sum}`
  }
  document.getElementById("result").appendChild(message);
  res.render("sum",
  {
    message: message
  });
}


app.get("/import", (req, res) => {
  res.render("import");});




  app.post("/import",  upload.single('filename'), (req, res) => {
    if(!req.file || Object.keys(req.file).length === 0) {
        message = "Error: Import file not uploaded";
        return res.send(message);
    };
    //Read file line by line, inserting records
    const buffer = req.file.buffer; 
    const lines = buffer.toString().split(/\r?\n/);

    lines.forEach(line => {
        //res send
         product = line.split(",");
         //console.log(product);
         const sql = "INSERT INTO book(book_id, title, total_pages, rating, isbn, published_date) VALUES ($1, $2, $3, $4, $5, $6)";
         pool.query(sql, product, (err, result) => {
             if (err) {
                 console.log(`Insert Error.  Error message: ${err.message}`);
             } else {
                 console.log(`Inserted successfully`);
             }
        });
    });
    message = `Processing Complete - Processed ${lines.length} records`;
    res.send(message);
});