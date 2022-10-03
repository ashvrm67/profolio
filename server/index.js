const mongoose= require('mongoose');
//const  bcrypt= require('bcrypt');
const express= require('express');
const cors= require('cors');
const PersonalInfo=require('./personalInfo_model');
const Experience=require('./jobExperience_model');
const Recommends=require('./recommendations_model');
const Login=require('./login_model');
const jwt=require("jsonwebtoken");
//const Consumers= require('./model_consumer');

const app= express();
const PORT=8080;
const JWT_SECRET_KEY="jwt@2022" ; //anything can be set
app.use(cors({credentials:true, origin:'http://localhost:3000'}));  //for cookies
app.use(express.json());

mongoose.connect('mongodb+srv://ashvrm67:openmongodb2022@cluster0.wdwitjx.mongodb.net/portfolio?retryWrites=true&w=majority')
.then(()=>console.log("connection OK") )
.catch((e)=>console.log("error in connection"));

app.listen(PORT,()=>{

    console.log(`server listing at ${PORT}`);
    
    })

app.get("/Experience", async(req, res)=>{

    console.log("enter in experience tab");
    const result= await Experience.find();
   if(result)
   {console.log(result);
   return res.status(200).json(result)
   }
   else
   return res.json("nothing found");



})
app.get("/Recommendations", async(req, res)=>{
    const result= await Recommends.find();
    if(result)
    {console.log(result);
    return res.status(200).json(result)
    }
    else
    return res.json("nothing found");

    
})
app.get("/Contact", async(req, res)=>{

    const result= await PersoanlInfo.find();
    if(result)
    {console.log(result);
    return res.status(200).json(result)
    }
    else
    return res.json("nothing found");
 
    
})

app.get("/users", async(req, res)=>
{
    console.log("here");
const result= await Login.find({ IsAdmin:false } );
console.log(result);
if(result)
    {console.log(result);
    return res.status(200).json(result)
    }
    else
    {
    return res.json("nothing found");
    }

});
app.get("/About", async(req, res)=>
{

    console.log("enter here");
    const result= await PersonalInfo.find();
    console.log(result);
    if(result)
    {console.log(result);
    return res.status(200).json(result)
    }
    else
    {
    return res.json("nothing found");
    }

    
})


app.get("/verifyToken", async(req, res)=>
{
    const HeaderKey="auth";
const token= req.header(HeaderKey);


try
{
    const verified= await jwt.verify(token, JWT_SECRET_KEY);
if(verified)
{
    console.log(verified);
    res.send(verified);
}
else
{
    console.log("not verified");
}
}

catch{
    console.log("not valid user");
    res.send("not a valid user");


}

});


app.post("/login", async(req,res)=>
{

const getToken=(email)=>
{
    console.log("inside getToken")
    let data = {    //data for jwt 
        time: Date(),
        userId: email,      //email or unquire key    
    }

    const token_temp = jwt.sign(data, JWT_SECRET_KEY);  //encrption
    console.log(token_temp);
     return token_temp;

}

const validateToken=()=>  //validation of jwt token sent with header
{
  
    try {
        const token = req.header(tokenHeaderKey);
  
        const verified = jwt.verify(token, JWT_SECRET_KEY);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
}

console.log(req.body.user);
   
const result= await Login.find({$and:[{Email_ID:req.body.user},{Password:req.body.pass}]});
console.log(result);
if(result)
{

   const token= getToken(req.body.user);
   res.cookie('mytoken',token, 
   {path:"/"});
   
  // res.header('Access-Control-Allow-Credentials', true);
   
   res.send(result);
}



})