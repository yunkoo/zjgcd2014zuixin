app.controller("registerCtrl",function($scope,$http,loadingPromp,$timeout,alertBox,$navigate){
    var regForm,formdata,regAlert,ajax1;
    var changeBtn=function(text,bol){
        $scope.subBtn={isOff:bol,submitText:text};
    };
    $scope.regSubmit = function() {
        regForm = document.getElementById("regForm");
        formdata = new FormData(regForm);
//        loadingPromp.open("正在注册...");
        changeBtn("注册中",true);
        ajax1 = $http.post(APP_ACTION["registerURL"], formdata, {
            headers: { 'Content-Type': false },
            transformRequest: function(data) { return data; }
        }).success(function(d, status, headers, config){
                console.log(d);
                if(d && d.status == "ok"){
                    if(regAlert){
                        regAlert.change("注册成功","success");
                    } else {
                        regAlert = alertBox.show({
                            'where':document.getElementById('regAlert'),
                            'html':"注册成功！",
                            'type':'success',
                            "dismissable":false
                        });
                    }

                    $timeout(function(){
                        $navigate.go('/login',null,true);
                    },1000);
                } else if(d.status == "no"){
                    if(regAlert){
                        regAlert.change(d.result, "danger");
                    } else {
                        regAlert = alertBox.show({
                            'where':document.getElementById('regAlert'),
                            'html': d.result,
                            'type':"danger",
                            "dismissable":false
                        });
                    }
                }
//                loadingPromp.close();
                changeBtn("注册",true);
            }).error(function(data, status, headers, config) {
                if(regAlert){
                    regAlert.change(d.result, "danger");
                } else {
                    regAlert = alertBox.show({
                        'where':document.getElementById('regAlert'),
                        'html': "注册失败",
                        'type':"danger",
                        "dismissable":false
                    });
                }
//                loadingPromp.close();
                changeBtn("注册",true);
            });
    }

    $scope.pickImg = function(){
        $("#upload_avatar").click();
    }

    $scope.$on('$destroy',function(e){
        try{ajax1.resolve();}catch(e){}

    })

})


app.directive("file", function() {
    var f;
    return {
        scope: {
            file: '='
        },
        link: function(scope, element, attrs) {
            element.bind('change', function(event) {
                f = event.target.files[0];
                if(!f.type.match('image.*')){
                    return null;
                }
                var reader = new FileReader();
                reader.onload = function(e){
                    var DataURIScheme = this.result;
                    $("#head_portrait").attr("src", DataURIScheme);
//                    $("#imgSize").text(Math.ceil(f.size/1000) + "KB");
                }
                reader.readAsDataURL(f);
//                scope.$apply();
            })
        }

    }
})

