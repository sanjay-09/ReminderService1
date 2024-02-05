// const emailService=require("../services/email-service");
// const create=async(req,res)=>{
//     try{
//         const result=await emailService.create(req.body);
//         return res.status(200).json({
//             data:result,
//             status:true,
//             message:"Created the remainder service",
//             err:{}
//         })

//     }
//     catch(err){
//         return res.status(500).json({
//             data:{},
//             status:false,
//             message:"Cannot create the remainder service",
//             err:{}

//         })
//     }
// }
// module.exports={
//     create
// }