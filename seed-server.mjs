import db from './models';
import users from './data/user-seeds';
import problems from './data/problem-seeds';
db.sequelize.sync({force: true}).then(() => {
    var userPromises = [];
    users.forEach(user => {
        console.log(user);
        userPromises.push(db.User.create({
            id: user.id,
			bcsId: user.bcsId,
			avatarUrl: user.avatarUrl,
			githubUserName: user.githubUserName
		}))
    });
    Promise.all(userPromises).then(() => {
        var problemPromises = [];
        problems.forEach(problem => {
            problemPromises.push(db.Problem.create({
                imageUrl: problem.imageUrl,
                name: problem.name,
                description: problem.description,
                short: problem.short,
                hint: problem.hint
            }, {
                userId: problem.UserId
            }));
        });
        Promise.all(problemPromises).then(() => {
            console.log("finished!")
            db.sequelize.close();
        });
    })
});