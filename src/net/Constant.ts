// TypeScript file
class Constant {
    public static BASE_URL="http://sgame.51changmi.cn/tiaotiao";    /**
     * 用户标识
     */
    public static userIdUrl=Constant.BASE_URL+"/user/userinfo";
    /**
     * 使用道具
     */
    public static userpropUrl=Constant.BASE_URL+"/userprop/operation";
    /**
     * 使用体力
     */
    public static useractiveUrl=Constant.BASE_URL+"/useractive/active";
    /**
     * 点击图鉴获取最高分数
     */
    public static achievmentsUrl=Constant.BASE_URL+"/userachievements/achievments";
    /**
     * 上传分数  
     */
    public static addAchievmentsUrl=Constant.BASE_URL+"/userachievements/addAchievments";
    /**
     * 排行榜 
     */
    public static userListUrl=Constant.BASE_URL+"/user/userList";
    /**
     * 买复活 
     */
    public static buyResurrection=Constant.BASE_URL+"/userprop/BuyResurrection";
    /**
     * 买体力 
     */
    public static buyActive=Constant.BASE_URL+"/useractive/buyActive";
}