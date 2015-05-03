app.directives.directive('autoExpand', function () {
    return {
        restrict: 'A',
        priority: 10,
        require: ['^ngModel'],
        link: function (scope, element, attrs, ctrls) {
            var ngModel = ctrls[0];

            var $shadow = angular.element('<div></div>');

            var placeholder = element.attr("placeholder");

            var update = function () {
                var val = element.val() || placeholder || "";
                $shadow.html(val);
                var ch = (val.match(/ /g) || []).length;
                var width = $shadow[0].offsetWidth + (ch * 4) + 10;
                element.css('width', width + 'px');
            }

            element.bind('keyup keypress change', update);

            scope.$watch(function () {
                return ngModel.$viewValue;
            }, function (newValue) {
                update();
            });

            angular.element(document.body).append($shadow);

            setTimeout(function () {
                $shadow.css({
                    position: 'absolute',
                    opacity: 0,
                    fontSize: element.css('fontSize'),
                    fontFamily: element.css('fontFamily')
                });

                update();
            }, 300);

            scope.$on('$destroy', function () {
                $shadow.remove();
            });
        }
    }

});