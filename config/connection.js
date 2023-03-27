var collection=require('../config/collections')
const MongoClient=require('mongodb').MongoClient
 const state ={
     db:null
 }

 module.exports.connect=function(done){
     const url ='mongodb://0.0.0.0:27017'
     


     MongoClient.connect(url,(err,data)=>{
         if(err) return  done(err)
         state.db=data.db(collection.db_name)
         done()
     })
 }

 module.exports.get=function(){
     return state.db
 }
//mongodb-conneting code
