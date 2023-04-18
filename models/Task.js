const {TasksUsers} = require ('../models')

module.exports = (sequelize , DataTypes) =>{

    const Tasks = sequelize.define('Tasks',
    {
        title:{
            type:DataTypes.STRING,
            allownull: false
        },
        status: {
                type: DataTypes.ENUM('open', 'closed' ,'In-progress'),
                defaultValue: 'open',
                
            },
            description:{
                type:DataTypes.STRING,
                allownull: false
            },
    },
    { timestamps: true },
    )
    Tasks.associate = (models) => {
        // Tasks.hasMany(models.User,{foreignKey: 'userId'})
        //Tasks.belongsTo(models.User,{foreignKey: 'userId' } )
     Tasks.belongsTo(models.Locations,{ foreignKey: 'locationId', as:'locations' } )

        Tasks.belongsToMany(models.User, { through: 'TasksUsers',sourceKey:'id', targetKey:'id', foreignKey: 'taskId', as:'users' })
        Tasks.hasMany(models.Comments,{foreignKey:'taskId'})
        
    }

    return Tasks
}
