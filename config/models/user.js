var db = require('../../models');

class User {
	constructor(email, jwt, githubUserName, avatarUrl, bcsId, id, acceptedAgreement) {
		this.email = email;
		this.jwt = jwt;
		this.githubUserName = githubUserName;
		this.avatarUrl = `//github.com/${githubUserName}.png`;
		this.bcsId = bcsId;
		this.id = id;
		this.acceptedAgreement = acceptedAgreement;
		this.createDatabaseUser = this.createDatabaseUser.bind(this);
	}
	createDatabaseUser() {
		return db.User.create({
			bcsId: this.bcsId,
			avatarUrl: this.avatarUrl,
			githubUserName: this.githubUserName
		}).then(dbUser => {
			this.id = dbUser.id;
			this.acceptedAgreement = dbUser.acceptedAgreement;
			return dbUser;
		});
	}
}
module.exports = User;