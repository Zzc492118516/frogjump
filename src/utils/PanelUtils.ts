class PanelUtils {
	private _dialogText: string;

	private dialogPanel: Dialog;
	// loading背景
	public loadingBg: eui.Rect;
	private loadingMovieClip: egret.MovieClip;

	private static _instance: PanelUtils;

	public static getInstance() {
		if (!this._instance) {
			this._instance = new PanelUtils();
		}
		return this._instance;
	}
	public constructor() {
	}

	public showDialog(text:string) {
		this.dialogText = text;
		SceneManger.getInstance().addChild(this.dialogPanel);
	}

	public set dialogText(dialogText: string) {
		this._dialogText = dialogText;
		if (!this.dialogPanel) {
			this.dialogPanel = new Dialog();
		}
		this.dialogPanel.dialogLabel.text = dialogText;
	}
	public connectLoading() {
		if (!this.loadingBg) {
			this.loadingBg = new eui.Rect();
			this.loadingBg.fillColor = 0;
			this.loadingBg.fillAlpha = 0.4;
			this.loadingBg.width = SceneManger.getInstance().width;
			this.loadingBg.height = SceneManger.getInstance().height;
		}
		SceneManger.getInstance().addChild(this.loadingBg);
		if (!this.loadingMovieClip) {
			var data = RES.getRes("loading_json");
			var tex = RES.getRes("loading_png");
			var mcf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,tex);
			this.loadingMovieClip = new egret.MovieClip(mcf.generateMovieClipData());
			this.loadingMovieClip.x = 300;
			this.loadingMovieClip.y = 592;
		}
		SceneManger.getInstance().addChild(this.loadingMovieClip);
		this.loadingMovieClip.gotoAndPlay(0,-1);
	}
	public removeLoading() { 
		SceneManger.getInstance().removeChild(this.loadingBg);
		this.loadingMovieClip.stop();
		SceneManger.getInstance().removeChild(this.loadingMovieClip);
	}
}