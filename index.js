const express = require('express');
const app = express();
const port = 8000; //bydefault webs run on port 80 in live server
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

//this will allow us to use the assets folder as static elemet in the website
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract script and style from subpage to layouts to its designated position
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//use express router
app.use('/', require('./routes'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        // console.log('Error', err);
        //using interpolation which means instead of joining strsings or vraibles we can embedd variable in string using 'backtick'
        console.log(`Error in running the server: ${err}`)
    }
    console.log(`Server is running on port: ${port}`);
})