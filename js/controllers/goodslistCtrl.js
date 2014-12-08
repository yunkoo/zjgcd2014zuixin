app.controller("goodslistCtrl", function($scope,$routeParams,loadingPromp,AJAX,alertBox,headerChanger){

    var goodslistId = $routeParams.goodslistId;
    $scope.imgdir = APP_ACTION.imgdir;
    var ajax1 = AJAX({
        url: APP_ACTION["goodslistURL"] + goodslistId,
        cache:true,
        bCall: function () {
            loadingPromp.open("正在获取商品列表...");
        },
        sCall: function (d) {
            if(d.status=="ok"){
                headerChanger.send({pageTitle: d.remark});
                //$scope.$emit('$headerChangeEvt',{pageTitle: d.remark})
                $scope.goodslist = d.result;

                if(d.result.length<=0){
                    alertBox.show({
                        'where':document.getElementById('glAlert'),
                        'html':"列表暂为空。",
                        'type':''
                    });
                }

            }else{
               alertBox.show({
                'where':document.getElementById('glAlert'),
                    'html':"数据传输错误！",
                    'type':'danger'
               });
            }
        },
        cCall: function () {
            loadingPromp.close();
        },
        eCall:function(){
            alertBox.show({
                'where':document.getElementById('glAlert'),
                'html':"获取商品列表失败！",
                'type':'danger'
            });
        }
    })

    $scope.$on('$destroy',function(e){
        try{ajax1.resolve();}catch(e){}
    })

})

