Step 1:
    Made a file named nerdsConnect (social web app) and made index.js file

Step 2:
    In index.js we initialized 'npm init' in termianl from 'cd nerdsConnect'. Filled the package name, version, descrip, ...etc.

Step 3: 
    Made directories => controllers models views config routes (directroy structure setup)

Step 4:
    -initialized express in index.js from terminal 'npm init express'
    -const express = require('express');
    -const app = express();
    -app.listen(port, function(err){---#the call back function---})
    -fired us server using nodemon index.js

//
to avoide always using nodemon index.js we go to package.json and in script object we add
....
    "scripts": {
    "start": "nodemon index.js",
..... 
and now do 'nmp start' this will automaticallt run on save and start
//

Step 5:
    -git init 
    -git add .
    -github repo
    -.gitignore for node_modules

Step 6:
    -setting up express router
    -make index.js in route folder
    -require express
    -const router = express.Router();
    -export this as module --module.exports = router;

Step 7:
    -we know ...app.get('/', function{})... here the functionis action
    -controller file contails those list of action and exported as module.exports
    -that is required in router and action is used in ...router.('/', #import or reqiuired function from controller)...

Step 8:
    -setting up again a controller and router 
    -this time we used user_controller.js
    -that is expoerted and addded to(used) index with 
    - //for any further routes, access from here
    ...router.use('roterName', require('./routerfile'))... in index.js of router 

Step 9:
    -setting up the view engine (ejs)
    -in views index.js we set the view engine as ejs after npm install ejs in terminal
    -again setting up the view path

Step 10:
    -setting up home.ejs our view html code
    -and we made a home_controller and added it to router in indedx.js with the action to res.end('<h1>Welcome to NerdsConnect</h1>')

Step 11:
    -in similar fashion we added a post controller as an assigniment seperately from home.ejs
 Step 12:
    -we added signin/signup pages in view folder
    -then using render action in user.js we render it in path of user/signin or users/signup

Step 13:
    -now learning about the cookies and further work will be to POST the form to database for create user and userSession 

Step 14:
    -setup static file access and using layouts for footer header plus how it works
    -using the <%- include %> blocks where ever needed
    -setiing the acces in the main index.js

Step 15:
    -made a js file on config folder 
    - wrote code to connect to mongodb server
    -exported it and required it in the main index.js

Step 16:
    -setting up the cookie-parser in main index.js and also adding the express.urlencoded() that later will be used for accesing the form data for sign in sign up like in mini project

Step 17:
    -