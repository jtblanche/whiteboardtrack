// Creating our User model
module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        // The email cannot be null, and must be a proper email before creation
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    Comment.associate = function (models) {
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Comment.belongsTo(models.Answer, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Comment;
};