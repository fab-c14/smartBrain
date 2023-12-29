const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const app = express();

app.use(bodyParser.json())
app.use(cors())
const database = {
    users:[
        {
            id:'123',
            name:'John',
            email:'john@gmail.com',
            password:'cookies',
            entries:0,
            joined: new Date()
        },
        {
            id:'124',
            name:'Sally',
            email:'sally@gmail.com',
            password:'bananas',
            entries:0,
            joined: new Date()
        },
    ],
    login:[
        {
            id:'987',
            has:'',
            email:'john@gmail.com'
        }
    ]
}

app.get('/',(req,res)=>{
    // res.send('this is working')
    res.send(database.users)
})

app.post('/signin',(req,res)=>{

    // load hash from your password db
    // bcrypt.compare("apples",hash,function(err,hash){
    //     // res = true
    // })

    // bcrypt.compare("veggies",hash,function(err,res){
    //     // res = false
    // })
    // first parse the data
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json('success')
    }else{
        res.status(400).json('error logging in')
    }
    // res.json('signing')
})

app.post('/register',(req,res)=>{
    const {email,name,password} = req.body
    // bcrypt.hash(password,null,null,function(err,hash){
    //     console.log(hash)
    // })
    database.users.push({
        id:'125',
        name:name,
        email:email,
      
        entries:0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id',(req,res)=>{
    const {id} = req.body;
    let found = false;
    database.users.forEach(user=>{
        if (user.id === id){
            found = true;
            return res.json(user)
        }
    })
    if (!found){
        res.status(400).json('not found ')
    }
})

app.get('/images',(req,res)=>{
    const {id} = req.body;
    let found = false;
    database.users.forEach(user=>{
        if (user.id === id){
            found = true;
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found){
        res.status(400).json('not found')
    }
})




app.listen(3000,()=>{
    console.log(`app is running on localhost:3000`)
})

/*
/ -> res = this is working
/signin -> post = success/fail
/register -> post = user
/profile/:userId -> GET = user
/image -> put --> user

*/