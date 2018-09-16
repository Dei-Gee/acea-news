const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI;
const path = require('path');
const cors = require('cors');
const exphbs = require('express-handlebars');

const stories = require('./routes/api/stories');
const email = require('./routes/api/emailroute');

const app = express();


//use routes
app.options('*', cors()); // preflight OPTIONS; put before other routes


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
    // Pass to next layer of middleware
    next();
  });

//BodyParser MiddleWare
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use('/api/stories', stories);

app.use('/api/emailroute', email);

mongoose
.connect(db,  { useNewUrlParser: true })
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err));

//serve static assets if in production
if(process.env.NODE_ENV === 'production')
{
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000;

app.listen(port, () => `Server started on port ${port}`);