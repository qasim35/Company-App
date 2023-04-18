
module.exports = (sequelize, DataTypes) => {

    const Comments = sequelize.define('Comments'
        , {
            username: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false,

            },
           

        },
        { timestamps: true },

    )
    Comments.associate = (models) => {
        Comments.belongsTo(models.User, {foreignKey: 'userId',as: 'user' }
        );  
        Comments.belongsTo(models.Tasks, {foreignKey: 'taskId',as:'tasks' })
    }

    return Comments
}