var db = require('../config/connection')
var express = require('express')
var bcrypt = require('bcrypt')
const collection = require('../config/collections')


module.exports = {
  signup: (signupdata) => {
    return new Promise(async (resolve, reject) => {
      //const saltrounds = 10;
      //var strpassword=signupdata.password.toString()
      //signupdata.password = await bcrypt.hash(signupdata.password.toString(), saltrounds)
      // let checkEmail=db.get().collection(collection.user_collection).find({email:signupdata.email}).toArray()
      //  db.collection.find({"status": {$eq: "active"}})
       //console.log('hope:-',checkEmail)
          db.get().collection(collection.user_collection).insertOne(signupdata).then((data) => {
            if(data)
            {
              console.log(signupdata); 
              resolve(data)
            }
            
          })
    })
  },

  Login:(logindata)=> {
    return new Promise(async (resolve, reject) => {
      var loginuser = await db.get().collection(collection.user_collection).findOne({ email: logindata.email })
      
      if (loginuser) {
        db.get().collection(collection.user_collection).findOne({ password: logindata.password }).then((data) => {



          if (data) {
            db.get().collection(collection.user_collection).findOne({ email: logindata.email }).then((data) => {
              if (!data.blocked) {
                console.log('got it');

                let err = false
                resolve({err,data})
              }
              else 
              {
                console.log('block is false');

                let err = true
                resolve(err)

              }
            })

          }
          else {
            let err = true
            console.log('incorrect password')
            resolve(err)

          }

        })
      }
      else {
        console.log(' user not found')
        let err = true
        resolve(err)//doubt
      }


    })


  },

  // Login:(logindata)=>{
  //   console.log('hello',logindata);
  // }




  // /AddtoCart:(pid,userId)=>{
  //   return new Promise((resolve,reject)=>{
  //     db.get().collection(collections.product_collection).findOne({_id:ObjectId(pid)}).then((data)=>{
  //         if(data)
  //         {
  //           db.get().collection(collections.cart_collection).insertOne({
  //             ownerId:userId,
  //             proudutId:pid,
  //             title:data.title

  //           })
  //         }
  //     })
      
  //   })


  // }

}

