const express = require('express');
const app = express();
const port = 4000
app.use(express.json())
app.use('/',require('./router'));
app.use('/',require('./database'));
app.listen(port,()=>{
    console.log("it's running");
});