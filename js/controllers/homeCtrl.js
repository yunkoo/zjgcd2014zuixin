app.controller("homeCtrl",function($scope,$localStorage,$http,headerChanger){
    var ajax1;
    var getCommentTip = function(){
        ajax1 = $http({
            method: 'GET',
            url: APP_ACTION["commentTipURL"]
        }).success(function(d) {
            if(d && d.status=="ok"){
                var commentTipNum = d.result.alertmessage;
                if(commentTipNum > 0){
                    $scope.commentTipNum = commentTipNum;
                    $scope.hasNewComment =true;
                }
            }

        })
    };

    if(angular.isDefined($localStorage.userInfo)){
        getCommentTip();
    }


    $scope.$on('$pageNaved',(function(){
        var naved=false;
        return function(){
            if(naved){return}
            naved=true;
            headerChanger.send({pageTitle: '昌达实业'});
        };
    })());

    $scope.$on('$destroy',function(e){
        try{ajax1.resolve()}catch(e){}
    })

})
