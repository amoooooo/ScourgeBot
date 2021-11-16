module.exports = (sequelize, DataTypes) => {
    return sequelize.define('scourge', {
        scourge_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        weaknesses: DataTypes.STRING,
        strengths: DataTypes.STRING,
        personality: DataTypes.STRING,
        level: DataTypes.INTEGER,
    }, {
        timestamps: false,
    })
}