// const express = require("express");
// const cityRoute = express.Router();
// var City = require("./city.model");

// //save product categeory
// cityRoute.route("/save").post((req, res) => {
//   var city = new City(req.body);
//   city
//     .save()
//     .then((city) => {
//       res.send("Data Saved ");
//       res.end();
//     })
//     .catch((err) => {
//       res.send(err);
//       res.end();
//     });
// });
// //Show ALl product

// cityRoute.route("/show").get((req, res) => {
//   City.find({" status": 1 })
//     .then((city) => {
//       res.send(city);
//       res.end();
//     })
//     .catch((err) => {
//       res.send(err);
//       res.end();
//     });
// });
// //Search state
// cityRoute.route("/search/:ctid").get((req, res) => {
//   City.findOne({ ctid: req.params.ctid })
//     .then((city) => {
//       res.send(city);
//       res.end();
//     })
//     .catch((err) => {
//       res.send(err);
//       res.end();
//     });
// });
// //update State
// cityRoute.route("/update").put((req, res) => {
//   City.updateOne(
//     { ctid: req.body.ctid },
//     { ctid: req.body.ctid, ctname: req.body.ctname, status: req.body.status }
//   )
//     .then((city) => {
//       res.send("Data updated");
//       res.end();
//     })
//     .catch((err) => {
//       res.send(err);
//       res.end();
//     });
// });
// //delete state :-- modify state staus active to inactive
// cityRoute.route("/delete/:ctid").delete((req, res) => {
//   City.updateOne({ ctid: req.params.ctid }, { status: 0 })
//     .then((city) => {
//       res.send("Data Deleted");
//       res.end();
//     })
//     .catch((err) => {
//       res.send(err);
//       res.end();
//     });
// });

// //show all city
// cityRoute.route("/showcitybystate/:stid").get((req, res) => {
//   City.find($and[({ status: 1 }, { stid: req.params.stid })]);
//   City.find({ status: 1 })
//     .then((city) => {
//       res.send(city);
//       res.end();
//     })
//     .catch((err) => {
//       res.send(err);
//       res.end();
//     });
// });
// //show all
// cityRoute.route("/getall").get((req, res) => {
//   City.find({ status: 1 })
//     .then((city) => {
//       res.send(city);
//       res.end();
//     })
//     .catch((err) => {
//       res.send(err);
//       res.end();
//     });
// });
// //search state by name to avoid duplicate entry
// cityRoute.route("/searchbyname/:ctname").get((req, res) => {
//   City.findOne({ ctname: req.params.ctname })
//     .then((city) => {
//       res.send(city);
//       res.end();
//     })
//     .catch((err) => {
//       res.send(err);
//       res.end();
//     });
// });

// module.exports = cityRoute;




const express=require('express')
const cityRoute=express.Router()
const City=require('./city.model')


//save city
cityRoute.route("/save").post((req,res)=>{
    let city=new City(req.body)
    city.save().then(data=>{
        res.send("City Information saved")
    }).catch(err=>{
        res.send(err)
    })
})

//search city
cityRoute.route("/search/:ctid").get((req,res)=>{
    City.findOne({"ctid":req.params.ctid}).then(city=>{
        res.send(city)
    }).catch(err=>{
        res.send(err)
    })
})

//update city
cityRoute.route('/update').put((req,res)=>{
    City.updateOne({"ctid":req.body.ctid},{"ctid":req.body.ctid,"ctname":req.body.ctname,"stid":req.body.stid,"status":req.body.status}).then(data=>{
        res.send("Updated successfully")
    }).catch(err=>{
        res.send(err)
    })
})

//delete enable or disable
cityRoute.route('/delete/:ctid').delete((req,res)=>{
    City.updateOne({"ctid":req.params.ctid},{"status":0}).then(city=>{
        res.send("City disabled successfully")
    }).catch(err=>{
        res.send(err)
    })
})

//show all
cityRoute.route("/show").get((req,res)=>{
    City.find({"status":1}).then(cityarr=>{
        res.send(cityarr)
    }).catch(err=>{
        res.send(err)
    })
})

//show all city by state id   
cityRoute.route("/showallcitybystate/:stid").get((req,res)=>{
    City.find({$and:[{"status":1},{"stid":req.params.stid}]}).then(cityarr=>{
        res.send(cityarr)
    }).catch(err=>{
        res.send(err)
    })
})

//show all city irrespective of status
cityRoute.route('/getall').get((req,res)=>{
    City.find().then(cityarr=>{
        res.send(cityarr)
    }).catch(err=>{
        res.send(err)
    })
})

//search city by name to avoid duplicate entry
cityRoute.route('/searchbyname/:ctname').get((req,res)=>{
    City.findOne({"ctname":req.params.ctname}).then(city=>{
        res.send(city)
    }).catch(err=>{
        res.send(err)
    })
})

module.exports=cityRoute;