app.controller("goodsCtrl", function($scope,loadingPromp,AJAX,alertBox){
    var ajax1=AJAX({
        url: APP_ACTION["goodsURL"],
        cache:true,
        bCall: function () {
            loadingPromp.open("正在加载...");
        },
        sCall: function (d) {
            $scope.products = d;
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

    $scope.$on('$destroy',function(e){
         try{ajax1.resolve();}catch(e){}
    })
})
