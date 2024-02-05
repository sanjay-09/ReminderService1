const express=require("express");

const {PORT, REMINDER_BINDING_KEY}=require("./config/serverConfig")
const reminderController=require("./Controllers/reminderController")
const bodyParser=require("body-parser");
const setUpJobs=require("./utils/job");
const {createChannel,subscriber}=require("./utils/messageQueue");
const app=express();

const setUpAndStartServer=async(req,res)=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))


    app.get("/",(req,res)=>{
        res.send("ok");
    })
    // app.post("/api/v1/reminder",reminderController.create);

    app.listen(PORT,async(req,res)=>{
        console.log(`server is listening on the PORT${PORT}`)
        setUpJobs();
      
        // const channel=await createChannel();
        
        // subscriber(channel,REMINDER_BINDING_KEY);
        
       
    })

}
setUpAndStartServer();

  