const {Tasks, User, Locations,Companies} = require("../models");
const {TasksUsers} = require ('../models')
const APIFeatures = require("../utils/apiFeatures")
const apiResponse = require("../utils/appError");
const { Op } = require('sequelize');

const create = async (req,res)=>{
    const title = req.body.title
    const description = req.body.description
    const locationId = req.body.locationId
    let userId = req.body.userId
    const taskExist = await Tasks.findOne({where:{title:title}});
    if(taskExist){
        return   apiResponse(res, 400, false, 'task title must be unique', null);
    }
    let uniqueChars = [...new Set(userId)];
    let isUserExist = await User.findAll({where:{id: { [Op.in]: uniqueChars }}}) 
const createTask = await Tasks.create({
    title,
    description,
    locationId,
    userId
})
console.log("Task")
    for (let i = 0; i < isUserExist.length; i++) {
        let item = isUserExist[i]
       
       console.log(item,'these are the items')
    
   const userTasks = await TasksUsers.create({
    taskId:createTask.id,
    userId: item.id
   })
}
    res.status(200).json({
        data:{
            createTask
        }
    })

};
const get = async (req,res)=>{
    // const getTasks =  await Tasks.findAll({ })
    // res.status(200).json({
    //     message:'total tasks',
    //     data:{
    //         getTasks
    //     }
    // })
    const features = new APIFeatures(Tasks,req.query);
        const where = { status:'open' }
        features.where( where ).sort().limitFields().paginate();

        let blogs = await features.query();

        let blogsCount = await Tasks.count();
        return apiResponse(res, 200, true, `${blogs.length} tasks found`, blogs);
}
const update = async(req,res)=>{
    const checkTaskId = await Tasks.findByPk(req.params.id);
    if(! checkTaskId){
        return   apiResponse(res, 400, false, 'No task with this ID', null);
    }
    
    const updated = await Tasks.update({
        title: req.body.title,
        description: req.body.description,
        locationId: req.body.locationId
    },
        { where: { id: req.params.id } }
    )
    apiResponse(res, 200, true, 'task updated successfully', updated);
}
const getOne = async(req,res)=>{
    const checkTaskId = await Tasks.findByPk(req.params.id);
    if(! checkTaskId){
        return   apiResponse(res, 400, false, 'No task with this ID', null);
    }
    
    const getTask = await Tasks.findOne({where:{id: req.params.id},
        attributes: {exclude:['userId','taskId']},
    include: [
        {
            model: User,
            as: "users",
            attributes:['name','email'],
           
        },
        {
            model: Locations,
            as: "locations"
        }
    ]
    })
    apiResponse(res, 200, true, 'task found', getTask);
}
const remove = async(req,res)=>{
    const blog = await Tasks.findByPk(req.params.id);
        if (!blog) {
            return apiResponse(res, 400, false, 'No task with this ID', null);
        }
        
        const updated = await Tasks.destroy(
            { where: { id: req.params.id } }
        )
        apiResponse(res, 200, true, 'task deleted successfully', updated);
}


module.exports = {create, get, update, getOne, remove}