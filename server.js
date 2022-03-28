const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());


app.use(require('./User/user.controller'));
app.use(require('./User_Details/userDetails.controller'));
app.all("*",(req,res,next)=>{
    throw "Requested Path not found";
})
app.use(errorHandler);

process.on('unhandledRejection', (reason)=>{
    console.log(reason)
})

process.on('uncaughtException', (error)=>{
    console.log(error);
    process.exit(1)

})

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));