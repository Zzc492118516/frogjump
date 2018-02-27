class MenuScene extends eui.Component implements  eui.UIComponent {
	// 开始按钮
	public startBtn:eui.Button;

	public homeBtn:eui.Button;
	public picturesBtn:eui.Button;
	public rankBtn:eui.Button;
	public shopBtn:eui.Button;

	public userBtn:eui.Button;
	public strenthBtn:eui.Button;
	public coinBtn:eui.Button;

	public closeBtn1:eui.Button;
	public closeBtn2:eui.Button;
	public closeBtn3:eui.Button;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}
	private init(){
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
		this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHome,this);
		this.picturesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapPictures,this);
		this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapRank,this);
		this.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapShop,this);
		this.userBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapUser,this);
		this.strenthBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapStrenth,this);
		this.coinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapCoin,this);
		this.closeBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapClose,this);
		this.closeBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapClose,this);
		this.closeBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapClose,this);
	}
	private tapHandler(){
		// 切换场景
		SceneManger.getInstance().changeScene('gameScene');
	}
	private tapHome(){

	}
	private tapPictures(){
		// 切换状态
		this.skin.currentState = "handbook";
	}
	private tapRank(){
		// 切换状态
		this.skin.currentState = "rank";
	}
	private tapShop(){
		// 切换场景
		SceneManger.getInstance().changeScene('shopScene');
	}
	private tapUser(){
		// 切换状态
		this.skin.currentState = "userInfo";
	}
	private tapStrenth(){

	}
	private tapCoin(){

	}
	private tapClose(){
		// 切换状态
		this.skin.currentState = "main";
	}
}