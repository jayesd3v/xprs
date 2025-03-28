import { sequelize } from '@/models';

const SampleModel = sequelize.define(
    'sample',
    {
        id: {
            type: sequelize.Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: sequelize.Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: sequelize.Sequelize.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: true,
        paranoid: true,
    },
);

SampleModel.associate = (models) => {
    // Define associations here
    // For example:
    // SampleModel.belongsTo(models.AnotherModel, {
    //     foreignKey: 'anotherModelId',
    //     as: 'anotherModel',
    // });
};

export default SampleModel;
