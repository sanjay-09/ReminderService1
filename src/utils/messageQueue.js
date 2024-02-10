const amqplib=require("amqplib");
const { MESSAGE_BROKER_URL, EXCHANGE_NAME, REMINDER_BINDING_KEY } = require("../config/serverConfig");

const ReminderService=require("../services/reminder-service");
const reminderServiceObj=new ReminderService();


const createChannel=async()=>{
    try{
        
        const connection=await amqplib.connect(MESSAGE_BROKER_URL);
        const channel=await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME,'direct',false);
        const applicationQueue=await channel.assertQueue("QUEUE_NAME");

        await channel.bindQueue(applicationQueue.queue,EXCHANGE_NAME,REMINDER_BINDING_KEY);
        
      
        return channel;


    }
    catch(err){
        throw err;
    }
}

const subscriber=async(channel,REMINDER_BINDING_KEY)=>{
    try{
        console.log("subscriber");
        const applicationQueue=await channel.assertQueue("QUEUE_NAME");
        await channel.bindQueue(applicationQueue.queue,EXCHANGE_NAME,REMINDER_BINDING_KEY);
        channel.consume(applicationQueue.queue,async(msg)=>{
        console.log("received data");
        const data=JSON.parse(msg.content.toString());
        console.log(data);
      
        reminderServiceObj.BookingConfirmation(data)
      
        reminderServiceObj.NotificationUpdate(data);
           channel.ack(msg);
        })


    

    }
    catch(err){
        throw err;
    }
}
module.exports={
    createChannel,
    subscriber,
   
}