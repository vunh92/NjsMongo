/**
 * install:
 * - npm install express
 * - npm install ejs
 * - npm install mongoose
 * - npm install bcryptjs
 * - npm install cookie-parser
 * - npm install jsonwebtoken
 * - gui email
 */
 const express = require('express')
 const app = express()
 const PORT = process.env.PORT || 3000

//-- start connect angular 
const domain = 'http://localhost:4200'
// const domain = 'https://fe-angular-mean.vercel.app' //or *

// cho phép domain sử dụng api
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', domain);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
//-- end 
 
 //-- cookie-parser
 const cookieParser = require('cookie-parser')
 app.use(cookieParser())
 
 //-- Sử dụng body-Parser
 const bodyParser = require('body-parser')
 // parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
 app.use(bodyParser.json())

 //-- cài đặt đường dẫn tĩnh để sử dụng đường dẫn các file: css, js, image, ... 
 app.use(express.static(__dirname + '/public'));
 
 //-- Gọi ejs
 app.set('view engine', 'ejs');
 
 //-- Gọi database
 require('./core/database');
 
 //-- Gọi qua controls controllers
 app.use('/', require('./core/control'));
 
 app.get('/', (req, res) => res.send('Vunh Back-End!'))
 
 app.listen(process.env.PORT || 3000)
 // app.listen(port, () => console.log(`Example app listening on port ${port}!`))