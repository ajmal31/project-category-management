var express = require('express');
var router = express.Router();
var adminHelpers=require('../helpers/admin-helpers')
var db=require('../config/connection');
const { adminlogin, addProduct } = require('../helpers/admin-helpers');
var multer=require('../helpers/multer')
const controllers=require('../controllers/admin-controller');
const adminController = require('../controllers/admin-controller');
const { getBlockuser, getUnblockuser } = require('../controllers/admin-controller');



// /* GET admin listing. */

//GET ADMIN INDEX
router.get('/',controllers.getIndex)

//GET LOGIN 
router.get('/login',controllers.getLogin)

//GET LOGOUT
router.get('/logout',controllers.getLogout)
// GET ADD_PRODUCT
router.get('/add_product',controllers.getAddproduct)

//POST LOGIN DATA
router.post('/admin-loginData',controllers.postLogindata) 

//POST ADD_PRODUCT DATA
 router.post('/add_product',multer.uploads.array('images',4),controllers.postAddproduct)

//GET PRODUCT LIST
 router.get('/products_list',controllers.getProductlist)
 
//GET EDIT PRODUCTS
router.get('/editProducts/:id',controllers.getEditproducts)

//GET DELETE PRODUCTS
router.get('/delete_products/:id',adminController.getDeleteproducts)

//POST UPDATE PRODUCT
router.post('/updateProducts/:id',multer.uploads.array('images',4),adminController.postUpdateproducts)

//GET CATEGORIES
router.get('/categories',adminController.getCategories)

// POST CATEGORIES
router.post('/categories',adminController.postCategory)

//GET EDIT_CATEGORY
router.get('/editCategory/:id',adminController.getEditcategories)

//POST EDITED_CATEGORY_DATA
  router.post('/editedData/:id',adminController.postEditedData)

//GET DELETE CATEGORY
  router.get('/deleteCategory/:id',adminController.getDeletecategory)

//GET USERS
router.get('/users',adminController.getUsers)

//GET BLOCK USER
router.get('/blockUser/:id',adminController.getBlockuser)
// GET UNBLOCK USER
router.get('/unblockUser/:id',adminController.getUnblockuser)

module.exports = router;
