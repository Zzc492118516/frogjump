class User {

	public userid: number;
	public activeNum: number;
	public propNum: number;
	public update: number;
	public _userGold: number;
	public userMark: number;

	public constructor() {

	}

	public set userGold(Gold: number) {
		if (Gold == null||Gold==undefined)
			Gold = 0;
		this._userGold = Gold;
	}
	public get userGold(): number {
		return this._userGold;
	}
	public formatGold(): string {
		if (this.userGold > 10000) {
			return Math.floor(this.userGold / 10000) + "万";
		} else {
			return this.userGold + "";
		}
	}
}