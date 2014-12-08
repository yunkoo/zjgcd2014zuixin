app.controller("replyPostsCtrl",function($scope,AJAX,paginationServ,loadingPromp,$sessionStorage,$routeParams){
    $scope.imgURL=APP_ACTION['imgdir'];
    var postId = $routeParams.postId;
    var param = "";
    var paginal=7;/*每页多少条*/
    var ajaxquery=[];

    var getAct = function(pageNum) {
        var pageNum=pageNum || 1;
        if(postId == 1){
            param = "get_owner_posts/";
        } else if(postId == 2) {
            param = "get_join_posts/";
        }
        param += pageNum +"/"+paginal;

        var newajax=AJAX({
            url: APP_ACTION["postsURL"]+param,
            bCall:function(){loadingPromp.open('加载列表...')},
            sCall: function (d) {
                console.log(d);
                if(d.status == "ok" && d.result.length > 0) {
                    $scope.postlist= d.result;
                    if(('remark' in d) && d.remark.totalItem>=1 ){
                        var totalpage=Math.ceil(d.remark.totalItem/paginal);
                        paginationServ.setter($scope,pageNum,totalpage);
                    }
                }else{
                    $scope["noPosts" + postId]  = true;
                }
            },
            cCall: function () {
                loadingPromp.close();
            },
            eCall:function(){}
        });
        if(postId == 1){
            $sessionStorage.sendPostsCache={pageNum:pageNum};
        } else if(postId == 2) {
            $sessionStorage.replyPostsCache={pageNum:pageNum};
        }
        ajaxquery.push(newajax);
    }

    var getPostsCache = function(cache){
        if(angular.isDefined($sessionStorage[cache])){
            return $sessionStorage[cache]['pageNum'];
        } else {
            return null;
        }
    }

    $scope.$on('$pageNaved',(function(){
        var naved=false;
        return function(){
            if(naved){return}
            naved = true;
            var pageNum;
            if(postId == 1){
                pageNum = getPostsCache("sendPostsCache") || 1;
            } else if(postId == 2) {
                pageNum = getPostsCache("replyPostsCache") || 1;
            }
            getAct(pageNum);
        };

    })());



    $scope.$on('pagination',function(evt,o){
        /*被点击上一页或下一页事件*/
        if(o && o.where && o.curpageNum){
            var newPageNum= o.curpageNum;
            if(o.where=="next"){
                newPageNum++;
            }else if(o.where=="pre"){
                newPageNum--;
            }
            getAct(newPageNum);
        }
    });

    $scope.$on('$destroy',function(){
        paginationServ.toogle($scope,false);
        /*取消全部ajax*/
        angular.forEach(ajaxquery, function(ajaxobj){
            try{ajaxobj.resolve();}catch(e){}
        });

    })
})

