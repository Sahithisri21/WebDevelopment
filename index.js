const { request } = require("express");
const express = require("express");
const app = express();
const port = 3000;
const request1 = require('request')
const path = require('path');

const {initializeApp , cert} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");   
                   

initializeApp({
    credential: cert(serviceAccount)
})
const db = getFirestore(); 

app.set('view engine','ejs');

app.use(express.static('public'));
app.get("/",(req,res)=>{
    res.render('home')
});


 app.get("/login",(req,res)=>{
    res.render('login')
 });

 app.get("/loginsubmit",(req,res)=>{
    const email = req.query.email;
    const password = req.query.pwd;

    db.collection('users')
    .where("email","==",email)
    .where("password","==",password)
    .get()
    .then((docs) =>{
        if(docs.size >0){
            res.sendFile("D:/project_web devlopment/views/source.html");
                
        }
        else{
            res.render('signup')
        }
    })

 });


 app.get("/signup",(req,res)=>{
     res.render('signup')
 });

 app.get("/signupsubmit",(req,res)=>{
    
    const firstname = req.query.fname;
    const lastname = req.query.lname;
    const email = req.query.email;
    const phone = req.query.phone;
    const password = req.query.pwd;

db.collection('users').add({
    name : firstname + " "+lastname,
    email : email,
    password : password,
}).then(() =>{
    res.send("registration successful")
})

});

app.listen(port ,() =>{
    console.log("example app running $(port)")
});
