const userHelpers = require("../helpers/user-helpers");
const adminHelpers=require('../helpers/admin-helpers');
const { ObjectId } = require("mongodb");

module.exports = {

    getIndex: (req, res, next) => {
        req.session.user = true

        res.redirect('/home');
    },

    getSignup: (req, res) => {

        res.render('signup')
    },

    getLogin: (req, res) => {

        let loginerr = req.session.loginerr
        // req.session.loginerr = false

        res.render('login', { loginerr })
        req.session.loginerr = false
    },

    getHome: (req, res) => {

        if (req.session.userdata) {
            console.log("help",req.session.userdata);
            let userdata=req.session.userdata
            adminHelpers.getAllproducts().then((data) => {
                if (data) {
                    console.log('homedata:-', data);
                    res.render('home', { data ,userdata})

                }

            })

        }
        else {

            res.redirect('/login')
        }
    },

    postSignup: (req, res) => {

        userHelpers.signup(req.body).then((response) => {
            if(response)
            {
                res.redirect('/login')
                console.log('signup data:-', response);
            }
            // else
            // {   console.log('This email already existed');
            //     res.redirect('/signup')
                
            // }

           

        })


    },

    postLogin: (req, res) => {

        console.log(req.body);
        userHelpers.Login(req.body).then(({err,data}) => {
            if (!err) {
                console.log("owwch:-",data);
                console.log("owwch2:-",err);
                req.session.userdata=data
                // console.log('help',req.session.userdata);
                // req.session.user = true
                res.redirect('/home')


            }
            else {

                req.session.loginerr = true
                res.redirect('/login')




            }
        })


    },
    getLogout:(req,res)=>{
       res.redirect('/login')
    },
    getProductdetails:(req,res)=>{

       
       let pid=ObjectId(req.params.id) 
        userdata=req.session.userdata
         console.log('userID:-',req.session.userdata._id);
         adminHelpers.getOneproduct(pid)
        .then((result)=>{
            console.log('result:-',result);
            res.render('productDetails',{userdata,result})
        })
       
    },
    getOtplogin:(req,res)=>{
       let data=req.session.logged
        res.render('phNumber',{data})
    },
     enterOtp:(req,res)=>{
        let data=req.session.logged
        res.render('otp',{data})

     },
     getAddtocart:(req,res)=>{
       
        let pid=req.params.id
        console.log('product_id:-',pid);
        let userId=req.session.userdata._id
        console.log('user_id:-',userId);
        // userHelpers.AddtoCart(pid,userId).then((data)=>{

        // }) 
     },
     getCart:(req,res)=>{
        let userdata=req.session.userdata
        res.render('cart',{userdata})
     }
     
    
} 