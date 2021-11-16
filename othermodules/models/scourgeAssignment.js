module.exports = (sequelize, DataTypes) => {
    return sequelize.define('scourge_assignment', {
        scourge_id: DataTypes.STRING,
        user_id: DataTypes.STRING,
        weakness: DataTypes.STRING,
    }, {
        timestamps: false,
    })
}