app.controller("barlistCtrl", function($scope,AJAX,alertBox,loadingPromp,$sessionStorage){

    $scope.imgURL=APP_ACTION['imgdir'];
    var newajax;
     var getList=function(pagenum){
         newajax=AJAX({
             url: APP_ACTION["forumURL"],
             cache: true,
             bCall:function(){loadingPromp.open('加载列表...')},
             sCall: function (d) {
                 if(d.status == "ok" && d.result.length > 0) {
                     $scope.barlist = d.result;

                     for(f in d.result){
                         var fobj=d.result[f];
                         $sessionStorage['forumlist'+fobj.fid]={
                             bg:$scope.imgURL+fobj.image || 'images/forumdefaultbg.jpg',
                             title:fobj.name || '帖子列表'
                         };
                     }

                 }
             },
             cCall: function () {
                 loadingPromp.close();
             },
             eCall:function(){
                 alertBox.show({
                     'where':document.getElementById('barAlert'),
                     'html':"链接错误，获取信息失败！",
                     'type':'danger'
                 });
             }
         });
     };

    getList(1);

    $scope.$on('$destroy',function(e){
        newajax.resolve();
    })
})
