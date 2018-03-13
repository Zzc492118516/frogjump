class PanelUtils {
	private _dialogText: string;

	private dialogPanel: Dialog;

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
}