app.controller("newsDetailCtrl",function($scope,$routeParams,loadingPromp,AJAX,headerChanger){
    var ajax1=AJAX({
        url: APP_ACTION["newsDetailURl"] + $routeParams.newsId,
        cache: true,
        bCall: function () {
            loadingPromp.open("正在加载...");
        },
        sCall: function (d) {
            console.log(d);
            if(d.status == 'ok' && d.result[0]) {
                headerChanger.send({pageTitle: d.remark});
                $scope.newsDetail = d.result[0];
            
            }
        },
        cCall: function () {
            loadingPromp.close();
        }
    });

    $scope.$on('$destroy',function(e){
        ajax1.resolve();
    })
})
