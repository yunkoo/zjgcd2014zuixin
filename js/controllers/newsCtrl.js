app.controller("newsCtrl",function($scope,AJAX,paginationServ,alertBox,loadingPromp,$sessionStorage){
    $scope.news = {};
    var paginal=7;/*每页多少条*/

    var ajaxquery=[];

    var getAct = function(catIndex,pageNum) {

        $scope.news.newscatIndex=catIndex;
        var pageNum=pageNum || 1;
        var param = '';
        if(catIndex == 1) {
            param = "get_industry_news/"+pageNum+"/"+paginal;
        } else if(catIndex == 2) {
            param = "get_company_news/"+pageNum+"/"+paginal;
        }

        var newajax=AJAX({
            url: APP_ACTION["newsURL"]+param,
            cache: true,
            bCall:function(){loadingPromp.open('加载列表...')},
            sCall: function (d) {
                if(d.status == "ok" && d.result.length > 0) {
                    $scope.newsList = d.result;
                    if(('totalItem' in d.remark) && d.remark['totalItem'] >=1){
                       var totalpage=Math.ceil(d.remark['totalItem']/paginal);
                        paginationServ.setter($scope,pageNum,totalpage);
                    }
                }else{
                    $scope["noNews" + catIndex]  = true;
                }
            },
            cCall: function () {
                loadingPromp.close();
            },
            eCall:function(){
                alertBox.show({
                    'where':document.getElementById('statusAlert'),
                    'html':"链接错误，获取信息失败！",
                    'type':'danger'
                });
            }
        });
        $sessionStorage.newsListViewCache={catIndex:catIndex,pageNum:pageNum};
        ajaxquery.push(newajax);

    }

    /*页面启动*/
    $scope.$on('$pageNaved',(function(){
        var naved=false;
        return function(){
            if(naved){return}
            naved = true;
            var catIndex= 1;
            var pageNum=1;
            if(angular.isDefined($sessionStorage.newsListViewCache)){
                catIndex=$sessionStorage.newsListViewCache['catIndex'] || 1;
                pageNum=$sessionStorage.newsListViewCache['pageNum'] || 1;
            }
            getAct(catIndex,pageNum);
        };
    })());


    $scope.getContent = function(index) {
        var changeTab=function(i){
            if(i>$scope.news.newscatIndex){
                $scope.animateType={enter: 'slide2left-enter', leave: 'slide2left-leave'};
            }else{
                $scope.animateType={enter: 'slide2right-enter', leave: 'slide2right-leave'};
            }
        };
        paginationServ.toogle($scope,false);
        changeTab(index);
        getAct(index,1);

    }



    $scope.$on('pagination',function(evt,o){
        /*被点击上一页或下一页事件*/
        if(o && o.where && o.curpageNum){

            var newPageNum= o.curpageNum;
            if(o.where=="next"){
                newPageNum++;
            }else if(o.where=="pre"){
                newPageNum--;
            }
            getAct($scope.news.newscatIndex,newPageNum);
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
