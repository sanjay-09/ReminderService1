const cron=require("node-cron");
const sender=require("../config/emailConfig");
const reminderService=require("../services/reminder-service")
const reminderServiceObj=new reminderService();

const setUpJob=()=>{
    cron.schedule("*/1 * * * *",async()=>{
        console.log("h");
        const response=await reminderServiceObj.fetchPendingEmail();
        response.forEach((email)=>{
        
            const time=new Date();
           console.log(email.departureTime.getDate()-1==time.getDate());
            if(email.departureTime.getDate()-1==time.getDate()){
                
            sender.sendMail({
                to:email.Email,
                subject:"Checking OPEN FOR YOUR FLIGHT",
                text:`Checking OPEN FOR YOUR FLIGHT`

            },async(err,data)=>{
                if(err){
                    console.log(err);
                }
                else{
                   
                   
                    if(email.Reminder==2){
                       
                        await reminderServiceObj.update(email.id,"update status");

                    }
                    else{
                        await reminderServiceObj.update(email.id,"update reminder");
                    }
                }
            }

            )
        }
    })
        
        
    })
}
module.exports=setUpJob;

