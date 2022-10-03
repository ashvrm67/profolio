const mongoose= require('mongoose');
const  job_Experience= mongoose.Schema({
Company:{type:String, require:true, },
Job_Title:{type:String},
Duration:{type:String},
Project:{type:String},
Salary:{type:String},


});

const experience= new mongoose.model("job_experience", job_Experience);
module.exports=experience;
