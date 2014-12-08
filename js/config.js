var APP_ACTION = {
    imgdir:IMG_SERVER_ROOT+'uploads/',
    commentTipURL: SERVER + "/Community/get_remind", /*消息提示*/
    goodsURL : SERVER + '/Product_category/get_all',
    goodslistURL : SERVER + '/Product/get_by_category/', /*商品列表*/
    goodsDetailURL : SERVER + '/Product/get_detail/',   /*商品详情*/
    infoURL : SERVER + '/Company/getcompany',  /*企业信息*/
    summaryURL: SERVER + '/Company/summary/',/*企业概况*/
    newsURL: SERVER + '/Article/', /*新闻资讯*/
    newsDetailURl: SERVER + '/Article/get_articlecontent/',  /*新闻详情*/
    knowledgeURL: SERVER + '/Article/get_ylz_knowledge/', /*行业知识*/
    questionURL: SERVER + '/Faq/get_questions', /*疑问解答*/
    registerURL: SERVER + '/User/register',  /*注册*/
    loginURL: SERVER + '/User/login', /*登录*/
    logoutURL: SERVER + '/User/logout', /*退出*/
    centerURL: SERVER + '/User/get_info', /*获取用户信息*/
    forumURL:SERVER + '/Community/getforum', /*互动版块列表*/
    newpostURL:SERVER+'/Community/edit_post',/*发表新帖*/
    getpostsURL:SERVER+'/Community/get_post/', /*帖子列表*/
    postviewURL:SERVER+'/Community/get_post_content/',/*帖子内容*/
    addcommentURL:SERVER+'/Community/add_comment/',/*发表回帖*/
    getcommentURL:SERVER+'/Community/get_comments/',/*回帖列表*/
    postsURL: SERVER + '/Community/' /*发过的帖子和回复的帖子*/
};

var isAndroid=(function(){
    return navigator.userAgent.indexOf("Android") > 0;
})();

