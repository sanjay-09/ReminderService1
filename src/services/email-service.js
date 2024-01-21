const sender=require("../config/emailConfig");
const { NotificationRepository}=require("../repository/index")
const sendBasicEmail=(from,to,mailSubject,mailBody)=>{
    sender.sendMail({
        from:from,
        to:to,
        subject:mailSubject,
        text:mailBody
    })
}
const fetchingPendingEmails=async()=>{
    try{
        const NotificationRepositoryObject=new NotificationRepository();
   const response=await NotificationRepositoryObject.get({status:"pending"});
   return response;
    }
    catch(err){
        throw err;
    }

}
const create=async(data)=>{
    try{
        console.log(data);
        const NotificationRepositoryObject=new NotificationRepository();
        const response=await NotificationRepositoryObject.create(data);
        return response;

    }
    catch(err){
        console.log(err);
        throw err;
    }
}
const update=async(flightId,data)=>{
    try{
        const NotificationRepositoryObject=new NotificationRepository();
        await NotificationRepositoryObject.update(flightId,data);
        return true;

    }
    catch(err){

    }
}
module.exports={
    sendBasicEmail,
    fetchingPendingEmails,
    create,
    update
}