class Dialog extends eui.Component implements eui.UIComponent{
	public dialogLabel: eui.Label;

	public closeBtn: eui.Button;

	public backView: eui.Rect;

	public constructor() {
		super();
		// 皮肤名称
        this.skinName = "DialogSkin";
        this.touchChildren = true;
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapClose, this);
		this.backView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapClose, this);
	}

	private tapClose() {
		this.parent.removeChild(this);
	}
}