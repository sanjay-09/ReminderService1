const express=require("express");
const app=express();
const {PORT}=require("./config/serverConfig")
const {sendBasicEmail}=require("./services/email-service");
const reminderController=require("./Controllers/reminderController")
const bodyParser=require("body-parser");
const setUpJobs=require("./utils/job");
const db=require("./models/index")
const setUpAndStartServer=async(req,res)=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))


    app.get("/",(req,res)=>{
        res.send("ok");
    })
    app.post("/api/v1/reminder",reminderController.create);

    app.listen(PORT,(req,res)=>{
        console.log(`server is listening on the PORT${PORT}`)
        setUpJobs();
        // db.sequelize.sync({alter:true});
       
    })

}
setUpAndStartServer();