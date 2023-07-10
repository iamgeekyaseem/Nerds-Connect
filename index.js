const express = require('express');
const app = express();
const port = 8000; //bydefault webs run on port 80 in live server


//use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        // console.log('Error', err);
        //using interpolation which means instead of joining strsings or vraibles we can embedd variable in string using 'backtick'
        console.log(`Error in running the server: ${err}`)
    }
    console.log(`Server is running on port: ${port}`);
})