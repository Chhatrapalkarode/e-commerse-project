// var mongoose=require("mongoose");
// var Schema=mongoose.Schema;
// var productcatg=new Schema({
//     pcatagid:{type:Number},
//     pcatgName:{type:String},
// },{collection:"productCatg"});
// module.exports=mongoose.model("productcatg",productcatg);
var mongoose=require("mongoose");
var Schema =mongoose.Schema;
var ProductCatg=new Schema({
    PCatgId:{type:Number},
    PCatgName:{type:String},
},{collection:"ProductCatg"});
module.exports=mongoose.model("ProductCatg",ProductCatg);