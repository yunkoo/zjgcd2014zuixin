app.controller("morePicCtrl", function($scope,$window,$timeout,$sessionStorage){
    var imgdir =APP_ACTION.imgdir;
    var picArr = $sessionStorage.morePicCache;

    var newPicArr = picArr.map(function(ele){
        return  {img: imgdir + ele};
    });
    if(newPicArr.length <= 1){
        $scope.newPicArr = newPicArr;
    } else {
        $scope.newPicArr = newPicArr.concat(newPicArr);
    }



    $scope.$on('$pageNaved',(function(){
        var naved=false;
        return function(){
            if(naved || newPicArr.length<=1){return}
            naved=true;

            if(CardView){
                $timeout(function(){
                    var deck = new CardView('#wrapper', {
                        effect: 'slide',
                        direction: 'v',
                        onUpdateContent: function (el, newPicArr) {
//                el.querySelector('img').src = newPicArr.img;
                        }
                    });
                }, 200);
            };

            document.getElementById("morePic").addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        };

    })());


    $scope.$on('$destroy',function(e){
        delete window.CardView;
    });


})

