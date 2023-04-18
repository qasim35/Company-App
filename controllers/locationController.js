const {Locations, Companies} = require("../models");
const APIFeatures = require("../utils/apiFeatures")
const apiResponse = require("../utils/appError");
const createComment = async (req, res) => {
    try {
        console.log(Locations)
        const name = req.body .name;
        const address = req.body.address;
        if(!name || !address){
            return apiResponse(res,400,false,"please provide all values");
        }
        const newLocation = await Locations.create({
            name:name,
            address:address,
            companyId: req.user.id
        });
        console.log(newLocation)
        return res.status(200).json({
            message:"new location",
            data:{
                newLocation
            }
        })
    } catch (err) {
        console.log(err)
    }
};

const get = async (req, res) => {
    try {
        const blog = await Locations.findByPk(req.params.id);
        if (!blog) {
            return apiResponse(res, 400, false, 'No comment with this ID', null);
        }

        const blogs = await Locations.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: Companies,
                    

                },
                
            ]
        })
        //console.log(blogs)
        apiResponse(res, 200, true, 'location found', blogs);
    } catch (err) {
        console.log(err)
    }
}
const getAll = async (rea,res)=>{
    const location = await Locations.findAll({
        include:[
            {
                model:Companies
            }
        ]
    });
    apiResponse(res, 200, true, 'total locations', location);
}

const update = async(req,res)=>{
    const blog = await Locations.findByPk(req.params.id);
        if (!blog) {
            return apiResponse(res, 400, false, 'No comment with this ID', null);
        }
        const updated = await Locations.update({
            name: req.body.name,
            address: req.body.address
        },
            { where: { id: req.params.id } }
        )
        apiResponse(res, 200, true, 'location updated successfully', updated);
}

const remove = async(req,res)=>{
    const blog = await Locations.findByPk(req.params.id);
        if (!blog) {
            return apiResponse(res, 400, false, 'No comment with this ID', null);
        }
        const updated = await Locations.destroy(
            { where: { id: req.params.id } }
        )
        apiResponse(res, 200, true, 'location deleted successfully', updated);
}


module.exports = { createComment, get,getAll, update,remove };

