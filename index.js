const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000; 
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');

const expressLayouts = require('express-ejs-layouts');


//reading through the post request
app.use(express.urlencoded());
app.use(cookieParser());

//this will allow us to use the assets folder as static elemet in the website
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract script and style from subpage to layouts to its designated position
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'nerdsConnect',
    //TODO change the secret before deployment in production
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

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