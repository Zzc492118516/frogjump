class UserUtils {
	private static _instance: UserUtils;
	private ownUser: User;
	public static getInstance() {
		if (!this._instance) {
			this._instance = new UserUtils();
		}
		return this._instance;
	}
	public saveOwnUser(user: User) {
		this.ownUser = user;
	}
	public getOwnUser(): User {
		return this.ownUser;
	}
}