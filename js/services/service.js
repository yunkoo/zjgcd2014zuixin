app.factory('headerChanger', function($rootScope){
    return {
        send:function(o){
            $rootScope.$broadcast("$headerChangeEvt",o);
        }
    };
});

app.factory('alertBox', function(){
    return {
        show:function(o){
//            html,type,dismissable,where
//            type: 'danger' 'info' 'success'
            if(o && o.where){
                var html= o.html || "";
                if('innerHTML' in o.where){
                    var newdom=document.createElement("DIV");
                }else{return false;}

                newdom.className='alert ';
                if(o.dismissable!==false){
                    newdom.className+='alert-dismissable ';
                    newdom.innerHTML='<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
                }
                o.type= o.type || 'warning';
                if(o.type){
                    newdom.className+='alert-'+ o.type+' ';
                }
                newdom.innerHTML+='<span class="alertText">'+html+'</span>';
                o.where.appendChild(newdom);
                o.dom=newdom;

                var returnObj={
                    change:function(text,type){
                        var self=this;
                        var dommy=self.getprop('dom');

                        var changeprop=function(key,val){
                            if(key=='html'){
                                dommy.getElementsByClassName('alertText')[0].innerHTML=val;
                            }
                            if(key=='type'){
                                var oldclass='alert-'+self.getprop('type');
//                                console.log(oldclass);
//                                var reg=new RegExp(/(?:^|\s)+oldclass+(?!\S)/g);
//                                dommy.className.replace(reg,'alert-'+val);
                                try{
                                dommy.classList.remove(oldclass);
                                dommy.classList.add('alert-'+val);
                                }catch(e){}
                            }
                            o[key]=val;
                        }

                        if(angular.isString(text)){
                            changeprop('html',text);
                        }
                        if(angular.isString(type)){
                            changeprop('type',type);
                        }
                    },
                    hide:function(){
                        var thedom=this.getprop('dom');
                        try{
                            thedom.parentNode.removeChild(thedom);
                        }catch(e){}

                    },
                    getprop:function(str){
                        return o[str];
                    }
                }
                return returnObj;
            }
        }
    };
});


app.factory('paginationServ', function(){
    /*依赖关系： mainCtrl.js -> pagination*/
    var curPage=0;
    return {
        status:false,/*显示状态*/
        changePagebtn:function(scope,o){
            scope.$emit('changePaginationBtn',o);
        },
        toogle:function(scope,bol){
            scope.$emit('tooglePagination',bol);
        },
        fliped:function(scope,obj){
            scope.$emit('paginationSuccess',obj);
        },
        setCurPage:function(num){
            if(angular.isNumber(num) && num >0){
                curPage=num;
            }
        },
        getCurPage:function(){
            return curPage;
        },
        setter:function(scope,pNum,tNum,customText){
            var self=this;
            var setting=function(){
                var cpage=self.getCurPage();

                if(cpage>=1 && cpage<=tNum){
                    /*举例：翻页完成后启用上一页，禁用下一页，修改里面的字为2/5*/
                    self.fliped(scope,{
                        changeText:customText || cpage+"/"+tNum,
                        curPage: cpage
                    });
                }
                if(cpage<=1){
                    self.changePagebtn(scope,{"pre":false});
                    self.setCurPage(1);
                }else{
                    self.changePagebtn(scope,{"pre":true});
                }
                if(cpage>=tNum){
                    self.changePagebtn(scope,{"next":false});
                    self.setCurPage(tNum);
                }else{
                    self.changePagebtn(scope,{"next":true});
                }

            }
            self.toogle(scope,true);
            self.setCurPage(pNum);
            setting();
        }
    };
});

app.factory('headerBtnServ', function($rootScope){
    return {
        set:function(html){
            $rootScope.$broadcast('$changeHeaderCusBtn',html);
        },
        clicked:function(evt){
            $rootScope.$broadcast('$HeaderBtnClicked',evt);
        }
    }
})



app.factory('AJAX', function($http,$q,$navigate,$localStorage,$sessionStorage){
    /*url p bCall sCall eCall*/
    var send=function(o){

        var canceler = $q.defer();

        var sendmethod=o.method || "GET";
        if(typeof(o.bCall)=="function"){o.bCall();}

        var httpPatams={
            cache: o.cache||false
        };
        httpPatams.url= o.url;
        httpPatams.method =sendmethod;
        if(sendmethod=="GET"){
            httpPatams.params=o.p || {};
        }else{
            httpPatams.data=o.p || null;
        };

        /*设定超时*/
        httpPatams.timeout= o.timeout || canceler.promise || 15000;

        $http(httpPatams).success(function(data, status, headers, config){
            if(typeof(o.sCall)=="function"){
                o.sCall(data,status, headers, config);
            };
            if(typeof(o.cCall)=="function"){
                o.cCall(data,status, headers, config);
            };
        }).error(function(data,status, headers, config){
                if(typeof(o.eCall)=="function"){
                    o.eCall(data,status, headers, config);
                };
                if(typeof(o.cCall)=="function"){
                    o.cCall(data,status, headers, config);
                };
                if (status == 401) {
                    try{
                        delete $localStorage.userInfo;
                        $sessionStorage.$reset();
                    }catch(e){};
                    $navigate.go('/login'+status,'modal',true);
                }
            });

        return canceler;
    };
    return send;
});

app.factory('goHome', function($location,$navigate){
    return function(){
        $location.path('/').replace();
        $navigate.go('/');
    }
})