// install nodemailer  = npm install nodemailer

const express=require("express");
const customerRoute=express.Router();
const bodyparser=require("body-parser");
const Customer=require("./customer.model");
var fs=require("fs");
const multer=require('multer');
const nodemailer=require("nodemailer");
function sendGMail(mailto){
    console.log("mail:-"+mailto);
    res.status(200).json({response:"Mail sent"});
    const transporter=nodemailer.createTransport({
        service:"gmail",
        port:465,
        secure:true,
        auth:{
            user:"bsmernwala@gmail.com",
            pass:"necc umnw wnpi bmzy"
        },

    });
    const mailOption={
        from:"bsmernwala@gmail.com",
        to:mailto,
        subject:"Resgistration success",
        text:"dear customer your registration successfully done but it is in"

    };
    transporter.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log("error sending email:",error);
        }
        else{
            console.log("email send:",info.response);
        }
    });
}
// customer registartion code 
customerRoute.route("/register").post((req,res)=>{
    var customer=new Customer(req.body);
    customer.save().then((customer)=>{
        if(customer!=null){
            
                // sendGMail(req.body.CEmail);//
                res.send("registration successfully");
                res.end();
            
        }
        else{
            res.send("registration failed");
            res.end();
        }
    }).catch((err)=>{
        res.send(err)
        res.end();
    });
});
// login
customerRoute.route("/login").post((req,res)=>{
    var id=req.body.CUserId;
    var pass=req.body.CUserPass;
    Customer.findOne({$and:[{"CUserId":id},{"CUserPass":pass}]}).then((customer)=>{
        res.send(customer);
        res.end();
    }).catch(err=>{
        res.send("something went wrong ");
        res.end();
    })
});
// get image 
customerRoute.route('/getimage/:cpicname').get((req,res)=>{
    res.sendFile('C:/Users/Sir/Desktop/e-commerce-project/backend/server/customer/customerimage/'+req.params.cpicname)//path name
});
// image save 
const st=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'C:/Users/Sir/Desktop/e-commerce-project/backend/server/customer/customerimage/')//path name  
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
})
const upload=multer({storage:st});

    customerRoute.post('/savecustomerimage',upload.single('file'),(req,res)=>{
        res.json({})
    })
    // get customer for count 
    customerRoute.route("/getcustomercount").get((req,res)=>{
        Customer.find().then(customer=>{
            res.send(customer)
            res.end();
        }).catch(err=>{
            res.send("something went to wrong ");
            res.end();
        })
    })
// get customer details by id 
customerRoute.route("/getcustomerdetails/:cid").get((req,res)=>{
    var id=req.params.cid;
    Customer.findOne({"Cid":id}).then(customer=>{
        console.log(customer);
        res.send(customer);
        res.end();
    }).catch((err)=>{
        res.send("something went wrong ");
        res.end();

    })
})
// get customer List 
customerRoute.route("/getcustomerlist").get((req,res)=>{
    // var id=req.params.cid;
    Customer.find().then(customer=>{
        console.log(customer);
        res.send(customer)
        res.end();
    }).catch((err)=>{
        res.send("something went wrong ");
        res.end();

    })
});
// enable disable customer by admin
customerRoute.route('/customermanage/:cid/:status').put((req,res)=>{
    Customer.updateOne({"Cid":req.params.cid},{"Status":req.params.status}).then((customer)=>{
        console.log(customer);
        res.send("customer sataus update successfully");
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
   
});
module.exports=customerRoute;
