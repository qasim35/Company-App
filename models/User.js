const bcrypt = require("bcryptjs")
const Company = require("./Company")
module.exports = (sequelize, DataTypes) => {

    const User= sequelize.define('User'
        , {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true,
                }

            },
            password: {
                type: DataTypes.STRING,
                required: true,

            },
            role: {
                type: DataTypes.ENUM('user',  'admin'),
                defaultValue: 'user',
                validate: {
                    isIn: {
                        args: [['user',  'admin']],
                        msg: "role must be user,admin"
                    }
                }
            },
            // status: {
            //     type: DataTypes.ENUM('active', 'blocked'),
            //     defaultValue: 'active',
            //     validate: {
            //         isIn: {
            //             args: [['active', 'blocked']],
            //             msg: "status must be ['active','blocked']",
            //         },
            //     },
            // },
            // profileImage: {
            //     type: DataTypes.STRING,
            //     defaultValue: null
            // }

        },
        {
            defaultScope: {
                attributes: {
                    exclude: ['password']
                }
            }
        },
        { timestamps: true },

    )
    
    User.associate = (models) => {
        User.belongsTo(models.Companies, {foreignKey: 'companyId' },
        {as:'company'}
        ) 
        // User.belongsTo(models.Tasks,{foreignKey: 'userId' } )
       // User.hasMany(models.Tasks,{foreignKey: 'userId'})

        User.belongsToMany(models.Tasks, { through: 'TasksUsers',sourceKey:'id', targetKey:'id',foreignKey: 'userId',as:'tasks' });
        User.hasMany(models.Comments,{foreignKey:'userId'})
    }
   // User.hasMany(Company,{foreignKey: 'userId'})
        
         
    

    // User.associate = (models) => {
    //     User.hasMany(models.Comments, { foreignKey: 'userId' ,as:'userId'});
    // }
    User.beforeCreate(async (user) => {
        const encryptPassword = await bcrypt.hash(user.password, 12);
        user.password = encryptPassword;
    })
    return User
}