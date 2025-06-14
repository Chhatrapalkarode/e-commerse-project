const express=require('express');    // ''
const billRoute=express.Router();
let Bill=require('./bill.model');
// save bill
billRoute.route('/billsave').post((req,res)=>{
    let bill=new Bill(req.body);
    bill.save().then(bill=>{
        res.send({'bill':'bill added successfully'});
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

//change start

//Update bill Status if Sucessfully Paid
billRoute.route('/billstatusupdate/:billid').put((req,res)=>{
    Bill.updateOne({"billid":req.params.billid},{"status":"sucess"}).then(bill=>{
        res.send({'bill':'bill update successfully'});
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});


//show all bill  by customer id 
billRoute.route('/billshow/:cid').get((req,res)=>{
    Bill.find({$and:[{"cid":req.params.cid},{"status":"success"}]}).then(bill=>{
        res.send(bill);
        res.end();
    }).catch(err=>{
        res.send(err);
        res.end();
   })
});

// change end 

// //show all bill  by customer id 
// billRoute.route('/billshow/:cid').get((req,res)=>{
//     Bill.find({"cid":req.params.cid}).then(bill=>{
//         res.send(bill);
//         res.end();
//     }).catch(err=>{
//         res.send(err);
//         res.end();
//     })
// });
// bill show by bill id
billRoute.route('/billshowbillids/:cid').get((req,res)=>{
    Bill.distinct("billid",{"cid":req.params.cid}).then((bill)=>{
        res.send(bill)
        res.end()
    }).catch(err=>{
        res.send(err);
        res.end();
    })
});
// get id of last entered bill to generate  id for next bill
billRoute.route('/getbillid').get((req,res)=>{
    Bill.find().sort({"billid":-1}).limit(1).then(bill=>{
        res.send(bill)
        console.log(bill);
        res.end()
    }).catch(err=>{
        res.send(err);
        res.end();
    })
})
// get bill details by bill id 
billRoute.route('/showbillbyid/:billid').get((req,res)=>{
    Bill.find({"billid":req.params.billid}).then(bill=>{
        res.send(bill)
        res.end()
    }).catch(err=>{
        res.send(err);
        res.end();
    })
    });
    // show all bill
    billRoute.route('/billshow').get((req,res)=>{
    Bill.find().then((bill)=>{
        res.send(bill)
        res.end()
    }).catch(err=>{
        res.send(err);
        res.end();
    })
    });
    module.exports=billRoute;  

    
