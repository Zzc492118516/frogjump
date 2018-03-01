class ShopScene extends eui.Component implements eui.UIComponent {
	// 开始按钮
	public gotoMainBtn: eui.Button;

	// 页面跳转按钮
	public coinBtn: eui.Button;
	public propBtn: eui.Button;
	public coinLabel: eui.Label;
	public propLabel: eui.Label;

	// 购买按钮
	public buyStrenthBtn: eui.Button;
	public buyResurgenceBtn: eui.Button;
	public rmb1Btn: eui.Button;
	public rmb6Btn: eui.Button;
	public rmb30Btn: eui.Button;
	public rmb60Btn: eui.Button;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
	}
	private init() {
		this.gotoMainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapGotoMainBtn, this);
		this.coinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapCoin, this);
		this.coinLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapCoin, this);
		this.propBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapProp, this);
		this.propLabel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapProp, this);
		this.buyStrenthBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyStrenth, this);
		this.buyResurgenceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyResurgence, this);
		this.rmb1Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyYiRmb, this);
		this.rmb6Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyLiuRmb, this);
		this.rmb30Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buySanshiRmb, this);
		this.rmb60Btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyLiushiRmb, this);

		/**
		 * 返回的就是充值的数额比如：1,6
		 */
		function paySuccessd(msg) {
			console.log(msg);
		}
		egret.ExternalInterface.addCallback("paySuccessd", paySuccessd);
	}
	private tapGotoMainBtn() {
		// 切换场景
		SceneManger.getInstance().changeScene('menuScene');
		// 并切换买金币状态
		this.skin.currentState = "coin";
	}
	private tapCoin() {
		// 切换状态
		this.skin.currentState = "coin";
	}
	private tapProp() {
		// 切换状态
		this.skin.currentState = "prop";
	}
	private buyStrenth() {

	}
	private buyResurgence() {

	}
	private buyYiRmb() {
		egret.ExternalInterface.call("gotoPay", "10001,1");
	}
	private buyLiuRmb() {
		egret.ExternalInterface.call("gotoPay", "10002,6");
	}
	private buySanshiRmb() {
		egret.ExternalInterface.call("gotoPay", "10003,30");
	}
	private buyLiushiRmb() {
		egret.ExternalInterface.call("gotoPay", "10004,60");
	}
}