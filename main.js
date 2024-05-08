const express = require("express");
const app = express();
Port = 5000;

const db = require("./database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

var TempAry;
app.get("/", (req, res) => {
  //     const query = 'select * from emp';
  //     const result = await db.query(query);
  //    const data = result.rows;

  // TempAry = [];
  // for (row of data){
  //   const {emp_id, emp_email, emp_pass} = row;

  //   TempAry.push(row);
  //   console.log(emp_id, emp_email, emp_pass);
  //  console.log(row);
  //  }

  res.render("home");
});

app.get("/getdata", async (req, res) => {
  try {
    const query = "select * from emp";
    await db.query(query, (err, results) => {
      if (err) {
        return res.send(err.message);
      } else {
        console.log("success");
        return res.send(results.rows);
      }
    });
  } catch (error) {
    console.log(error);
  }

  // const data = result.rows;

  // return res.send(data)

  // return res.send(result)
});

app.post("/deleteData", async (req, res) => {
  try {
    const { emialID } = req.body;
    console.log(emialID);
    const query = "DELETE FROM emp WHERE emp_id = $1"; // Using parameterized query
   
    await db.query(query, [emialID], (err, results) => {
      if (err) {
        return res.send(err.message);
      } else {
        console.log("success");
        // return res.send(results.rows);
      }
    });
  } catch (error) {
    console.log(error);
  }
 

  // const data = result.rows;

  // return res.send(data)

  // return res.send(result)
});

// Assuming you already have the necessary setup for Express and database connection

app.post('/insertData', async (req, res) => {
    try {
      const { emp_id,emp_email, emp_pass } = req.body; // Extract emp_id and emp_pass from the request body
      
      // Your SQL query to insert data into the table
      const query = 'INSERT INTO emp (emp_id,emp_email, emp_pass) VALUES ($1, $2,$3)';
      
      // Execute the SQL query with parameters using the database connection
      await db.query(query, [emp_id, emp_email,emp_pass]);
  
      res.status(200).send('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Internal server error');
    }
  });
  

app.listen(Port, () => {
  console.log(`Running on:${Port} `);
});
