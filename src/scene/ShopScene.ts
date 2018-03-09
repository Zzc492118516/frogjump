class ShopScene extends eui.Component implements eui.UIComponent {
	// 开始按钮
	public gotoMainBtn: eui.Button;

	// 页面跳转按钮
	public coinBtn: eui.Button;
	public propBtn: eui.Button;
	public coinLabel: eui.Label;
	public propLabel: eui.Label;

	// 金币数量
	public goldLabel: eui.Label;

	// 购买按钮
	public buyStrenthBtn: eui.Button;
	public buyResurgenceBtn: eui.Button;
	public rmb1Btn: eui.Button;
	public rmb6Btn: eui.Button;
	public rmb30Btn: eui.Button;
	public rmb60Btn: eui.Button;

	// loading背景
	public loadingBg: eui.Rect;
	private loadingMovieClip: egret.MovieClip;

	public constructor() {
		super();
		// 设置入场刷新金币数
		this.addEventListener(egret.Event.ADDED_TO_STAGE,function() {
			this.goldLabel.text = UserUtils.getInstance().getOwnUser().formatGold();
		},this);
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

		this.goldLabel.text = UserUtils.getInstance().getOwnUser().formatGold();

		/**
		 * 返回的就是充值后用户实际金币数目录
		 */
		function paySuccessd(msg) {
			UserUtils.getInstance().getOwnUser().userGold=parseInt(msg);
			this.goldLabel.text =UserUtils.getInstance().getOwnUser().formatGold();
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
		var params:any = "username="+egret.localStorage.getItem("username")+"&"+"price="+"100";
        NetController.getInstance().postData(Constant.buyActive, params, function(data){
			let response = JSON.parse(data.response);
			if (response.code == "1"){
				UserUtils.getInstance().getOwnUser().userGold -= 100;
				this.goldLabel.text = UserUtils.getInstance().getOwnUser().formatGold();
			}else {
				
			}
        }, this);
	}
	private buyResurgence() {
		var params:any = "username="+egret.localStorage.getItem("username")+"&"+"price="+"200";
        NetController.getInstance().postData(Constant.buyResurrection, params, function(data){
			let response = JSON.parse(data.response);
			if (response.code == "1"){
				UserUtils.getInstance().getOwnUser().userGold -= 200;
				this.goldLabel.text = UserUtils.getInstance().getOwnUser().formatGold();
			}else {
				
			}
        }, this);
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
	private connectLoading() {
		this.loadingBg.visible = true;
		if (!this.loadingMovieClip) {
			var data = RES.getRes("loading_json");
			var tex = RES.getRes("loading_png");
			var mcf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,tex);
			this.loadingMovieClip = new egret.MovieClip(mcf.generateMovieClipData());
			this.loadingMovieClip.x = 300;
			this.loadingMovieClip.y = 592;
		}
		this.addChild(this.loadingMovieClip);
		this.loadingMovieClip.gotoAndPlay(0,-1);
	}
	private connectComplete() {
		this.loadingBg.visible = false;
		this.loadingMovieClip.stop();
		this.removeChild(this.loadingMovieClip);
	}
}