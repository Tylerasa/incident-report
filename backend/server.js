const express =  require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require("cors");
const config = require('config');
const app = express();
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')
const report = require('./routes/api/report')
const db = config.get("mongoURI");



app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors());



mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> console.log('db connected...'))
.catch((err)=> console.log(err));




app.use('/api/users',users)
app.use('/api/auth',auth)
app.use('/api/report',report)



const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log('Server Listening'))