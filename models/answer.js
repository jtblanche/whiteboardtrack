// Creating our User model
module.exports = function (sequelize, DataTypes) {
    var Answer = sequelize.define("Answer", {
        // The email cannot be null, and must be a proper email before creation
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        public: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: true
        },
        course: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        code: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    Answer.associate = function (models) {
        Answer.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Answer.belongsTo(models.Problem, {
            foreignKey: {
                allowNull: false
            }
        });
        Answer.hasMany(models.Comment, {
            onDelete: "cascade"
        });
    };
    return Answer;
};