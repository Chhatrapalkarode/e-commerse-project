var mongoose=require('mongoose');
const Schema=mongoose.Schema;
var Product=new Schema({
    pid:{type:Number},
    pname:{type:String},
    pprice:{type:Number},
    oprice:{type:Number},
    ppicname:{type:String},
    pcatgid:{type:Number},
    vid:{type:String},
    status:{type:String}
},
{collection:'Product'}
);
module.exports=mongoose.model('product',Product);