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
		if(this.ownUser==null)
		this.ownUser=new User();
		this.ownUser.propNum = user.propNum;
		this.ownUser.activeNum = user.activeNum;
		this.ownUser.update = user.update;
		this.ownUser.userGold = user.userGold;
		this.ownUser.userid = user.userid;
		this.ownUser.userMark = user.userMark;
	}
	public getOwnUser(): User {
		return this.ownUser;
	}
}