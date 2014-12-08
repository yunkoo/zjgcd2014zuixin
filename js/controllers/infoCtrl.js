app.controller("infoCtrl",function($scope,AJAX,alertBox,loadingPromp){
    $scope.imgdir = APP_ACTION.imgdir;
    var ajax1=AJAX({
        url: APP_ACTION["infoURL"],
        bCall: function () {
            loadingPromp.open("正在获取企业信息...");
        },
        sCall: function (d) {
            if(d.status == "ok") {
                $scope.companyInfo = d.result;
            }
        },
        cCall: function () {
            loadingPromp.close();
        },
        eCall:function(){
            alertBox.show({
                'where':document.getElementById('infoAlert'),
                'html':"获取企业信息失败！",
                'type':'danger'
            });
        }
    });

    $scope.$on('$destroy',function(e){
        try{ajax1.resolve()}catch(e){}
    })

})
