// Creating our User model
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // The email cannot be null, and must be a proper email before creation
        bcsId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        githubUserName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        acceptedAgreement: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Answer, {
            onDelete: "cascade"
        });
        User.hasMany(models.Comment, {
            onDelete: "cascade"
        });
        User.hasMany(models.Problem, {
            onDelete: "cascade"
        });
    };
    return User;
};