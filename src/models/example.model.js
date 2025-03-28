import sequelize from '@/models/sequelize';

const ExampleModel = sequelize.define(
    'example',
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

ExampleModel.associate = (models) => {
    // Define associations here
    // For example:
    // ExampleModel.belongsTo(models.AnotherModel, {
    //     foreignKey: 'anotherModelId',
    //     as: 'anotherModel',
    // });
};

export default ExampleModel;
