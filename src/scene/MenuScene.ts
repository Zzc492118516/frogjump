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

	// 图鉴翻页按钮
	public pageLeftBtn:eui.Button;
	public pageRightBtn:eui.Button;

	public closeBtn1:eui.Button;
	public closeBtn2:eui.Button;
	public closeBtn3:eui.Button;

	// 排行的标签
	public scoreRankLabel:eui.Label;
	public homeRankLabel:eui.Label;

	// 上方文字标签
	public userNameLabel:eui.Label;
	public strenthTimeLabel:eui.Label;
	public coinLabel:eui.Label;

	// 图鉴的图片
	public picture1:eui.Image;
	public picture2:eui.Image;
	public picture3:eui.Image;

	// 图鉴当前页数
	private picturesPage:number;
	private picturesMaxPaper:number;

	// 图鉴图片的名称
	private picturesName:Array<string>;

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
		var data = RES.getRes("frogBg_json");
		var tex = RES.getRes("frogBg_png");
		var mcf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,tex);
		var mc:egret.MovieClip = new egret.MovieClip(mcf.generateMovieClipData());
		mc.x = 0;
		mc.y = 427;
		mc.scaleX = 2;
		mc.scaleY = 2;
		this.addChildAt(mc,1);
		mc.gotoAndPlay(0,-1);

		// 设置监听
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHandler,this);
		this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHome,this);
		this.picturesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapPictures,this);
		this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapRank,this);
		this.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapShop,this);
		this.userBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapUser,this);
		this.strenthBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapStrenth,this);
		this.coinBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapCoin,this);
		this.pageLeftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapLeftPage,this);
		this.pageRightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapRightPage,this);
		this.closeBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapClose,this);
		this.closeBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapClose,this);
		this.closeBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapClose,this);
		this.scoreRankLabel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapScoreRank,this);
		this.homeRankLabel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapHomeRank,this);
		this.userNameLabel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapUser,this);
		this.strenthTimeLabel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapStrenth,this);
		this.coinLabel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapCoin,this);

		// 设置参数
		this.picturesName = ["handbook_1_jpg","handbook_2_jpg","handbook_3_jpg","handbook_4_jpg","handbook_5_jpg","handbook_6_jpg",
		"handbook_7_jpg","handbook_8_jpg","handbook_9_jpg","handbook_10_jpg","handbook_11_jpg","handbook_12_jpg","handbook_13_jpg",
		"handbook_14_jpg","handbook_15_jpg","handbook_16_jpg","handbook_17_jpg","handbook_18_jpg"];
		this.picturesMaxPaper = this.picturesName.length / 3;

		// 图鉴添加遮罩
		this.addMaskShape(this.picture1);
		this.addMaskShape(this.picture2);
		this.addMaskShape(this.picture3);
	}
	private tapHandler(){
		// 切换场景
		SceneManger.getInstance().changeScene('gameScene');
	}
	private tapHome(){

	}
	private tapPictures(){
		// 设置页数为1
		this.picturesPage = 1;
		this.pageLeftBtn.visible = false;
		this.pageRightBtn.visible = this.picturesMaxPaper == 1 ? false : true;
		this.refreshPictrues();
		// 切换状态
		this.skin.currentState = "handbook";
	}
	private tapRank(){
		// 切换状态
		this.skin.currentState = "scoreRank";
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
		SceneManger.getInstance().changeScene('shopScene');
	}
	private tapLeftPage(){
		this.pageLeftBtn.visible = --this.picturesPage == 1 ? false : true;
		this.pageRightBtn.visible = true;
		this.refreshPictrues();
	}
	private tapRightPage(){
		this.pageLeftBtn.visible = true;
		this.pageRightBtn.visible = ++this.picturesPage == this.picturesMaxPaper ? false : true;
		this.refreshPictrues();
	}
	private tapClose(){
		// 切换状态
		this.skin.currentState = "main";
	}
	private tapScoreRank(){
		// 切换状态
		this.skin.currentState = "scoreRank";
	}
	private tapHomeRank(){
		// 切换状态
		this.skin.currentState = "homeRank";
	}
	private refreshPictrues(){
		this.picture1.source = this.picturesName[this.picturesPage * 3 - 3];
		if (this.picturesPage * 3 - 2 < this.picturesName.length){
			this.picture2.visible = true;
			this.picture2.source = this.picturesName[this.picturesPage * 3 - 2];
		}else {
			this.picture2.visible = false;
		}
		if (this.picturesPage * 3 - 1 < this.picturesName.length){
			this.picture3.visible = true;
			this.picture3.source = this.picturesName[this.picturesPage * 3 - 1];
		}else {
			this.picture3.visible = false;
		}
	}
	 private addMaskShape(image: eui.Image){
        var maskShape = new egret.Shape();
        maskShape.graphics.beginFill(1,1);
        maskShape.graphics.drawRoundRect(image.x,image.y,image.width,image.height,40,40);
        maskShape.graphics.endFill();

        this.addChild(maskShape);
        image.mask = maskShape;
    }
}