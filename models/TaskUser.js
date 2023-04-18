module.exports = (sequelize, DataTypes)=> {
    const tasksUser = sequelize.define('TasksUsers', {
        taskId:{
            type: DataTypes.INTEGER,
            allownull: false
        },
        userId:{
            type: DataTypes.INTEGER,
            allownull: false
        }
    },
    { timestamps: true },
    {
        defaultScope:{
    
        }
    }
    )
    return tasksUser
}