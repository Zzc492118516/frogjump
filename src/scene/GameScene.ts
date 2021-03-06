class GameScene extends eui.Component implements eui.UIComponent {
	public bg: eui.Image;
	public blockPanel: eui.Group;
	// 玩家
	public player: eui.Image;


	// 基础数据
	private maxScale = 1;
	private minScale = 1;
	private minDistance = 220;
	private maxDistance = 360;
	private anchorOffset = 100;
	// 跳跃动画移动间隔
	private moveInterval = 500;
	// 游戏结束面板
	public overPanel: eui.Group;
	// 使用复活卡面板
	public usePropPanel: eui.Group;

	// 连续中央位置次数
	private centerCount = 0;
	// 连续使用复活卡次数
	private propUseCount = 1;
	// 游戏中得分
	private score = 0;
	// 游戏中得分面板;
	public scoreLabel: eui.Label;
	// 游戏结束面板得分
	public overScoreLabel: eui.Label;
	// 游戏结束最高分面板
	public highestLabel: eui.Label;
	// 你的排名
	public yourRankBtn: eui.Button;
	// 再来一局
	public restart: eui.Button;
	// 返回菜单
	public gotoMainBtn: eui.Button;
	// 复活按钮
	public yesBtn: eui.Button;
	public noBtn: eui.Button;
	// 排行榜
	public rankList: eui.List;
	// 复活卡剩余数量
	public propNumLabel: eui.Label;
	// 复活卡本次使用数量
	public usePropNumLabel: eui.Label;

	// tanθ角度值
	public arrayRatio: number = 0.556047197640118;
	// cos角度的值
	private cosRatio: number = 0.87397586206141;
	// 初始速度
	private initSpeed = 150;
	// 
	public speed: number = 0;
	// 
	public power: number = 600;
	// 跳的距离
	public jumpDistance: number = 0;

	// 下一个盒子方向(1靠右侧出现/-1靠左侧出现)
	public direction: number = 1;
	// 下一个盒子出现时,小人的落脚点重新规划
	// 左侧跳跃点
	private leftOrigin = { "x": 180, "y": 350 };
	// 右侧跳跃点
	private rightOrigin = { "x": 580, "y": 350 };

	//上一个盒子
	private lastBlock: eui.Image;

	// 当前的盒子
	private currentBlock: eui.Image;

	// 所有方块资源的数组
	private blockSourceNames: Array<string> = [];
	// 所有方块的分数数组
	private blockScore: Array<number> = [];
	// 记录下一个方块类型
	private blockType: number;
	// 所有方块的数组
	private blockArr: Array<eui.Image> = [];
	// 所有回收方块的数组
	private reBackBlockArr: Array<eui.Image> = [];
	// 图鉴解锁所需分数数组
	private picScoreArray:Array<number>;
	// 判断是否是按下状态
	private isReadyJump = false;
	// 落脚点
	private targetPos: egret.Point;
	// 按下的音频
	private pushVoice: egret.Sound;
	// 按下音频的SoundChannel对象
	private pushSoundChannel: egret.SoundChannel;
	// 弹跳的音频
	private jumpVoice: egret.Sound;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
		this.reset();
	}
	private init() {
		this.blockSourceNames = ["block-1_png", "block-2_png", "block-3_png", "block-4_png"];
		this.blockScore = [1, 1, 1, 2];
		this.picScoreArray = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900];
		// 初始化音频
		this.pushVoice = RES.getRes('push_mp3');
		this.jumpVoice = RES.getRes('jump_mp3');

		// 添加触摸事件
		this.blockPanel.touchEnabled = true;
		this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onKeyDown, this);
		this.blockPanel.addEventListener(egret.TouchEvent.TOUCH_END, this.onKeyUp, this);
		// 绑定结束按钮
		this.restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
		this.gotoMainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnMain, this);
		this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tryResurgence, this);
		this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.failureJudge, this);
		// 设置玩家的锚点
		// 设置锚点
		this.player.anchorOffsetX = this.player.width / 2;
		this.player.anchorOffsetY = this.player.height - 20;
		// 心跳计时器
		egret.Ticker.getInstance().register(function (dt) {
			dt /= 1000;
			if (this.isReadyJump && this.jumpDistance <= 900) {
				this.jumpDistance += 300 * dt;
			}
		}, this)
	}
	// 重置游戏
	public reset() {
		// 清空舞台
		this.blockPanel.removeChildren();
		this.blockArr = [];
		this.centerCount = 0;
		this.propUseCount = 1;
		// 添加一个方块
		let blockNode = this.createBlock();
		blockNode.touchEnabled = false;
		// 设置方块的起始位置
		blockNode.x = 200;
		blockNode.y = this.height / 2 + blockNode.height;
		this.currentBlock = blockNode;
		// 摆正小人的位置
		this.player.y = this.currentBlock.y;
		this.player.x = this.currentBlock.x;
		this.blockPanel.addChild(this.player);
		this.direction = 1;
		// 摆正小人转向
		this.player.scaleX = 1;
		// 添加积分
		this.blockPanel.addChild(this.scoreLabel);
		// 添加下一个方块
		this.addBlock();
	}
	// 添加一个方块
	private addBlock() {
		// 随机一个方块
		let blockNode = this.createBlock();
		// 设置位置
		let distance = this.minDistance + Math.random() * (this.maxDistance - this.minDistance);
		if (this.direction > 0) {
			blockNode.x = this.currentBlock.x + distance;
			blockNode.y = this.currentBlock.y - distance * this.arrayRatio;
		} else {
			blockNode.x = this.currentBlock.x - distance;
			blockNode.y = this.currentBlock.y - distance * this.arrayRatio;
		}
		this.lastBlock = this.currentBlock;
		this.currentBlock = blockNode;
	}

	// 按下
	private onKeyDown() {
		// 播放按下的音频
		this.pushSoundChannel = this.pushVoice.play(0, 1);
		// 变形
		egret.Tween.get(this.player).to({
			scaleY: 0.5
		}, 3000)

		this.isReadyJump = true;
	}
	// 放开
	private onKeyUp() {
		// 判断是否是在按下状态
		if (!this.isReadyJump) {
			return;
		}
		// 声明落点坐标
		if (!this.targetPos) {
			this.targetPos = new egret.Point();
		}
		// 立刻让屏幕不可点,等小人落下后重新可点
		this.blockPanel.touchEnabled = false;
		// 停止播放按压音频,并且播放弹跳音频
		this.pushSoundChannel.stop()
		this.jumpVoice.play(0, 1);
		// 清楚所有动画
		egret.Tween.removeAllTweens();
		this.blockPanel.addChild(this.player);
		// 结束跳跃状态
		this.isReadyJump = false;
		// 落点坐标
		this.targetPos.x = this.player.x + this.jumpDistance * this.direction;
		// 根据落点重新计算斜率,确保小人往目标中心跳跃
		this.targetPos.y = this.player.y + this.jumpDistance * (this.currentBlock.y - this.player.y) / (this.currentBlock.x - this.player.x) * this.direction;
		// 执行跳跃动画
		egret.Tween.get(this).to({ factor: 1 }, 500).call(() => {
			this.player.scaleY = 1;
			this.speed = 0;
			this.jumpDistance = 0;
			// 判断跳跃是否成功
			this.judgeResult();
		});
		// 执行小人空翻动画
		this.player.anchorOffsetY = this.player.height / 2;

		egret.Tween.get(this.player).to({ rotation: this.direction > 0 ? -60 : 60 }, 250).call(() => {

		}).call(() => {
			egret.Tween.get(this.player).to({ rotation: this.direction > 0 ? 60 : -60 }, 200).call(() => {

			}).call(() => {
				egret.Tween.get(this.player).to({ rotation: 0 }, 50).call(() => {
					this.player.rotation = 0;
				}).call(() => {
					this.player.anchorOffsetY = this.player.height - 20;
				});
			});
		});


	}
	private judgeResult() {
		if (Math.pow(this.lastBlock.x - this.player.x, 2) + Math.pow(this.lastBlock.y - this.player.y, 2) >= 72 * 72) {
			// 根据this.jumpDistance来判断跳跃是否成功
			if (Math.pow(this.currentBlock.x - this.player.x, 2) + Math.pow(this.currentBlock.y - this.player.y, 2) <= 72 * 72) {
				// 更新积分
				if (Math.pow(this.currentBlock.x - this.player.x, 2) + Math.pow(this.currentBlock.y - this.player.y, 2) <= 10 * 10) {
					this.centerCount++;
					this.score += 2 * this.centerCount;
				} else {
					this.centerCount = 0;
					this.score+=this.blockScore[this.blockType];
				}
				this.scoreLabel.text = this.score.toString();
				// 随机下一个方块出现的位置
				this.direction = Math.random() > 0.5 ? 1 : -1;
				// 小人是否要换方向
				this.player.scaleX = this.direction == 1 ? 1 : -1;
				// 当前方块要移动到相应跳跃点
				var blockX, blockY;
				blockX = this.direction > 0 ? this.leftOrigin.x : this.width - 135;
				blockY = this.height / 2 + this.currentBlock.height;
				// 小人要移动到的点.
				var playerX, PlayerY;
				playerX = this.player.x - (this.currentBlock.x - blockX);
				PlayerY = this.player.y - (this.currentBlock.y - blockY);

				// x/y轴分别移动的距离
				egret.Tween.get(this.currentBlock).to({
					x: blockX,
					y: blockY
				}, this.moveInterval)
				// 更新页面
				this.update(this.currentBlock.x - blockX, this.currentBlock.y - blockY);
				// 更新小人的位置
				egret.Tween.get(this.player).to({
					x: playerX,
					y: PlayerY
				}, this.moveInterval).call(() => {
					// 开始创建下一个方块
					this.addBlock();
					// 让屏幕重新可点;
					this.blockPanel.touchEnabled = true;
				})
				// console.log('x' + x);
				console.log(this.currentBlock.x);
			} else {
				// 失败,弹出重新开始的panel
				console.log('游戏失败!');
				// 弹出提示框请求使用复活
				if (UserUtils.getInstance().getOwnUser().propNum >= this.propUseCount) {
					this.usePropPanel.visible = true;
					this.propNumLabel.text = UserUtils.getInstance().getOwnUser().propNum + "";
					this.usePropNumLabel.text = "-" + this.propUseCount;
				} else {
					this.failureJudge();
				}
			}
		} else {
			// 让屏幕重新可点;
			this.blockPanel.touchEnabled = true;
		}
	}

	// 尝试复活
	private tryResurgence() {
		var params:any = "username="+egret.localStorage.getItem("username")+"&"+"num="+this.propUseCount;
		NetController.getInstance().postData(Constant.userpropUrl, params, function(data){
			let response = JSON.parse(data.response);
			if (response.code == "1"){
				// 使用复活成功，继续
				this.player.x = this.lastBlock.x;
				this.player.y = this.lastBlock.y;
				this.blockPanel.touchEnabled = true;
				UserUtils.getInstance().getOwnUser().propNum = UserUtils.getInstance().getOwnUser().propNum - this.propUseCount;
				this.propUseCount++;
				this.usePropPanel.visible = false;
			}else {

			}
        }, this);
	}

	// 确认失败后上传数据并刷新界面
	private failureJudge() {
		this.usePropPanel.visible = false;
		// 获取排行榜数据
		if (!this.rankList) {
			this.rankList = new eui.List();
        	this.addChild(this.rankList);
		}
		var params:any = "username="+egret.localStorage.getItem("username");
        NetController.getInstance().postData(Constant.userListUrl, params, function(data){
			let response = JSON.parse(data.response);
			if (response.code == "1"){
				this.rankList.dataProvider = new eui.ArrayCollection(response.data);
				this.rankList.itemRenderer = RankOne;
				this.yourRankBtn.label = "你的排名是" + (response.ranking > 999 ? "999" : response.ranking) + "名";
			}else {
				
			}
        }, this);

		var params_1:any = "username="+egret.localStorage.getItem("username")+"&"+"mark="+this.score.toString();
		NetController.getInstance().postData(Constant.addAchievmentsUrl, params_1, function(data){
			let response = JSON.parse(data.response);
			if (response.code == "1"){
				this.overPanel.visible = true;
				this.overScoreLabel.text = this.score.toString();
				this.highestLabel.text = "历史最高：" + response.data;
				for (var i = 0; i < this.picScoreArray.length; i++) {
					if (response.data < this.picScoreArray[i]) {
						break;
					}
					if (response.data >= this.picScoreArray[i] && UserUtils.getInstance().getOwnUser().userMark < this.picScoreArray[i]) {
						PanelUtils.getInstance().showDialog("妈耶！解锁图鉴了！");
						break;
					}
					
				}
			}else {
				
			}
        }, this);
	}


	//添加factor的set,get方法,注意用public  
	public get factor(): number {
		return 0;
	}
	//计算方法参考 二次贝塞尔公式  
	public set factor(value: number) {
		this.player.x = (1 - value) * (1 - value) * this.player.x + 2 * value * (1 - value) * (this.player.x + this.targetPos.x) / 2 + value * value * (this.targetPos.x);
		this.player.y = (1 - value) * (1 - value) * this.player.y + 2 * value * (1 - value) * (this.targetPos.y - 300) + value * value * (this.targetPos.y);

		// this.player.x = (1 - value) * (1 - value) * this.player.x + 2 * value * (1 - value) * (this.player.x + this.targetPos.x) / 2 + value * value * (this.currentBlock.x);
		// this.player.y = (1 - value) * (1 - value) * this.player.y + 2 * value * (1 - value) * (this.targetPos.y - 300) + value * value * (this.currentBlock.y);
	}
	// 工厂方法,创建一个方块
	private createBlock(): eui.Image {
		var blockNode = null;
		if (this.reBackBlockArr.length) {
			// 回收池里面有,则直接取
			blockNode = this.reBackBlockArr.splice(0, 1)[0];
		} else {
			// 回收池里面没有,则重新创建
			blockNode = new eui.Image();
		}
		// 使用随机背景图
		this.blockType = Math.floor(Math.random() * (this.blockSourceNames.length - 0.5));
		console.log(this.blockType);
		
		blockNode.source = this.blockSourceNames[this.blockType];
		this.blockPanel.addChild(blockNode); 
		// 设置缩放
		let scale = this.minScale;
		blockNode.scaleX = blockNode.scaleY = scale;
		// 设置方块的锚点
		blockNode.anchorOffsetX = blockNode.width / 2;
		blockNode.anchorOffsetY = blockNode.height / 2 - 20;
		// 把新创建的block添加进入blockArr里
		this.blockArr.push(blockNode);
		return blockNode;
	}
	// 清理方法,用来判断方块是否已经超出屏幕,是的话则进入回收数组
	private update(x, y) {
		for (var i: number = 0; i < this.blockArr.length; i++) {
			var blockNode = this.blockArr[i];
			if (blockNode.x + 135 <= 0 && blockNode.y - 78 >= this.height) {
				// 方块超出屏幕,从显示列表中移除
				this.blockPanel.removeChild(blockNode);
				this.blockArr.splice(i, 1);
				// 添加到回收数组中
				this.reBackBlockArr.push(blockNode);
			} else {
				// 对不是当前的方块进行移位
				if (blockNode == this.currentBlock) {
					continue;
				}
				// 没有超出屏幕的话,则移动
				egret.Tween.get(blockNode).to({
					x: blockNode.x - x,
					y: blockNode.y - y
				}, this.moveInterval)
			}
		}
	}
	// 尝试重新一局
	private restartGame() {
		var params:any = "username="+egret.localStorage.getItem("username");
        NetController.getInstance().postData(Constant.useractiveUrl, params, function(data){
			let response = JSON.parse(data.response);
			if (response.code == "1"){
				this.restartHandler();
			}else {
				PanelUtils.getInstance().showDialog("妈耶！没体力了！");
			}
        }, this);
	}
	// 重新一局
	private restartHandler() {
		// 隐藏结束场景
		this.overPanel.visible = false;
		// 置空积分
		this.score = 0;
		this.scoreLabel.text = this.score.toString();
		// 开始防止方块
		this.reset();
		// 游戏场景可点
		this.blockPanel.touchEnabled = true;
	}
	private returnMain() {
		// 重置属性
		this.restartHandler();
		// 返回菜单
		SceneManger.getInstance().changeScene('menuScene');
	}
}