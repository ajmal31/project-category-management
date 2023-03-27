const { Router, response } = require('express');
var express = require('express');
var router = express.Router();
var db=require('../config/connection');
const adminHelpers = require('../helpers/admin-helpers');
var userhelpers=require('../helpers/user-helpers')
const usercontroller=require('../controllers/user-controller');



//const twilio = require('twilio');
// const accountSid = 'AC894e4a0e0d9112bcc872e2f9a6d26634';
// const authToken = '38e73bd6d4beb46849cb3ed576c849b1';
// const client = new twilio(accountSid, authToken);




// const SSID = "VA1dafb98e762b3849ac62dbffa3e453de"
// const twilio = require('twilio');
// //const TWILIO_ACCOUNT_SID = "AC894e4a0e0d9112bcc872e2f9a6d26634"
// const TWILIO_AUTH_TOKEN = "38e73bd6d4beb46849cb3ed576c849b1"
// const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

//const bcrypt=require('bcrypt')

/* GET home page. */
router.get('/',usercontroller.getIndex)

//GET SIGHNUP
router.get('/signup',usercontroller.getSignup)

//GET LOGIN
router.get('/login',usercontroller.getLogin)

//GET HOME
router.get('/home', usercontroller.getHome)



//POST SIGNUP DATA
router.post('/signup-submit',usercontroller.postSignup)

//POST LOGIN DATA
router.post('/login-submit',usercontroller.postLogin)

//GET LOGOUT 
router.get('/logout',usercontroller.getLogout)

// router.get('/productDetails/:id',usercontroller.getProductdetails)
router.get('/productDetails/:id', usercontroller.getProductdetails)
  
//get otp login
router.get('/otpLogin',usercontroller.getOtplogin)  

router.get('/enterOtp',usercontroller.enterOtp)

router.get('/add_to_cart/:id',usercontroller.getAddtocart)

//get cart
router.get('/cart',usercontroller.getCart)



  

module.exports = router;
 