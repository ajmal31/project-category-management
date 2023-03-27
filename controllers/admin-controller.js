const adminHelpers=require('../helpers/admin-helpers')
const multer=require('../helpers/multer')

module.exports={
    getIndex:(req,res)=>{
        let logged=req.session.logged
        req.session.logged=false
        if(logged){
          res.render('admin/index',{logged})
        }
        else
        {
          res.redirect('/admin/logout')
        }
        

    },
    getLogin:(req,res)=>{

      let logged=req.session.logged
      req.session.logged=true
        res.render('admin/login',{logged})
      
      
    },
    getLogout:(req,res)=>{
        res.redirect('/admin/login')
        
    },
    getAddproduct:(req,res)=>{
        adminHelpers.getAllcategoreis().then((result)=>{
          console.log('resulteeeee:-',result);
          res.render('admin/addproduct',{result})
        })
        
    },
    postLogindata:(req,res)=>{

        adminHelpers.adminlogin(req.body).then((response)=>{
          if(response.status)
          {
            req.session.logged=true
            res.redirect('/admin')
          }
          else
          {
              req.session.logged=false
              res.redirect('/admin/login')
          }
      
        })
      
        
      },
      postAddproduct:(req,res)=>{
        console.log(req.body);
        let images=req.files.map( a=> a.filename)
        console.log('images:-',images);
        adminHelpers.addProduct(req.body,images)
        res.redirect('/admin/add_product')
      
      },
      getProductlist:(req,res)=>{
        adminHelpers.getAllproducts().then((response)=>{
          console.log("response hehehe :-",response);
          res.render('admin/products',{response})
        })
        
       },
    getEditproducts:(req,res)=>{
        adminHelpers.getOneproduct(req.params.id).then((response)=>{
      
          adminHelpers.getAllcategoreis().then((cat)=>{
      
      
      
            console.log('getOneproduct:-',response);
      
          res.render('admin/editProducts',{response,cat})
      
          })
          
      
        })
      
      },
      getDeleteproducts:(req,res)=>{
        console.log("get method",req.params.id);
        adminHelpers.deleteProducts(req.params.id)
        
        res.redirect('/admin/products_list')
      
      },
      postUpdateproducts:(req,res)=>{
        console.log(req.body);
        console.log(req.files);
        console.log(req.params.id);
        let images=req.files.map(a=> a.filename)
        let pid=req.params.id
     
        adminHelpers.updateProducts(req.body,images,pid).then(()=>{
         console.log('sucessfull');
     
         res.redirect('/admin')
        })
        
     },
     getCategories:(req,res)=>{
        adminHelpers.getAllcategoreis().then((response)=>{
          if(response)
          {
            console.log(response);
            res.render('admin/categories',{response})
          }
          else
          {
            console.log('not found products');
          }
        })
        
      },
      postCategory:(req,res)=>{
        adminHelpers.addCategories(req.body).then((response)=>{
          console.log('Category Added successfully');
          res.redirect('/admin/categories')
        })
      },
    getEditcategories:(req,res)=>{

        console.log('router succes');
       console.log(req.params.id);
        adminHelpers.getOnecategory(req.params.id).then((response)=>{
          if(response)
          {
            console.log('editing document find');
            res.render('admin/editCategories',{response})
          }
      
           
          
        })
      },
      postEditedData:(req,res)=>{
        let pid=req.params.id
        adminHelpers.editedData(req.body,pid).then((response)=>{
          console.log('edited successfull');
          res.redirect('/admin/categories')
        })
      },
      getDeletecategory:(req,res)=>{
        let pid=req.params.id
        
        adminHelpers.deleteCategory(pid).then((response)=>{
          if(response)
          {
            console.log('category successfully deleted');
            res.redirect('/admin/categories')
          }
        })
      },
      getUsers:(req,res)=>{
        console.log('users router');
        adminHelpers.getAllusers().then((response)=>{
          if(response)
          {
            res.render('admin/usersList',{response})
          }
         
        })
        
      },
      getBlockuser:(req,res)=>{
        let pid=req.params.id
        adminHelpers.blockUser(pid).then((data)=>{
          if(data)
          {
            console.log('user blocked success');
            res.redirect('/admin/users')
          }
        })
      },
      getUnblockuser:(req,res)=>{
        let pid=req.params.id
        adminHelpers.unblockUser(pid).then((data)=>{
          if(data)
          {
            console.log('user unblocked !success');
            res.redirect('/admin/users')
          }
        })
      },
      
      













      

    
}