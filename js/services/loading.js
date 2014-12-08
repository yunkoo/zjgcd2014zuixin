//window.loadingPromp={
//    timmer:{
//        delay:0,
//        date:null,
//        timeoutId:null
//    },
//    target:(function(){
//        return document.getElementById('ajax-loading');
//    })(),
//    open: function (msg,delay) {
//        var self=this;
//        self.target.style.display='none';
//        if(delay!==0){
//            self.timmer.delay=delay||350;
//        }else{
//            self.timmer.delay=0;
//        }
//
//        var msg = msg || "...";
//        self.timmer.date=new Date();
//        clearTimeout(self.timmer.timeoutId);
//        self.timmer.timeoutId=setTimeout(function(){
//            self.target.getElementsByTagName('h1')[0].innerHTML=msg;
//            self.target.style.display='block';
//        },self.timmer.delay);
//    },
//    close: function () {
//        var self=this;
//        var cDate=new Date();
//        try{
//        if((cDate-self.timmer.date)<=self.timmer.delay){
//            clearTimeout(self.timmer.timeoutId);
//        }}catch(e){}
//        if(self.target && self.target.style){
//            self.target.style.display='none';
//        }
//    }
//};

app.factory('loadingPromp', function() {

    var timmer={
        delay:2900,
        date:null,
        timeoutId:null
    };
    var target=(function(){
        return document.getElementById('ajax-loading');
    })();

    return {
        open: function (msg,delay) {
            target.style.display='none';
            if(typeof(delay)!=='undefined'){
                timmer.delay=delay;
            }

            var msg = msg || "...";
            timmer.date=new Date();
            clearTimeout(timmer.timeoutId);
            timmer.timeoutId=setTimeout(function(){
                target.getElementsByTagName('h1')[0].innerHTML=msg;
                target.style.display='block';
            },timmer.delay);
        },
        close: function () {
            var cDate=new Date();
            try{
                if((cDate-timmer.date)<=timmer.delay){
                    clearTimeout(timmer.timeoutId);
                }}catch(e){}
            if(target && target.style){
                target.style.display='none';
            }
        }
    }
});
