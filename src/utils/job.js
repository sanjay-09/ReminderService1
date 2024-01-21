const cron=require("node-cron");
const sender=require("../config/emailConfig");
const emailService=require("../services/email-service");

const setUpJob=()=>{
    cron.schedule("*/1 * * * *",async()=>{
        const response=await emailService.fetchingPendingEmails();
        response.forEach((email)=>{
            sender.sendMail({
                to:email.receipentEmail,
                subject:email.subject,
                text:email.content

            },async(err,data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("success");
                    await emailService.update(email.id,{status:"success"})
                }
            }

            )
        })
        
        
    })
}
module.exports=setUpJob;

