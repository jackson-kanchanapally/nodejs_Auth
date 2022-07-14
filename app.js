const express=require('express')
const mongoose=require('mongoose')
const authRoutes=require('./routes/authRoutes')
const cookieParser=require('cookie-parser')

const app=express();

// middle-ware 
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

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
  // res.setHeader('Set-Cookie','newUser=true')
  res.cookie('newUser',false)
  res.cookie('isEmployee',true,{maxAge:1000*60*60*24,httpOnly:true}) //maxAge=cookie's expiry time
  res.send('You got the cookies')
})

// read cookies
app.get('/read-cookies',(req,res)=>{
  const cookies=req.cookies;
  console.log(cookies)

  res.json(cookies)
})
