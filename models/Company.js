const User = require("./User")


module.exports = (sequelize, DataTypes) => {

    const Companies = sequelize.define('Companies'
        , {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
           
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            
           
            
        },
        { timestamps: true },
        
    )
    //Companies.belongsTo(User, {foreignKey: 'userId'});
       
    

    Companies.associate = (models) => {
        Companies.hasMany(models.User,{foreignKey: 'companyId',as:'users'})
        Companies.hasMany(models.Locations,{foreignKey: 'companyId',as:'locations'})
    }
    
    
    
    return Companies
}