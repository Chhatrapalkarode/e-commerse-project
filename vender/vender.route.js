const express=require("express");
const VenderRoute=express.Router();
const bodyParser=require("body-parser");
const Vender=require('./vender.model');
var fs=require("fs");
const multer=require("multer");
// vender registration code 

VenderRoute.route("/register").post((req,res)=>{
    let vender=new Vender(req.body)
    vender.save().then((vender)=>{
        if(vender!=null){
            res.send("registration successfully");
    
        }
        else{
            res.send("registartion failed");
        }
    }).catch((err)=>{
        res.status(400).send("registration failed");
    });
})
 
// login
VenderRoute.route("/login").post((req,res)=>{
    var id=req.body.vuid;
    var pass=req.body.vupass;
    console.log("userid="+id+"password="+pass);
    Vender.findOne({$and:[{"VUserId":id},{"VUserPass":pass}]}).then(vender=>{
        console.log(vender)
        res.send(vender)
        res.end()
    })
   .catch((err)=>{
        res.send("some thing went wrong");
        res.end();
    })
})
// get image
VenderRoute.route('/getimage/:vpicname').get((req,res)=>{
    res.sendFile("C:/Users/Sir/Desktop/e-commerce-project/backend/server/vender/venderimage/"+req.params.vpicname)//path name 

})
// image save 
const st=multer.diskStorage({destination:(req,file,cb)=>{
    cb(null,'C:/Users/Sir/Desktop/e-commerce-project/backend/server/vender/venderimage')// image path name  
},
filename:(req,file,cb)=>{
    cb(null,file.originalname)
},
})
const upload=multer({storage:st});
VenderRoute.post('/savevenderimage',upload.single('file'),(req,res)=>{
    res.send("image save ")
})

// get vender for count 
VenderRoute.route("/getvendercount").get((req,res)=>{
    Vender.find().then(vender=>{
        res.send(vender);
        res.end();
    }).catch((err)=>{
        res.send("something went wrong ");
        res.end();
    })
})
// enable disable vender by admin 
VenderRoute.route('/vendermanage/:vid/:status').put((req,res)=>{
    Vender.updateOne({"Vid":req.params.vid},{"Status":req.params.status}).then(vender=>{
        res.send('vender status is updated successfully');
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});
  module.exports=VenderRoute; 

