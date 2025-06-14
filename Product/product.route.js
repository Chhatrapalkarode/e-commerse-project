const express=require('express');
const productRoute=express.Router();
let Product=require('./product.module');
const multer=require('multer');
// save product 
productRoute.route('/saveproduct').post((req,res)=>{
    let product=new Product(req.body);
    console.log(product);
    product.save().then(product=>{
        res.send("product is added successfully ");
        res.end();

    }).catch((err)=>{
        res.send(err);
        res.end();

    });
});
// get product all
productRoute.route('/showproduct').get(function(req,res){
    Product.find()
    .then(product=>{
        console.log(product)
        res.send(product);
       
        res.end();

    }).catch(err=>{
        res.status(400).send("data not found something went wrong ");
    });
});
// get product all 
productRoute.route('/showproductstatus/:pid').get(function(req,res){
    Product.findOne({"pid":req.params.pid})
    .then(product=>{
        console.log(product);
        res.send(product);
        res.end();
    }).catch(err=>{
        res.status(400).send("data not found something went wrong ");
    });
});
// get product count for id 
productRoute.route('/getmaxpid').get(function(req,res){
    Product.find().then(product=>{
        console.log(product);
        res.send(product);
        res.end();

    }).catch(err=>{
        res.status(400).send("data not found something went to wrong ");
    });
});
// save product image 
const stv=multer.diskStorage({destination:(req,file,cb)=>{
    cb(null,"C:/Users/Sir/Desktop/e-commerce-project/backend/server/Product/producrimage")//path name  

 
},
filename:(req,file,cb)=>{
    cb(null,file.originalname)
},
})
const uploadv=multer({storage:stv}) ;
productRoute.post("/saveproductimage",uploadv.single("file"),(req,res)=>{
    res.send("upload success");
    res.end();
});
// get product image 
productRoute.route('/getproductimage/:picname').get((req,res)=>{
    res.sendFile("C:/Users/Sir/Desktop/e-commerce-project/backend/server/Product/producrimage/"+req.params.picname)//path name 
}); 
// get product by vendor 
productRoute.route('/showproductvender/:vid').get(function(req,res){
    Product.find({"vid":req.params.vid})
    .then(product=>{
        res.send(product);
        res.end()
    }).catch(err=>{
        res.status(400).send("data not found something went wrong ");
    });
});
// get product by category 
productRoute.route('/showproductbycatgid/:pcatgid').get(function(req,res){
    Product.find({"pcatgid":req.params.pcatgid})
    .then(product=>{
        res.send(product);
        res.end()
    }).catch(err=>{
        res.send(err)
    });
});
// update status 
productRoute.route('/updateproductstatus/:pid/:status').put((req,res)=>{
    Product.updateOne({"pid":req.params.pid},{"status":req.params.status}).then(state=>{
        res.send("product status update succcessfully");
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
   
});
module.exports=productRoute;