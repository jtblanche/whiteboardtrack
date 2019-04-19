// Creating our User model
module.exports = function (sequelize, DataTypes) {
    var Key = sequelize.define("Key", {
        // The email cannot be null, and must be a proper email before creation
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Key.associate = function (models) {
        // Associating Store with Posts
        // When an Store is deleted, also delete any associated Posts
        Key.belongsToMany(models.Problem, {
            through: "Key_Problem"
        });
    };
    return Key;
};