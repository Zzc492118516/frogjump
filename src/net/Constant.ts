// TypeScript file
class Constant {
    public static BASE_URL="47.97.35.54:8080/tiaotiao";
    /**
     * 用户标识
     */
    public static userIdUrl=Constant.BASE_URL+"/user/userinfo?username";
    /**
     * 使用道具
     */
    public static userpropUrl=Constant.BASE_URL+"/userprop/prop";
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
}