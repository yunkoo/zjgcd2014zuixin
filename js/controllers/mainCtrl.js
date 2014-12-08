app.controller("mainCtrl",function($scope,paginationServ,$navigate){



    /*pagination 开始*/
    $scope.$on('tooglePagination',function(evt,bol){
        if(bol && paginationServ.status==false){
            $scope.pagination={
                text:""
            };
            paginationServ.setCurPage(1);
            paginationServ.status==true;

            var disableAll=function(){
                var disableClassname="disable";
                $scope.pagination.prePagedisable=disableClassname;
                $scope.pagination.nextPagedisable=disableClassname;
            };
            disableAll();

            $scope.pagination.middleBtn=function(){
                $scope.$broadcast('middleBtn',{});

            };

            $scope.pagination.prePage=function(){
                if(!$scope.pagination.prePagedisable){
                    $scope.$broadcast('pagination',{
                        where:"pre",
                        curpageNum:paginationServ.getCurPage()
                    });
                    disableAll();
                }
            };
            $scope.pagination.nextPage=function(){
                if(!$scope.pagination.nextPagedisable){
                    $scope.$broadcast('pagination',{
                        where:"next",
                        curpageNum:paginationServ.getCurPage()
                    });
                    disableAll();
                }
            };

        }else{
            $scope.pagination=null;
            paginationServ.status==false;
        }

    });

    $scope.$on('changePaginationBtn',function(evt,o){
        if(!$scope.pagination){return}

        var disableClassname="disable";
        var changePagebtn=function(preornext,bol){
            var cname=disableClassname;
            if(bol){cname=null}
            if(preornext=="pre"){
                $scope.pagination.prePagedisable=cname;
            }else if(preornext=="next"){
                $scope.pagination.nextPagedisable=cname;
            }
        };

        if(o){
            if(typeof(o.pre)=="boolean"){
                changePagebtn("pre",o.pre);
            };
            if(typeof(o.next)=="boolean"){
                changePagebtn("next",o.next);
            };
        }else{
            console.log('changeBtn failed');
        }
    })

    $scope.$on('paginationSuccess',function(evt,o){
        if(!$scope.pagination){return}

        if(o && o.curPage && angular.isNumber(o.curPage)){
            paginationServ.setCurPage(o.curPage);
        }else{
            throw "curPage参数必须传入翻页成功后的页面数字";
        }


        if(o && o.changeText){
            $scope.pagination.text=o.changeText;
        }
        $scope.pagination.prePagedisable=null;
        $scope.pagination.nextPagedisable=null;

    });
    /*pagination 结束*/

    $scope.$on("$routeChangeError", function(event, current, previous, rejection) {
        if(rejection == "notlogin") {
            $navigate.go('/login','modal',false);
        }
    })
})