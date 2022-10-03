const mongoose= require('mongoose');
const  personalInfo= mongoose.Schema({
Email_ID:{type:String, require:true,  unique: true },
SAP_ID:{type:String },
Name:{type:String, require:true},
Contact:{type:String},
Rax:{type:String},
Post:{type:String},
Cadre:{type:String},
About:{type:String},
Address:{type:String},
Hobbies:{type:String},
Instragram:{type:String},
LinkedIn:{type:String},
Edit:{type:Boolean}

});

const Info= new mongoose.model("personalInfo", personalInfo);
module.exports=Info;
