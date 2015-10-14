
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

})
    .directive('arrowFocusParent', function(){
        return{
            restrict:'A',
            controller:function($scope){

                //Here all the function or variables that will hold all the info about its children and will be help full to focus the childs according to the arrow key press.
            }
        };
    })
    .directive('arrowFocusChild', function(){
        return{
            restrict:'A',
            require:'^arrowFocusParent',
            link:function(scope, element, attrs,arrowFocusParent){

                element.on('focus', function(e){
                    //tell to parent using $rootScope.
                });
                element.on('keypress',function(e){
                    if (e.which == 39) {
                        // Right Arrow
                       //ask parent is there is a child in this direction, if so parent should return that child
                        //then focus that child
                    } else if (e.which == 37) {
                        // Left Arrow
                        //ask parent is there is a child in this direction, if so parent should return that child
                        //then focus that child
                    } else if (e.which == 38) {
                        // Up Arrow
                        //ask parent is there is a child in this direction, if so parent should return that child
                        //then focus that child
                    } else if (e.which == 40) {
                        // Down Arrow
                        //ask parent is there is a child in this direction, if so parent should return that child
                        //then focus that child
                    }
                });
            }
        };
    });