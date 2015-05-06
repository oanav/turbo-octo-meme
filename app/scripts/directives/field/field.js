'use strict';

app.directives.directive('fields', function () {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        template: "<div class='fields' ng-transclude></div>",
        controller: function ($scope, $attrs, $parse) {
            this.readOnly = $parse($attrs.readOnly)($scope);
        }
    };
});
app.directives.directive('field', ['$compile', '$filter', function ($compile, $filter) {
    return {
        restrict: 'EA',
        require: ['^fields', 'ngModel'],
        scope: {
            ngModel: '=',
            filter: '@'
        },
        link: function (scope, elem, attr, ctrls) {
            var modelCtrl = ctrls[1];
            var fieldsCtrl = ctrls[0];
            var placeholder = elem.attr("placeholder");

            var textEl = angular.element("<span></span>");
            elem.append(textEl);

            elem.addClass("field");
            var filterName, filterParam;
            if (scope.filter) {
                var fs = scope.filter.split(':');
                filterName = fs[0];
                filterParam = fs[1];
            }
            modelCtrl.$render = function () {
                if (textEl.css('opacity') == "0") { 
                     textEl.text(modelCtrl.$modelValue);
                    return; 
                }
                var text = modelCtrl.$modelValue || placeholder;
                if (modelCtrl.$modelValue && scope.filter) {
                    var filterVal = $filter(filterName)(modelCtrl.$modelValue, filterParam);
                    text = filterVal;
                    modelCtrl.$setViewValue(filterVal);
                }
                textEl.text(text);
            };

            if (!fieldsCtrl.readOnly) {
                var inputEl = angular.element("<input type='text' ng-model='ngModel' />");

                elem.on("click", function () {
                    textEl.css({ opacity: 0 });
                    inputEl.show();
                    inputEl.focus();
                    scope.$apply();
                });

                inputEl.on("blur", function () {
                    textEl.css({ opacity: 1 });
                    modelCtrl.$render();
                    inputEl.hide();
                });

                setTimeout(function () {
                    inputEl.css({
                        display: 'none',
                        fontSize: elem.css('fontSize'),
                        fontFamily: elem.css('fontFamily')
                    });
                }, 300);

                var $input = $compile(inputEl)(scope);
                elem.append($input);
            }
        }
    };
}]);