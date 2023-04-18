const { Companies, User , Locations} = require("../models");
const { Op } = require('sequelize');
const apiResponse = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures")

const get = async (req,res)=>{
    const companyExist = await Companies.findByPk(req.params.id)
    if(! companyExist){
        return apiResponse(res, 400, false, 'No company with this ID', null);
    }
    const getCompany = await Companies.findOne({where:{id:req.params.id},
    include:[
        {
            model:User,
            as:'users',
        },
        {
            model: Locations,
            as:'locations'
        }
    ]
    })

apiResponse(res,200,true,'company found',getCompany)
};

const getAll = async (req,res)=>{
    const getCompanies = await Companies.findAll({include:[{model: User, as:'users'}]})
    apiResponse(res,200,true,'companies found',getCompanies);
    
};

const update = async (req,res)=>{
    const companyExist = await Companies.findByPk(req.params.id)
    if(! companyExist){
        return apiResponse(res, 400, false, 'No company with this ID', null);
    }
    const updateCompany = await Companies.update({
        name:req.body.name,
        address:req.body.address
    },
    { where: { id: req.user.id } }
    )
    apiResponse(res,200,true,'company updated successfully',updateCompany)
};
const remove = async(req,res)=>{
    const blog = await Companies.findByPk(req.params.id);
        if (!blog) {
            return apiResponse(res, 400, false, 'No comment with this ID', null);
        }
        const updated = await Companies.destroy(
            { where: { id: req.user.id } }
        )
        apiResponse(res, 200, true, 'company deleted successfully', updated);
}

module.exports = {get, getAll, update,remove}