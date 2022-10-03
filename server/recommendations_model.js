const mongoose= require('mongoose');
const  recommendations= mongoose.Schema({
Referee_Name:{type:String, require:true, },
Referee_Company:{type:String},
Referee_JobTitle:{type:String},
Referal_Date:{type:String},
Referal_Text:{type:String}


});

const recommends= new mongoose.model("recommendation", recommendations);
module.exports=recommends;
