class ShopScene extends eui.Component implements  eui.UIComponent {
	// 开始按钮
	public gotoMainBtn:eui.Button;

	public coinBtn:eui.Button;
	public propBtn:eui.Button;
	public coinLabel:eui.Label;
	public propLabel:eui.Label;

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
		this.gotoMainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapGotoMainBtn,this);
		this.coinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapCoin,this);
		this.coinLabel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapCoin,this);
		this.propBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapProp,this);
		this.propLabel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapProp,this);
	}
	private tapGotoMainBtn(){
		// 切换场景
		SceneManger.getInstance().changeScene('menuScene');
	}
	private tapCoin(){
		// 切换状态
		this.skin.currentState = "coin";
	}
	private tapProp(){
		// 切换状态
		this.skin.currentState = "prop";
	}
}