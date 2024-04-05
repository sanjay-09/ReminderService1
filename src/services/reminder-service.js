const reminderTimeRepositor=require("../repository/reminder-repository");
const sender=require("../config/emailConfig");
const axios=require("axios");
const {Flight_Search}=require("../config/serverConfig")

class ReminderService{
    constructor(){
        this.ReminderTimeRespository=new reminderTimeRepositor();
    }

    sendBasicMail(from,to,mailSubject,mailBody){
        try{
            sender.sendMail({
                from:from,
                to:to,
                subject:mailSubject,
                text:mailBody
            })

        }
        catch(err){
            throw err;
        }
    }
    async BookingConfirmation(data){
        try{
            const flightDetails=await axios.get(`${Flight_Search}/flightService/api/v1/flight/${data.flightId}`);
           

          
            const depatureTiming=flightDetails.data.data.departureTime;
            const arrivalTiming=flightDetails.data.data.arrivalTime;
            const sourceAirportId=flightDetails.data.data.depatureAirportId;
            const arrivalAiportId=flightDetails.data.data.destinationAirportId;

            const sourceAirport=await axios.get(`${Flight_Search}/flightService/api/v1/airport/${sourceAirportId}`);
            const destinationAirport=await axios.get(`${Flight_Search}/flightService/api/v1/airport/${arrivalAiportId}`);
           const source= sourceAirport.data.data.name;
           const destination=destinationAirport.data.data.name;
            this.sendBasicMail("reminderbookingservice@gmail.com",data.email,"Booking Confimration",`Your flight booking is from ${source} to ${destination} is confirmed.
            BOOKING DATE AND TIME: ${depatureTiming}`);

        }
        catch(err){
            throw err;
        }
    }
    async NotificationUpdate(data){
        try{
            console.log("Notification UPDATE")
            const flightDetails=await axios.get(`${Flight_Search}/flightService/api/v1/flight/${data.flightId}`);
           

            const email=data.email
            const depatureTiming=flightDetails.data.data.departureTime;
            const arrivalTiming=flightDetails.data.data.arrivalTime;
            const notificationData={
                Email:email,
                departureTime:depatureTiming,
                arrivalTime:arrivalTiming,
                Reminder:0

            }
            await this.ReminderTimeRespository.create(notificationData);


        }
        catch(err){
            throw err;

        }
    }
    async fetchPendingEmail(){
        try{
            const response=await this.ReminderTimeRespository.get();
          
            return response;


        }
        catch(err){
            throw err;

        }
    }
    async update(id,data){
        try{
            await this.ReminderTimeRespository.update(id,data);

        }
        catch(err){
            throw err;
        }
    }

    




}
module.exports=ReminderService;