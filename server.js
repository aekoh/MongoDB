// require express package
var express=require('express');
var mongoose = require('mongoose');

// variable for our port
var port=process.env.PORT || 3000

// app varibale
var app=express()

// routes variable
//var routes=require('./routes')

//
app.use(express.static('public'))

//
app.use(express.urlencoded({extended: true}))

//
app.use(express.json())

//
//app.use(routes)

//
var MONGODB_URI=process.env.MONGODB_URI || 'mongodb://localhost/mongodbhw' 

app.listen(port, function(){
    console.log('app listening on port' + port)
})


