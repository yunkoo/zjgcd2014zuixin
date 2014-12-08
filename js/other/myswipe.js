var myswipe=function(o){
    /*
    jqo:Object;
    touchMovingCall:function(moveX);
     touchEndCall:function(result,d-value);
    actThreshold:number;
    XThreshold:number;
    */

    if(!o.jqo){throw 'define a jQueryObject first!';return}
    var targetObj= o.jqo;

    var touchEndCall= o.touchEndCall || null;
    var touchMoveingCall= o.touchMovingCall || null;

    var transformProp = "transform" in document.documentElement.style ? "transform" : "webkitTransform";

    var touchstartEvt="touchstart";
    var touchmoveEvt="touchmove";
    var touchendEvt="touchend";
//    if (window.navigator.msPointerEnabled) {
//        touchstartEvt="MSPointerDown";
//        touchmoveEvt="MSPointerMove";
//        touchendEvt="MSPointerUp";
//    }


    var threshold= o.threshold || 150;

    var touching=false;/*触摸开始*/
    var swiping=false;/*真的在滑，不是向下拖*/

    var startTouchpageX=0;var startTouchpageY=0;

    var XThreshold= o.XThreshold||30;

    var getPage =function(event, page) {
        return event.changedTouches ? event.changedTouches[0][page] : event[page];
    }

    var tStartCall=function(e){

        touching=true;
        startTouchpageX=getPage(e,'pageX');
        startTouchpageY=getPage(e,'pageY');
    };
    var tMoveCall=function(e){
        if(!touching){return}

        var moveX= (getPage(e,'pageX'))-startTouchpageX;
        var moveY= (getPage(e,'pageY'))-startTouchpageY;

        if(Math.abs(moveX)-Math.abs(moveY)>=XThreshold || swiping==true){
            swiping=true;
            this.style[transformProp]='translate3d('+moveX+'px,0,0)';
            if(touchMoveingCall && typeof(touchMoveingCall)=='function'){
                touchMoveingCall(moveX);
            }
        }
    };
    var tEndCall=function(e){
        if(!touching){return}
        touching=false;
         if(!swiping){
             return
         }else{
             swiping=false;
         }

        var endTouchpageX=getPage(e,'pageX');

        var dValue=endTouchpageX-startTouchpageX;
        if(touchEndCall && typeof(touchEndCall)=='function'){
            var result='none';
            if(Math.abs(dValue)>threshold){
                if(dValue>0){
                    result='pre';
                }else{
                    result='next';
                }
            };
            this.style[transformProp]=null;
            touchEndCall(result,dValue,this);
        }

    };

    targetObj.addEventListener(touchstartEvt,tStartCall,false);
    targetObj.addEventListener(touchmoveEvt,tMoveCall,false);
    targetObj.addEventListener(touchendEvt,tEndCall,false);

//    targetObj.on(touchstartEvt,tStartCall);
//    targetObj.on(touchmoveEvt,tMoveCall);
//    targetObj.on(touchendEvt,tEndCall);

    return{
        dom:targetObj,
        touching:touching,
        off:function(){
            targetObj.removeEventListener(touchstartEvt,tStartCall);
            targetObj.removeEventListener(touchmoveEvt,tMoveCall);
            targetObj.removeEventListener(touchendEvt,tEndCall);
        }
    }

}
//var transformProp = "transform" in document.documentElement.style ? "transform" : "webkitTransform";
//var touching=false;
//var threshold=150;
//var startTouchpageX=0;
//var targetObj=$("#tabcWrap");
//targetObj.on('touchstart',function(e){
//    touching=true;
//    startTouchpageX=e.changedTouches[0].pageX;
//})
//targetObj.on('touchmove',function(e){
//    if(!touching){return}
//    var moveX= (e.changedTouches[0].pageX)-startTouchpageX+'px';
//    this.style[transformProp]='translate3d('+moveX+',0,0)';
//});
//targetObj.on('touchend',function(e){
//    touching=false;
//    var endTouchpageX=e.changedTouches[0].pageX;
//    this.style[transformProp]=null;
//    var dValue=endTouchpageX-startTouchpageX;
//    if(Math.abs(dValue)>threshold){
//        if(dValue>0){
//            console.log(dValue,'pre');
//        }else{
//            console.log(dValue,'next');
//        }
//    }
//})