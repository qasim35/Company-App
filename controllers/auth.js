const  {Companies}  = require("../models");
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
        console.log(Company,'/////////')
        const { name, address } = req.body;
    
        
        if (!name || !address) {
            return apiResponse(res, 400, false, 'please provide all values!');
        }
        const userExist = await Companies.findOne({
            where: {
                name:name
            }
        });
        if (userExist) {
            return apiResponse(res, 400, false, 'Company name must be unique');
        }
        
        const newUser = await Companies.create({
            name: name,
           address:address
        });
    
        createSendToken(newUser, 201, req, res);
    }catch(err){
        console.log(err)
    }
    });

const login = catchAsync(async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password

    // 1) Check if email and password exist
    if (!email || !password) {
        return apiResponse(res, 400, false, 'Please provide email and password!');
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({

        attributes: ['id','email', 'password','role'] //include these fields to get from db

    },   {
            where: {
                email: email
            }
        },

    )
    if (!user) {
        return apiResponse(res, 400, false, 'Invalid  email or password!');
    }

    const comparePassword = await bcrypt.compare(password, user.password); //await to resolve promise

    if (!comparePassword) {
        return apiResponse(res, 400, false, 'Invalid  email or password!');
    }
    if (user.dataValues.status === 'blocked') {
        return apiResponse(res, 400, false, 'You are blocked by admin');
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
});

module.exports = {register,login}