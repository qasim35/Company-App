const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan')
const routes = require('./routes');
const swaggerJSDoc= require ("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json")
const globalErrorHandler = require('./controllers/errorController');
const {Tasks} = require('./models');
const auth = require("./middleware/auth");
const taskController = require("./controllers/taskController")
dotenv.config()
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use("/uploads", express.static("./uploads"))
app.use('/api/v1',routes);

const options = {
    definition:{
        openapi:'3.0.0',
        components:{
            securitySchemes:{
                bearerAuth:{         
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                  } 
            }  
        
    },
        info:{
            title:'Obenon Dev',
            version: '1.0.0'
        },
        
        servers: [
            {
                url: 'http://localhost:3000/'
            }
        ]
    },
    apis:['./app.js'],
    security:{
   bearerAuth: [] 
    }
}
const swaggerSpec = swaggerJSDoc(options)
app.use('/dev@obenan.com',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 *  components:
 *      schema:
 *          Tasks:
 *                type: object
 *                properties:
 *                      id: integer
 *                      title: string
 *              
 */

/**
 * @swagger
 * /api/v1/tasks:
 *  get:
 *     
 *      summary: This is the get task API it will get all the tasks
 *      description: get all the tasks from database
 *      responses:
 *          200:
 *              description: tasks fetched successfully
 */

/**
 * @swagger
 * /api/v1/task:
 *  post:
 *     
 *      summary: This is the post task API it will post all the tasks
 *      description: post task to the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                        $ref:'#components/schema/Tasks'
 *      responses:
 *          200:
 *              description: tasks fetched successfully
 */

//app.post('/api/v1/task',auth,taskController.create)
const PORT =  3002;
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
});
app.use(globalErrorHandler)

