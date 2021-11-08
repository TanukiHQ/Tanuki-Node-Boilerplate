const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Person extends Model {}

    Person.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: uuid.v4(),
            },

            name: {
                allowNull: false,
                type: DataTypes.STRING(128),
            },
        },

        {
            sequelize,
            tableName: 'Person',
            modelName: 'Person',
        },
    )

    // Person.associate = (models) => {
    //     Person.hasMany(models.Company, {
    //         onDelete: 'cascade',
    //         foreignKey: 'uid',
    //     })
    // }

    return Person
}
