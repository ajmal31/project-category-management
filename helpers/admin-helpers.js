const { db_name, admin_collection } = require("../config/collections");
const collections = require("../config/collections");
const db =require('../config/connection')
const express=require('express');
const { ObjectID, ObjectId } = require("bson");



module.exports={
    adminlogin:(adminlogindata)=>{

       return new Promise(async(resolve,reject)=>{

        console.log(adminlogindata);
        var adminResult={}

        var admin = await db.get().collection(collections.admin_collection).findOne({username:adminlogindata.username})
        if(admin)
        { 
           await db.get().collection(collections.admin_collection).findOne({password:adminlogindata.password}).then((data)=>{

                if(data)
                {
                    adminResult.status=true
                    resolve(adminResult)
                    console.log('admin login success fully');
    
                }
                else
                {
                    adminResult.status=false
                    console.log('incorrect password');
                    resolve(adminResult)
                }

              
            })
        }
        else
        {
            adminResult.status=false
            console.log('admin not found');
            resolve(adminResult)
        }
       })


    },

    addProduct:(productData,images)=>{
        return new Promise(async(resolve,reject)=>{
            
            
        await db.get().collection(collections.product_collection).insertOne(productData).then((data,err)=>{
            if(  data)
            {
                 
                 db.get().collection(collections.product_collection).updateOne({title:productData.title},{$set:{filename:images}}).then((data)=>{
                    if(data)
                    {
                        console.log('add and update successfully');
                    }
                    else
                    {
                        console.log('only adding');
                    }
                }) 
                
            }
            else
            {
              console.log('data not added',err);
            }
        })

        })

        
    },
    getAllproducts:()=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collections.product_collection).find().toArray().then((data)=>{
                resolve(data)
            })
        })

    },
    deleteProducts:(productId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.product_collection).deleteOne({_id:ObjectId(productId)}).then((data)=>{
                resolve(data)
            })

        })
       
        
    },
    getOneproduct:(productId)=>{
        return new Promise (async(resolve,reject)=>{
           await db.get().collection(collections.product_collection).findOne({_id:ObjectId(productId)}).then((data)=>{
                resolve(data)
            })
        })
    },
    updateProducts:(editData,editImage,productId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.product_collection).updateOne({_id:ObjectId(productId)},{$set: {
                title:editData.title,
                description:editData.description,
                quantity:editData.quantity,
                price:editData.price,
                filename:editImage
               }}).then((data)=>{
                if(data)
                {   resolve()
                    console.log('edited successfully');
                }
               })

        })
    
       
    },
    addCategories:(data)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.categories_collection).insertOne({name:data.name,description:data.description}).then((result)=>{
                resolve(result)
            })
        })
    },
    getOnecategory:(pid)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.categories_collection).findOne({_id:ObjectId(pid)}).then((data)=>{
                resolve(data)
               })

        })
       
    },
    getAllcategoreis:()=>{
        return new Promise((resolve,reject)=>{
         db.get().collection(collections.categories_collection).find().toArray().then((data)=>{
                if(data)
                {
                    console.log('found categories !successfull');
                    resolve(data)
                }
                else
                {
                    console.log('not found categoreis');
                }
            })

        })
        
    },
    editedData:(editedata,pid)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.categories_collection).updateOne({_id:ObjectId(pid)},{$set:{
                name:editedata.name,
                description:editedata.description
            }}).then((data)=>{
                resolve(data)
            })

        })
        
    },
    deleteCategory:(pid)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.categories_collection).deleteOne({_id:ObjectId(pid)}).then((data)=>{
                resolve(data)

            })

        })
       
    },
    getAllusers:()=>{
        return new Promise((resolve,reject)=>[
            db.get().collection(collections.user_collection).find().toArray().then((data)=>{
                resolve(data)
            })
        ])
    },
    blockUser:(pid)=>{
        return new Promise ((resolve,reject)=>{
            db.get().collection(collections.user_collection).updateOne({_id:ObjectId(pid)},{$set:{blocked:true}}).then((data)=>{
                if(data)
                {
                    resolve(data)
                }
            })

        })
        
    },
    unblockUser:(pid)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.user_collection).updateOne({_id:ObjectId(pid)},{$set:{blocked:false}}).then((data)=>{
                if(data)
                {
                    resolve(data)
                }
            })
        
        })
    }


}