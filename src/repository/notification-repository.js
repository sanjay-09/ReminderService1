const {NotificationTickets}=require("../models/index");
const { Op } = require("sequelize");


class NotificationRepository{
    async getAll(){
        try{
            const response=await NotificationTickets.getAll();
            return response;

        }
        catch(err){
            throw err;
        }
    }
    async create(data){
        try{
            const response=await NotificationTickets.create(data);
            return response;

        }
        catch(err){
            throw err;
        }
    }
    async get(filter){
        try{
            const data=await NotificationTickets.findAll({
                where:{
                    status:filter.status,
                    notification:{
                        [Op.lte]:new Date()
                    }

                }
            })
            return data;

        }
        catch(err){
            throw err;
        }

    }
    async update(ticketId,data){
        try{
            console.log(ticketId);
          
            console.log(data);
            await NotificationTickets.update(data,{
                where:{
                    id:ticketId
                }
            })
            return true;


        }
        catch(err){
            console.log(err);
            throw err;
        }
    }

}
module.exports=NotificationRepository;