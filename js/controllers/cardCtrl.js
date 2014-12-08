app.controller("cardCtrl", function($scope,$navigate,$element){
    $scope.front=true;

    $scope.goin=function(bol){
        if(bol){
            $navigate.go('/info');
        }else{
            $navigate.go('/summary');
        }
    }

    $scope.$on('$destroy',function(e){
        $($element[0]).trigger('die');
    })

})