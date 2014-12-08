app.controller("addnewcommCtrl",function($timeout,$scope,AJAX,$sessionStorage,goHome,alertBox,loadingPromp,$navigate,$routeParams){
    var ajaxlist=[]

    var tid=$routeParams['tid'];
    $scope.submittingText="";

    $scope.iscommenting=true;
    $scope.postPrams={
        message:(function(){
                return $sessionStorage.commentingPrefix || null;
        })()
    };



    $scope.sendnewPost=function(){

        var postingajax=AJAX({
            url: APP_ACTION["addcommentURL"]+tid,
            p:$scope.postPrams,
            method:"POST",
            cache: false,
            bCall:function(){
                $scope.submittingText="中...";
            },
            sCall: function (d) {
                $scope.submittingText="成功!";
                $timeout(function(){
                    if(!$navigate.back()){
                        $navigate.go('/','modal',true);
                    }
                },1000);
            },
            eCall:function(){
                $scope.submittingText="";
            },
            cCall:loadingPromp.close
        });

        ajaxlist.push(postingajax);

    }



    $scope.$on('$destroy',function(){
        /*取消全部ajax*/
        angular.forEach(ajaxlist, function(ajaxobj){
            try{ajaxobj.resolve();}catch(e){}
        });
    });



})