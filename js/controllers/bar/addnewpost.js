app.controller("addnewpostCtrl",function($timeout,$scope,AJAX,goHome,alertBox,loadingPromp,$navigate,$routeParams){
    var ajaxlist=[]

    var fid=$routeParams['fid'];
    $scope.submittingText="";

    $scope.postPrams={
        forumSelect:{fid:fid,name:"发表到父级分类"}
    }

    var getbarListAjax=AJAX({
        url: APP_ACTION["forumURL"],
        cache: false,
        bCall:function(){},
        sCall: function (d) {
            var findForumIndex=function(list,fid){
                var index=0;
                for(i in list){
                     if(list[i] && list[i].fid==fid){
                         index=i;
                         break;
                     }
                 };
                return index;
            }
            if(d.status == "ok" && d.result.length > 0) {
                $scope.barlist = d.result;
                $scope.postPrams.forumSelect=$scope.barlist[findForumIndex($scope.barlist,fid)];
            }
        }
    });
    ajaxlist.push(getbarListAjax);


    $scope.sendnewPost=function(){
        var p=$scope.postPrams;
        p.fid=$scope.postPrams.forumSelect.fid;
        delete p.forumSelect;

        if(!angular.isObject(loginAlertMsg)){
            var loginAlertMsg = alertBox.show({
                'where':document.getElementById('loginAlert'),
                "dismissable":false,
                "html": ""
            });
        }
        var postingajax=AJAX({
            url: APP_ACTION["newpostURL"],
            p:p,
            method:"POST",
            cache: false,
            bCall:function(){
                $scope.submittingText="中...";
                loginAlertMsg.change("正在提交..","info");
            },
            sCall: function (d) {
                console.log(d);
                if(d.status=="ok"){

                    $timeout(function(){
                        if(!$navigate.back()){
                            $navigate.go('/','modal',true);
                        }
                    },1000);
                    loginAlertMsg.change("发表成功!","success");
                    $scope.submittingText="成功";
                }else{
                    $scope.submittingText="";
                    loginAlertMsg.change(d.result,"danger");
                }
            },
            eCall:function(){
                $scope.submittingText="";
                loginAlertMsg.change("发表失败","danger");
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