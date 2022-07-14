const express=require('express')
const mongoose=require('mongoose')
const authRoutes=require('./routes/authRoutes')

const app=express();

// middle-ware 
app.use(express.static('public'))
app.use(express.json())

// view engine
app.set('view engine','ejs')

// database
const dbURL='mongodb+srv://jacksonmintu:G9iPBBu5Dt0pIqzz@cluster0.k0qi4.mongodb.net/Auth_Node?retryWrites=true&w=majority';

mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then((result)=>{
  app.listen(3000);
}).catch((err)=>console.log(err))


// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)


// cookies
app.get('/set-cookies',(req,res)=>{
  res.setHeader('Set-Cookie','newUser=true')
  res.send('you got the cookies')
})

// read cookies

