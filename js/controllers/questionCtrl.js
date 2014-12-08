app.controller("questionCtrl",function($scope,loadingPromp,AJAX){
    var ajax1=AJAX({
        url: APP_ACTION["questionURL"],
        cache: true,
        bCall: function () {
            loadingPromp.open("正在获取信息...");
        },
        sCall: function (d) {
            console.log(d);
            if(d.status == 'ok' && d.result.length > 0) {
                $scope.questions = d.result;
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
