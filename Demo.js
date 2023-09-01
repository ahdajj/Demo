const express = require('express');
const mongoose = require('mongoose');
const Art = require('./models/Art');



const dburi = 'mongodb+srv://ahd:JnZoTn5lLZpOSWNa@cluster0.eh9taen.mongodb.net/demo?retryWrites=true&w=majority'
mongoose.connect(dburi)
.then((result)=> app.listen(3000))  
.catch((err)=> console.log(err));

const app = express();


app.set('view engine','ejs');  

app.use(express.static('public')) 

app.use(express.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    res.redirect('/home')
})

app.get('/new/article' , (req,res)=>{
    res.render('New')
})

app.get('/home',(req,res)=>{
    Art.find()
    .sort({created_at : -1})
    .then(data =>{
        res.render('index',{post:data})
    })
    .catch(err =>{
        console.log(err)
    })
})


app.get('/article/:id' , (req,res)=>{
    const id =req.params.id;
    Art.findById(id)
    .then (result =>{
        res.render('details',{art:result })
    })
    .catch(err => {
        console.log(err)
    })
})
app.get('/edit/article/:id', (req,res)=>{
    const id=req.params.id
    Art.findById(id)
    .then(data =>{
        res.render('edit',{art:data})
    })
})
app.post('/new/article' ,(req,res)=>{
    const Nart = new Art({
        title:req.body.title,
        text:req.body.txt
    })
    Nart.save()
    .then(()=>{
        res.render('New')
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.post("/edit/article/:id" ,(req,res)=>{
    const id = req.params.id
 
    Art.findByIdAndUpdate(id,{title:req.body.title, text:req.body.txt})
    .then(()=>{
        res.redirect('/home')
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.delete('/article/:id', (req,res)=>{
    const id = req.params.id;
    Art.findByIdAndDelete(id)
     .then(result=>{                  
        res.json({redirect:'/home'})
     })
     .catch(err => {
        console.log(err)
     })
})
