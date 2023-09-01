const mongoose=require('mongoose')
const ar = require('momment')
const Schema =  mongoose.Schema

const artSchema = new Schema({
       title:{
        type:String,
        required:true,
        minlength:25
       },
       text:{
        type:String,
        required:true,
        minlength:100
       },
       created_at:{
        type:Date,
       // default : new Date.now ,
       // get:function(createAt){
         //   return  moment(createAt).format('MMMM Do YYYY, h:mm:ss a')
       //   }
       }
},{timestamps: true})
const Art = mongoose.model('Article',artSchema)
module.exports = Art