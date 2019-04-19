// Creating our User model
module.exports = function (sequelize, DataTypes) {
    var Problem = sequelize.define("Problem", {
        // The email cannot be null, and must be a proper email before creation
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        short: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hint: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });

    Problem.associate = function (models) {
        // Associating Store with Posts
        // When an Store is deleted, also delete any associated Posts
        Problem.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        // Problem.belongsToMany(models.Key, {
        //     through: "Key_Problem"
        // });
        Problem.hasMany(models.Answer, {
            onDelete: "cascade"
        });
    };

    Problem.prototype.ViewModel = function () {
        var newProblem =  {
            imageUrl: this.imageUrl,
            name: this.name,
            description: this.description,
            short: this.short,
            hint: this.hint,
        }
        if (this.User) {
            newProblem.avatarUrl = this.User.avatarUrl;
            newProblem.author = this.User.githubUserName;
        }
        return newProblem;
    }

    Problem.addHook('beforeValidate', (problem, options) => {
        return new Promise((resolve, reject) => {
            console.log('afterValidate options: ', options);
            problem.UserId = options.userId;
            resolve(problem, options);
        })
      });
    return Problem;
};