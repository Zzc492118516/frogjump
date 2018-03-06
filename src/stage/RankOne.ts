class RankOne extends eui.ItemRenderer{
	    
    public rankNum:eui.Label;
    public userName:eui.Label;
    public score:eui.Label;
    
    public constructor() {
        super();
        // 皮肤名称
        this.skinName = "RankOneSkin";
        this.touchChildren = true;
    }
    
    public dataChanged():void{
        // 将数据对应到组件上
        this.rankNum.text = this.data.rankNum;
        this.userName.text = this.data.userName;
        this.score.text = this.data.score;
    }
    
}