const experss= require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // You may need to install this package
const app=experss();
const PORT =process.env.PORT || 5000;
const cors = require('cors');
const createRouter=require('./Routes/Create')
const alltodos=require('./Routes/Read')
const deleteRouter=require('./Routes/Delete')
require('dotenv').config();
const URI ='mongodb+srv://amanzhx1234:election123@cluster0.bjbll35.mongodb.net/todo'
app.use(bodyParser.json());

app.use(cors({ origin: '*' }));



app.use('/api',cors(),createRouter)
app.use('/api',cors(),alltodos)
app.use('/api',cors(),deleteRouter)

var whitelist = ['http://localhost:5173/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


const connect=async()=>{


    await  mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }).then(console.log("Mongo Is connected Successfully"))
    
    }
    
    

app.listen(PORT,()=>{
    console.log(`app is listening to port http://localhost:${PORT}`)
    connect();

})




