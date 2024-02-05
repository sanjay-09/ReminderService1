const {ReminderTime}=require("../models/index");

class reminderTimeRepository{
    async create(data){
        try{
            const response=await ReminderTime.create(data);
            return response;
        }
        catch(err){
            throw err;
        }
    }
    async get(){
        try{
            const response=await ReminderTime.findAll({
                where:{
                    status:"pending"
                }
            })
            return response;

        }
        catch(err){
            throw err;
        }
    }
    async update(id,data){
        try{
        const response=await ReminderTime.findByPk(id);
        if(data=="update status"){
            console.log(data);
        response.STATUS="success";
        await response.save();
        }
        else{
            response.Reminder++;
            await response.save();
        }

        }
        catch(err){
            throw err;
        }
    }
}
module.exports=reminderTimeRepository;