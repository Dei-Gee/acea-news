const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI;
const path = require('path');

const stories = require('./routes/api/stories');

const app = express();

//use routes
app.use('/api/stories', stories);


//BodyParser MiddleWare
app.use(bodyParser.json());

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