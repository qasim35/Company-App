
const User = require('./User')
module.exports = (sequelize, DataTypes) => {

    const Locations = sequelize.define('Locations'
        , {
            name: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,

            },
           

        },
        { timestamps: true },

    )
    Locations.associate = (models) => {
        Locations.belongsTo(models.Companies, {foreignKey: 'companyId' },
        {as:'company'}
        );  
        Locations.hasOne(models.Tasks, {foreignKey: 'locationId',as:'locations',onDelete:'CASCADE' })
    }

    return Locations
}