import sequelize from '@/models/sequelize';
import { DataTypes } from 'sequelize';

const ExampleModel = sequelize.define(
    'example',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        paranoid: true,
    },
);

ExampleModel.associate = (models) => {
    // Define associations here
    // For example:
    // ExampleModel.belongsTo(models.AnotherModel, {
    //     foreignKey: 'anotherModelId',
    //     as: 'anotherModel',
    // });
};

export default ExampleModel;
