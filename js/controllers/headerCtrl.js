app.controller("headerCtrl",function($scope,$rootScope,$navigate,headerBtnServ){

    var headerCollapse=$("#my_headerCollapse");
    $rootScope.$on("$routeChangeStart",function(){
        try{
            headerCollapse.addClass('noTransition');
            headerCollapse.collapse('hide');
            setTimeout(function(){headerCollapse.removeClass('noTransition');},450);
        }catch(e){}
    });


    var curPageRole=null;
    $scope.$on("$pageNaved",function(angularEvent,navHistory,curRoute,preRoute){

        if(!curRoute.$$route){
            return
        }

        curPageRole=curRoute.$$route['pageRole'];


        $scope.tt.pTitle=curRoute.$$route['pageTitle'];
        if(curPageRole=="nav0"){/*是主页*/
            navHistory=$navigate.eraseHistory('page',curRoute);
        }
        var l=navHistory.length;
        var pre=navHistory[l-2];
        if(pre){
            if(curPageRole=="login"){
                $scope.tt.bTitle="首页";
            }else{
                $scope.tt.bTitle=pre[1].$$route['pageTitle'];
            }
        }else{
            $scope.tt.bTitle=null;
        }


        $scope.navActiveClass=[];
        (function(role){
            if(!role){return}
            var num = (role.replace('nav', ""))*1;
            if(typeof(num)=="number"){
                $scope.navActiveClass=[];
                $scope.navActiveClass[num]="active";
            }
        })(curPageRole);
    });

    $scope.$on("$headerChangeEvt",function(angularEvt,o){
        if(o && o.pageTitle){
            $scope.tt.pTitle= o.pageTitle;
        }
        if(o && o.backTitle){
            $scope.tt.bTitle= o.backTitle;
        }

    });

    $scope.$on("$changeHeaderCusBtn",function(angularEvt,html){
        /*修改头部右边按钮*/
        if(html){
            $scope.customHeaderBtn=html;
        }else{
            $scope.customHeaderBtn=null;
        }
    });

    $scope.customBtnClicked=function($event){
        headerBtnServ.clicked($event);
    }

    $scope.historyBack=function(){
        if(curPageRole=="login"){
            $navigate.go('/','modal',true);
        }else{
            $navigate.back(true);
        }

    }






})
