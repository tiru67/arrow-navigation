
var press = angular.module('Press',[]);

press.controller('searchController',function($scope,$http,$rootScope,$document){

    $scope.images = [];
    $scope.keyword="avatar";
    $scope.data=null;
    $scope.images=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

   /* $scope.submit= function(){

        if($scope.keyword!==null && $scope.keyword!=="" && typeof $scope.keyword !=="undefined"){
            $http({
                method:"GET",
                header:{
                    accept:"application/json"
                },
                url:"http://api.ap.org/v2/search/photo",
                params:{
                    apikey:"AsGd3Ib2TXOfkPL3idZ24LO0vB7ksrHa",
                    q:$scope.keyword
                }
            })
                .success(function(data){
                    $scope.data=data;
                    if(data.entries && data.entries.length){
                        $scope.images =[];
                        for(var i=0;i<data.entries.length;i++){
                            if(data.entries[i].contentLinks[0].href.indexOf('http://bapi.ap.org')!==-1) {
                                $scope.images.push(data.entries[i].contentLinks[0].href);
                                console.log(data.entries[i].contentLinks[0].href);
                            }
                        }
                    }
                })
                .error(function(data){
                    console.log("Error")
                });
        }
    };*/

    //$scope.submit();
    $rootScope.ctrlState=false;
   /* $rootScope.$watch('ctrlState',function(newVal,oldVal){
        $rootScope.$broadcast('ctrlState-changed');
    });
*/
  /*  $scope.openLink = function(url){
        window.open(url+'&apikey=AsGd3Ib2TXOfkPL3idZ24LO0vB7ksrHa','_blank');
    };*/


    $document.on('keydown', function(e){
        if (e.which == 39 || e.which == 37) {
            // left or right Arrow
           // console.log(document.querySelector(":focus"));
          /*  if(children.indexOf(document.activeElement)===-1){
                document.getElementById('parent').firstElementChild.focus();
            }*/

            var parent =  document.getElementById('parent');

            if(parent.innerHTML.indexOf(document.activeElement.innerHTML)===-1){
                document.getElementById('parent').firstElementChild.focus();
            }
        }

    });

    $scope.$on('$destroy', function(e){
        $document.on('keydown', function(e){

        });

    });

})
    .directive('arrowFocusChild', function($rootScope){
        return{
            restrict:'A',
            scope:{
                isSelected:'='
            },
            link:function(scope, element, attrs){
                scope.isSelected=false;
                element.on('keyup',function(e){
                    if(e.which==17){ //ctrl key on windows.
                        scope.$applyAsync(function(){
                            $rootScope.ctrlState=false;
                        });
                    }
                    if(e.which===91){ // command key on mac
                        scope.$applyAsync(function(){
                        $rootScope.ctrlState=false;});
                    }
                });

                element.on('keydown',function(e){

                    console.log(document.activeElement);

                    if (e.which == 39) {
                        // Right Arrow
                        if(element[0].nextElementSibling){
                            element[0].nextElementSibling.focus();
                        }


                    } else if (e.which == 37) {
                        // Left Arrow
                        if(element[0].previousElementSibling) {
                            element[0].previousElementSibling.focus();
                        }
                    }

                    if(e.which===91 || e.which===17){
                        $rootScope.ctrlState=true;
                    }

                });

                //element.on('blur', function(e){
                //    scope.$applyAsync(function(){
                //        if(!$rootScope.ctrlState) {
                //            scope.isSelected = false;
                //        }
                //    });
                //
                //});
                scope.$on('image-focused',function(e, args){

                    if(args.element[0]!==element[0]){
                        if(!$rootScope.ctrlState) {
                            scope.isSelected = false;
                        }
                    }
                });

                element.on('focus', function(e){

                    scope.$applyAsync(function(){
                        scope.isSelected = true;
                        if(!$rootScope.ctrlState) {
                            $rootScope.$broadcast('ctrlState-changed');
                        }
                        $rootScope.$broadcast('image-focused',{element:element});
                    });
                });

                scope.$on('ctrlState-changed', function(e){
                    if(!$rootScope.ctrlState && element[0]!==document.activeElement) {
                            scope.isSelected = false;
                    }
                });
            }
        };
    })

.directive('parentContainer', function($rootScope){
        return{
            restrict:'A',
            link:function(scope, elm, atr){
                elm.on('focusin', function(e){
                 //   console.log(e);
                });
            }
        };
    });
