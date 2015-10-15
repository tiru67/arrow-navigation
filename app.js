
var press = angular.module('Press',[]);

press.controller('searchController',function($scope,$http){

    $scope.images = [];
    $scope.keyword="avatar";
    $scope.data=null;
    $scope.submit= function(){

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
    };

    $scope.submit();

    $scope.openLink = function(url){
        window.open(url+'&apikey=AsGd3Ib2TXOfkPL3idZ24LO0vB7ksrHa','_blank');
    };

})
    .directive('arrowFocusChild', function(){
        return{
            restrict:'A',
            link:function(scope, element, attrs,arrowFocusParent){

                element.on('focus', function(e){
                    //tell to parent using $rootScope.
                });
                element.on('keydown',function(e){
                    if (e.which == 39) {
                        // Right Arrow
                        element[0].nextElementSibling.focus();

                    } else if (e.which == 37) {
                        // Left Arrow
                        element[0].previousElementSibling.focus();
                    }else if(e.which==13){
                        //on enter execute the open link function.
                      scope.openLink(scope.image);
                    }
                });

                element.on('blur', function(e){
                    element.removeClass('selected');
                });
                element.on('focus', function(e){
                    element.addClass('selected');
                });
            }
        };
    })

.directive('parentContainer', function(){
        return{
            restrict:'A',
            link:function(scope, elm, atr){

                elm.on('focusout', function(e){

                    console.log(e);
                });
            }
        };
    });