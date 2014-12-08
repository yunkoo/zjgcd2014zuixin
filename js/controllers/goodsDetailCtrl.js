app.controller("goodsDetailCtrl", function($scope,loadingPromp,headerChanger,alertBox,$routeParams,AJAX,$sessionStorage){
    var goodsId = $routeParams.goodsId;
    var all_imgURL = [];
    $scope.imgdir =APP_ACTION.imgdir;

    var ajax1;

    $scope.$on('$pageNaved',(function(){
        var naved=false;
        return function(){
            if(naved){return}
            naved=true;
            ajax1=AJAX({
                url: APP_ACTION["goodsDetailURL"] + goodsId,
                bCall: function () {
                    loadingPromp.open("正在获取商品信息...");
                },
                sCall: function (d) {
                    console.log(d);
                    if(d.status=="ok"){
                        var r = d["result"][0];
                        $scope.goodsDetail = r;
                        $sessionStorage.morePicCache=r.all_img;
                        var customer = d.remark.map(function(ele){
                            return "QQ:"+ele;
                        });
                        $scope.customer = customer.join("<br />");
                    }
                },
                cCall: function () {
                    loadingPromp.close();
                },
                eCall:function(data,status, headers, config){
                    var gdAlert=document.getElementById('gdAlert');
                    if(status){
                        var q=alertBox.show({
                            'where':gdAlert,
                            'html':"服务器通讯错误！",
                            'type':'danger'
                        });
                    }else{
                        var q=alertBox.show({
                            'where':gdAlert,
                            'html':"超时！",
                            'type':'danger'
                        });
                    }
                }
            });
        };
    })());

    $scope.$on('$destroy',function(e){
        try{ajax1.resolve();}catch(e){}
    })
})

