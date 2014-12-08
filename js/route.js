app.config(function($routeProvider) {
        $routeProvider
            .when("/addnewcomment:tid", {
                templateUrl: "content/bar/addnewpost.html",
                pageTitle:"写回复",
                controller:'addnewcommCtrl',
                transition: "modal",
                resolve: validateLogin
            })
            .when("/addnewpost:fid", {
                templateUrl: "content/bar/addnewpost.html",
                pageTitle:"写帖子",
                controller:'addnewpostCtrl',
                transition: "modal",
                resolve: validateLogin
            })
            .when("/postview/:postid", {
                templateUrl: "content/bar/postview.html",
                pageTitle:"看帖子"
            })
            .when("/postsList/:fid", {
                templateUrl: "content/bar/postlist.html",
                pageTitle:"帖子列表"
            })
            .when("/barList", {
                templateUrl: "content/bar/barlist.html",
                pageRole:"nav4",
                pageTitle:"板块分类"
            })
            .when("/goods", {
                templateUrl: "content/goods.html",
                pageRole:"nav2",
                pageTitle:"产品分类"
            })
            .when("/goodslist/:goodslistId", {
                templateUrl: "content/goodslist.html",
                pageTitle:"产品列表"
            })
            .when("/goodsDetail/:goodsId", {
                templateUrl: "content/goodsDetail.html",
                pageTitle:"产品详情"

            })
            .when("/morePic", {
                templateUrl: "content/morePic.html",
                pageTitle:"产品图片",
                transition: "modal"
            })
            .when("/companycard", {
                templateUrl: "content/companyCard.html",
                pageTitle:"企业名片",
                transition: "slide"
            })
            .when("/info", {
                templateUrl: "content/info.html",
                pageTitle:"企业简介",
                transition: "slide"
            })
            .when("/news", {
                templateUrl: "content/news.html",
                pageTitle:"新闻列表",
                transition: "slide"
            })
            .when("/newsDetail/:newsId", {
                templateUrl: "content/newsDetail.html",
                transition: "slide",
                pageRole:"nav3",
                pageTitle:"新闻内容"
            })
            .when("/knowledge", {
                templateUrl: "content/knowledge.html",
                pageTitle:"行业知识",
                transition: "slide"
            })
            .when("/summary", {
                templateUrl: "content/summary.html",
                pageTitle:"企业概况",
                pageRole:"nav1",
                transition: "slide",
                reverse: false
            })
            .when("/question", {
                templateUrl: "content/question.html",
                pageTitle:"疑问解答",
                transition: "slide",
                reverse: false
            })
            .when("/login:code", {
                templateUrl: "content/login.html",
                pageTitle:"登录",
                transition: "modal",
                pageRole:"login"
            })
            .when("/register", {
                templateUrl: "content/register.html",
                pageTitle:"注册",
                transition: "modal"
            })
            .when("/center", {
                templateUrl: "content/center.html",
                pageTitle:"个人中心",
                transition: "slide",
                resolve: validateLogin
            })
            .when("/replyPosts/:postId", {
                templateUrl: "content/bar/replyPosts.html",
                pageTitle:"我的发表",
                transition: "slide",
                controller:'replyPostsCtrl',
                resolve: validateLogin
            })
            .when("/sendPosts/:postId", {
                templateUrl: "content/bar/sendPosts.html",
                pageTitle:"我的回复",
                transition: "slide",
                controller:'replyPostsCtrl',
                resolve: validateLogin
            })
            .when("/", {
                templateUrl: "content/home.html",
                pageRole:"nav0",
                pageTitle:"首页"
            })
            .otherwise({
                redirectTo: "/"
            });
    })

var validateLogin = {
    storge: function($q,$localStorage) {
        var deferred = $q.defer();
        if($localStorage.userInfo){
            deferred.resolve();
        }else{
            deferred.reject("notlogin");
        };
        return deferred.promise;
    }
};
