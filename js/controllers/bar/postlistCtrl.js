app.controller("postlistCtrl",function($scope,$routeParams,$sessionStorage,loadingPromp,AJAX,$navigate,paginationServ){
    var fid=$routeParams['fid'];

    var ajaxquery=[];

    paginationServ.toogle($scope,true);
    var newpostHtml="<span class='glyphicon glyphicon-edit'></span>";

    $scope.$on('middleBtn',function(){
        /*点了中间的按钮*/
        $navigate.go('/addnewpost'+fid);
    });

    /*设定背景*/
    var foruminfo=$sessionStorage['forumlist'+fid];
    var forumbg=foruminfo.bg || 'images/forumdefaultbg.jpg';
    $scope.forumTitle=foruminfo.title || null;

    $scope.forumbgStyle={'backgroundImage':'url('+forumbg+')'};
    $scope.imgURL=APP_ACTION['imgdir'];
    var paginal=10;/*每页多少条*/
    var getList=function(pagenum){
        var ajax1=AJAX({
            url: APP_ACTION["getpostsURL"]+fid+"/"+pagenum+"/"+paginal,
                cache: false,
                bCall:function(){loadingPromp.open('加载列表...')},
                sCall: function (d) {
                    if(d.status=="ok"){
                        console.log(d);
                        $scope.postlist= d.result;
                        if(('totalItem' in d.remark) && d.remark['totalItem']>=1 ){
                            var totalpage=Math.ceil(d.remark['totalItem']/paginal);
                            paginationServ.setter($scope,pagenum,totalpage,newpostHtml);
                            setTimeout(setParallax,1);
                        }
                    }else{

                    }

            },
            cCall: function () {
                loadingPromp.close();
            },
            eCall:function(){}
        });
        ajaxquery.push(ajax1);

    };
    paginationServ.setter($scope,1,1,newpostHtml);
    getList(1);


    $scope.$on('pagination',function(evt,o){
        /*被点击上一页或下一页事件*/
        if(o && o.where && o.curpageNum){
            var newPageNum= o.curpageNum;
            if(o.where=="next"){
                newPageNum++;
            }else if(o.where=="pre"){
                newPageNum--;
            };

            getList(newPageNum);
        }
    });


    var parallaxed=false;
    var setParallax=function(){
        if(parallaxed || isAndroid){return}
        (function(window,$){
            var boxObj=$("#forumbgBlock");
            if(boxObj && boxObj[0].style){
                var boxstartHeight=boxObj.height(); /*开始高度*/
                var boxbgStartY=0;
                var boxstartOpacity=1;
                var CONV=boxstartHeight/15 || 14;
                var boxbgEndY=-CONV*5;/*结束高度*/
                var boxendOpacity=0;


                var maxScroll=boxstartHeight || CONV*8;


                $("#postlistContent").on('scroll',function(e){
                    var scrollTop=this.scrollTop;

                    if(scrollTop<maxScroll){
                        var percent=scrollTop/maxScroll;

                        var getNowValue=function(startv,endv,percent){
                            return startv-((startv-endv)*percent);
                        }

                        var boxbgnowY=getNowValue(boxbgStartY,boxbgEndY,percent);
                        var boxnowOpacity=getNowValue(boxstartOpacity,boxendOpacity,percent);

                            boxObj[0].style.backgroundPosition='50% '+boxbgnowY+'px';
                            boxObj[0].style.opacity=boxnowOpacity;
                    }

                });
            }

        })(window,$)

        parallaxed=true;
    };


    $scope.$on('$destroy',function(){
        paginationServ.toogle($scope,false);
        /*取消全部ajax*/
        angular.forEach(ajaxquery, function(ajaxobj){
            try{ajaxobj.resolve();}catch(e){}
        });
    })


})