
var press = angular.module('Press',[]);

press.controller('searchController',function($scope,$http,$rootScope,$document){

    $scope.images = [];
    $scope.keyword="avatar";
    $scope.data=null;
    $scope.images=[{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false},{isSelected:false}];

    $scope.isSelectedCount =  function(images){
        var selectedCount = 0;
        angular.forEach(images, function(image){
            if(image.isSelected){
                selectedCount++;
            }
        });
        return selectedCount;
    };

    $rootScope.ctrlState=false;


    $document.on('keydown', function(e){
        if (e.which == 39 || e.which == 37) {
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
                var isToggled = false;
                scope.selectDirection = "RIGHT";
                scope.isDirectionChanged = false;
                var updateDirection = function(direction){
                    scope.$applyAsync(function() {
                        scope.selectDirection = direction;
                    });
                };
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

                    //console.log(document.activeElement);

                    if (e.which == 39) {
                        // Right Arrow
                        if(element[0].nextElementSibling){
                            updateDirection('RIGHT');
                            element[0].nextElementSibling.focus();
                        }


                    } else if (e.which == 37) {
                        // Left Arrow
                        if(element[0].previousElementSibling) {
                            updateDirection('LEFT');
                            element[0].previousElementSibling.focus();
                        }
                    }

                    if(e.which===91 || e.which===17){
                        $rootScope.ctrlState=true;
                    }

                });

                element.on('focus', function(e){
                    scope.$applyAsync(function(){
                        scope.isSelected = !scope.isSelected;
                        $rootScope.$broadcast('update-state',{element:element});
                    });
                    isToggled = true;
                });

                element.on('mousedown', function(e){
                    isToggled = false;
                });

                element.on('click', function(e){
                    if(!isToggled){
                        scope.$applyAsync(function(){
                            scope.isSelected = !scope.isSelected;
                        });
                    }
                });

                scope.$on('update-state', function(e,args){
                    if(!$rootScope.ctrlState && element!==args.element) {
                            scope.isSelected = false;
                    }
                });

                scope.$watch('selectDirection', function(newVal, oldVal){

                    console.log(newVal);
                });
            }
        };
    });