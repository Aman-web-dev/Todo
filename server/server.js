const experss= require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // You may need to install this package
const app=experss();
const PORT=5000;
const uri='mongodb+srv://amanzhx1234:election123@cluster0.bjbll35.mongodb.net/todo'
const cors = require('cors');
const createRouter=require('./Routes/Create')
const alltodos=require('./Routes/Read')
const deleteRouter=require('./Routes/Delete')

app.use(bodyParser.json());


app.use(cors())

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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


    await  mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }).then(console.log("Mongo Is connected Successfully"))
    
    }
    
    

app.listen(PORT,()=>{
    console.log(`app is listening to port http://localhost:${PORT}`)
    connect();

})




