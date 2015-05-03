app.directives.directive('fields', function () {
    return {
        restrict: 'EA',
        transclude: true,
        template: "<div class='fields' ng-transclude></div>",
        controller: function ($scope, $attrs, $parse) {
            this.readOnly = $parse($attrs.readOnly);
        }
    }
});
app.directives.directive('field', ['$compile', function ($compile) {
    return {
        restrict: 'EA',
        require: ['^fields', 'ngModel'],
        scope: {
            ngModel: '=',
        },
        link: function (scope, elem, attr, ctrls) {

            var modelCtrl = ctrls[1];
            var fieldsCtrl = ctrls[0];
            var placeholder = elem.attr("placeholder");

            var textEl = angular.element("<span></span>");
            elem.append(textEl);

            elem.addClass("field");

            modelCtrl.$render = function () {
                var text = modelCtrl.$modelValue || placeholder;
                textEl.text(text);
            }


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
                elem.append(inputEl);

            }



        }
    }
}]);