//Setup empty JS object to act as endpoint for all routes
let projectData = {};

/* Middle Ware */
//Require Express to run server and routes
const express = require('express');
const cors = require('cors');

//Start up an instance of app
const app = express();

//parse the json files coming the client side
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 9000;

const server = app.listen(port, listen);

function listen(){
    console.log('listening on port ' + port);
}

// Get function

app.get('/all', sendData);

function sendData(req, res){
    res.send(projectData);
}

// Post function

app.post('/add', addData);


async function addData(req,res) {
    const body = await req.body;
    projectData = body;
    res.status(200).send(projectData);    
}

















