app.controller("centerCtrl",function($scope,loadingPromp,AJAX,$navigate,$localStorage,$sessionStorage){
    var ajax1;

    $scope.$on('$pageNaved',(function(){
        var naved=false;
        return function(){
            if(naved){return}
            naved = true;

            $scope.imgdir =APP_ACTION.imgdir;
            ajax1=AJAX({
                url: APP_ACTION["centerURL"],
                bCall: function () {
//            loadingPromp.open("正在进入个人中心...");
                },
                sCall: function (d) {
                    if(d && d.status == "ok"){
                        $scope.user = d.result;
                        $scope.posts = d.remark;
                    }
                },
                cCall: function () {
//            loadingPromp.close();
                }
            });
        };

    })());



    var ajax2;
    $scope.logout = function() {
        ajax2=AJAX({
            url: APP_ACTION["logoutURL"],
            sCall: function (d) {
                console.log(d);
                if(d && d.status == "ok"){
                    delete $localStorage.userInfo;
                    $sessionStorage.$reset();
                    $navigate.go('/');
                }
            }
        });
    }
    
    $scope.$on('$destroy',function(e){
        try{
            ajax1.resolve();
            ajax2.resolve();
        }catch(e){}
    })
    
})
