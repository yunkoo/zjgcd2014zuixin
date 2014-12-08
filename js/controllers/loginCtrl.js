app.controller("loginCtrl",function($scope,AJAX,loadingPromp,alertBox,goHome,$timeout,$localStorage,$navigate,$routeParams){
    var ajax1, p, loginAlertMsg, loginAlert;
    $scope.form = {};
    $scope.form.rememberPsw = true; //默认记住密码


    $scope.$on('$pageNaved',(function(){
        var naved=false;
        return function(){
            loginAlert = document.getElementById('loginAlert');
            if(naved){return}
            if(angular.isDefined($routeParams.code)){
                if($routeParams.code==401){
                    loginAlertMsg = alertBox.show({
                        'where': loginAlert,
                        "dismissable":false,
                        "type":"danger",
                        "html": "您尚未登录或账号已过期！"
                    });
                }
            }
            naved=true;
        };

    })());

    var changeBtn=function(text,bol){
        $scope.subBtn={isOff:bol,submitText:text};
    };

    var userLoginInfo = $localStorage.userLoginInfo;
    if(angular.isObject(userLoginInfo)){
        $scope.form.user_name = userLoginInfo.user_name;
        $scope.form.user_password = userLoginInfo.user_password;
    }

    $scope.sendForm = function(){
       if(!angular.isObject(loginAlertMsg)){
           loginAlertMsg = alertBox.show({
               'where':loginAlert,
               "dismissable":false,
               "html": ""
           });
       }
       if($scope.form.user_name == undefined || $scope.form.user_password == undefined){
           loginAlertMsg.change("请输入账号和密码!","danger");
           return;
       }
       p = {
           'user_name':$scope.form.user_name,
           'user_password':$scope.form.user_password
       }
       ajax1 = AJAX({
           url: APP_ACTION["loginURL"],
           p: p,
           method: "POST",
           bCall: function () {
//               loadingPromp.open("正在登录...");
               changeBtn("登录中",true);
           },
           sCall: function (d) {
               if(typeof(d)=="object" && d.status == "ok"){
                   loginAlertMsg.change("登录成功","success");
                   changeBtn("登录成功",true);
                   if($scope.form.rememberPsw){ //记住密码时存储用户信息
                       $localStorage.userLoginInfo = p;
                   } else {
                       $localStorage.userLoginInfo = "";
                   }
                   $localStorage.userInfo = p;
                   $timeout(function(){
                       loginAlertMsg.hide();
                       $navigate.go('/','modal',true);
                   },1000);
               } else {
                   loginAlertMsg.change(d.result,"danger");
                   changeBtn("登录",false);
               }
           },
           cCall: function () {
//               loadingPromp.close();
           },
           eCall:function(){
               loginAlertMsg.change("登录失败！","danger");
               changeBtn("登录",false);
           }
       })
    }

    $scope.$on('$destroy',function(e){
        try{ajax1.resolve();}catch(e){}
    })
})
