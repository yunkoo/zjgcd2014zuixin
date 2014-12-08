app.controller("postviewCtrl",function($scope,$routeParams,loadingPromp,$sessionStorage,AJAX,$navigate){
    var postid=$routeParams['postid'];
    $scope.imgURL=APP_ACTION.imgdir;
    $scope.postinfo={};

    var ajaxquery=[];

    $scope.loadmore={
        commentCurPage:1,
        isloading:false,
        paginal:5,/*每页多少*/
        standbyText:'点击载入更多'
    }
    var commentCurPage=1;


    $scope.trueComments=[];
    var getComments=function(tid,pagenum){
        if($scope.loadmore.isloading){return};
        var ajaxmore=AJAX({
            url:APP_ACTION.getcommentURL+tid+'/'+pagenum+"/"+$scope.loadmore.paginal,
            bCall:function(){
                $scope.loadmore.isloading=true;
                $scope.loadmore.standbyText="载入中";
            },
            sCall: function (d) {
                if(d.status == "ok") {
                    console.log(d.result.length);
                    var resultLen=d.result.length;
                    if(resultLen>=$scope.loadmore.paginal){
                        $scope.loadmore.standbyText="点击载入更多";
                    }else{
                        $scope.loadmore.standbyText="没有更多了";
                    };
                    if(resultLen>0){
                        commentCurPage=pagenum;
                        $scope.trueComments=$scope.trueComments.concat(d.result);
                    }
                }else{
                    $scope.loadmore.standbyText="出错，请重试";
                }
            },
            cCall: function () {
                $scope.loadmore.isloading=false;
                loadingPromp.close();
            },
            eCall:function(){
                $scope.loadmore.standbyText="出错，请重试";
            }
        });

        ajaxquery.push(ajaxmore);

    };

    $scope.loadmore.Act=function(){
        getComments(postid,commentCurPage+1);
    }

    var ajax1=AJAX({
        url:APP_ACTION['postviewURL']+String(postid),
        bCall:function(){loadingPromp.open('加载内容...')},
        sCall: function (d) {
            if(d.status == "ok") {
                $scope.postinfo= d.result;
                getComments(postid,commentCurPage);
            }
        },
        cCall: function () {
            loadingPromp.close();
        },
        eCall:function(){}
    });
    ajaxquery.push(ajax1);


    $scope.comment=function(tid,name,quote){
        console.log(tid,name);
        if(!name){
            delete $sessionStorage.commentingPrefix;
        }else{
            if(!quote){
                $sessionStorage.commentingPrefix="回复："+name+" : ";
            }else{
                $sessionStorage.commentingPrefix="引用"+name+":--“ "+quote+" ”";
            }


        }
        $navigate.go('/addnewcomment'+tid);
    };

    $scope.$on('$destroy',function(){
        /*取消全部ajax*/
        angular.forEach(ajaxquery, function(ajaxobj){
            try{ajaxobj.resolve();}catch(e){}
        });

    })



})
