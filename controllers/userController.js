const  {Companies, Tasks,Locations}  = require("../models");
const jwt = require('jsonwebtoken');
const apiResponse = require('../utils/appError');
const catchAsync = require("../utils/catchAsync")
const bcrypt = require('bcryptjs');
const {User} = require("../models");

const signToken = id => {
    console.log(id)
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};


const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user.id);
    console.log(user.id)



    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};
const register = catchAsync(async (req, res, next) => {
    try{
        console.log(User,'/////////')
        console.log(Companies,'this is company')
        const { companyName, address,name, email,password, role } = req.body;
    
        
        if (!name || !address) {
            return apiResponse(res, 400, false, 'please provide all values!');
        }
        const userExist = await Companies.findOne({
            where: {
                name:companyName
            }
        });
        if (userExist) {
           return  apiResponse(res, 400, false, 'Company name must be unique');
        
        }
        
        const emailExist = await User.findOne({
            where: {
                email: email
            }
        });
        if (emailExist) {
            return apiResponse(res, 400, false, 'User already exist');
        }
        const newCompany = await Companies.create({
            name: companyName,
           address:address,
           
        });
        const newUser = await User.create({
                name:name,
                email:email,
                password:password,
                role: role,
                companyId: newCompany.dataValues.id
                
               
            })
            
    
    
        createSendToken(newUser, 201, req, res);
        
    
    }catch(err){
        console.log(err)
    }

    });

const login = catchAsync(async (req, res, next) => {
try{
    const email = req.body.email;
    const password = req.body.password
   

    // 1) Check if email and password exist
    if (!email || !password) {
        return apiResponse(res, 400, false, 'please provide all values');
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne(
    
    {
        attributes: ['id','email','name', 'password','role'],
            where: {
                email: email
            }
        },

    )
    console.log(user)
    if (!user) {
        return apiResponse(res, 400, false, 'user with this email desnot exist');
    }

    const comparePassword = await bcrypt.compare(password, user.password); //await to resolve promise
console.log(user.password,"this is password");
    if (!comparePassword) {
        return apiResponse(res, 400, false, 'Invalid  email or password!');
    }
    // if (user.dataValues.status === 'blocked') {
    //     return apiResponse(res, 400, false, 'You are blocked by admin');
    // }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
}catch(err){
    console.log(err)
}
});


const createUser = async (req,res)=>{
    try{
        console.log("the create user api")
        const { name, email, password, role } = req.body;
   
    if (!email || !password) {
        return apiResponse(res, 400, false, 'Please provide email and password!');
    }
    const userExist = await User.findOne({
        where: {
            email: email
        }
    });
    if (userExist) {
        return apiResponse(res, 400, false, 'User already exist');
    }
    
    
    console.log(req.body.companyId)
    const newUser = await User.create({
        name: name,
        email: email,
        password: password,
       companyId:req.user.id
    
    });
   
    return res.status(200).json({
        message:"user created",
        data:{
            newUser
        }
    })

    }catch(err){
    console.log(err)
    }
}


const getUserById = async (req, res) => {
    const blogExist = await User.findOne({
        where: { id: req.params.id },
    });
    if (!blogExist) {
        return apiResponse(res, 400, false, 'No User found with this ID ', null);
    }
    const userExist = await User.findByPk(req.params.id);

    apiResponse(res, 200, true, 'User found', userExist);

}
const getMe = async (req, res) => {
    const me = await User.findOne({ where: { id: req.user.id },
        include:[
            {
                model: Companies,
                include:[
                    {
                        model: Locations,
                        as:'locations'
                    }
                ]
                
            },
            
            {
                model : Tasks,
                as:'tasks'
            }
        ]
    
    });
   
    apiResponse(res, 200, true, 'User found', me);
}
const update = async (req, res) => {
    const { name, email} = req.body;
    
    const blogExist = await User.findOne({
        where: { id: req.params.id },
    });
    if (!blogExist) {
        return apiResponse(res, 400, false, 'No User found with this ID to update', null);
    }
    
    const updateUser = await User.update({
        name: name,
        email: email,
        
       
    }, {
        where: { id: req.params.id }
    })
    apiResponse(res, 200, true, 'User updated successfully ', updateUser);
};


const remove = async (req, res) => {
    const blogExist = await User.findOne({
        where: { id: req.params.id },
    });
    if (!blogExist) {
        return apiResponse(res, 400, false, 'No User found with this ID to delete', null);
    }
    const deleteBlog = await User.destroy({
        where: { id: req.params.id }
    });
    apiResponse(res, 200, true, 'User deleted successfully ', deleteBlog);
}
const getAllData = async (req,res) =>{
    
    const getData = await User.findAll({
        include:[
            {
                model : Companies,
            },
            
        ]
    })
    apiResponse(res, 200, true, 'all data', getData);
}
const updateUserProfile = async (req, res) => {
    console.log(req.user.id, 'user profile')
    const { name, email, role } = req.body;
   
    const blogExist = await User.findOne({
        where: { id: req.params.id },
    });
    if (!blogExist) {
        return apiResponse(res, 400, false, 'No User found with this ID to update', null);
    }
   
    if (req.user.id != req.params.id) {
        return apiResponse(res, 400, false, 'You can update your profile only', null);
    }
    const updateUser = await User.update({
        name: name,
        email: email,
        role: role,
       
    }, {
        where: { id: req.params.id }
    })
    apiResponse(res, 200, true, 'User updated successfully ', updateUser);
}
const removeUserProfile = async (req, res) => {
    const blogExist = await User.findOne({
        where: { id: req.params.id },
    });
    if (!blogExist) {
        return apiResponse(res, 400, false, 'No User found with this ID to delete', null);
    }
    if (req.user.id != req.params.id) {
        console.log(req.user.id, 'user id');
        return apiResponse(res, 400, false, 'You can delete your profile only', null);
    }
    const deleteBlog = await User.destroy({
        where: { id: req.params.id }
    });
    apiResponse(res, 200, true, 'User deleted successfully ', null);
}


module.exports = { register, login,  getMe, getUserById, update,  remove,  createUser ,getAllData, updateUserProfile,removeUserProfile}