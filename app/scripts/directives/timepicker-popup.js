'use strict';

app.directives.directive('timepickerPopup', ['$compile', '$parse', '$document', '$position', 'dateFilter', 'dateParser',
function ($compile, $parse, $document, $position, dateFilter, dateParser) {
    return {
        restrict: 'EA',
        priority: 100,
        require: 'ngModel',
        scope: {
            isOpen: '=?',
        },
        link: function (scope, element, attrs, ngModel) {

            scope.time = new Date();

            // popup element used to display calendar
            var popupEl = angular.element('<div class="dropdown-menu" datepicker-popup-wrap ><div timepicker></div></div>');
            popupEl.attr({
                'ng-model': 'time',
                'ng-change': 'timeChanged()'
            });

            function cameltoDash(string) {
                return string.replace(/([A-Z])/g, function ($1) { return '-' + $1.toLowerCase(); });
            }

            // timepicker element
            var timepickerEl = angular.element(popupEl.children()[0]);
            scope.timepickerOptions = {};
            if (attrs.timepickerOptions) {
                scope.timepickerOptions = scope.$parent.$eval(attrs.timepickerOptions);
                angular.forEach(scope.timepickerOptions, function (value, option) {
                    timepickerEl.attr(cameltoDash(option), value);
                });
            }

            // Inner change
            scope.timeChanged = function (value) {
                if (angular.isDefined(value)) {
                    scope.time = value;
                }
                scope.updateElement();
            };

            element.bind('change keyup', function () {
                scope.$apply(function () {
                    scope.time = parseTime(ngModel.$modelValue);
                });
            });

            element.bind('blur', function () {
                scope.$apply(function () {
                    scope.setTime(ngModel.$modelValue);
                });
            });

            scope.setTime = function (time) {
                if (!time) {
                    return;
                }

                var timeArray,
                    hour,
                    minute,
                    second,
                    meridian;

                if (typeof time === 'object' && time.getMonth) {
                    //date object
                    hour = time.getHours();
                    minute = time.getMinutes();
                    second = time.getSeconds();

                    if (scope.timepickerOptions.showMeridian) {
                        meridian = 'AM';
                        if (hour > 12) {
                            meridian = 'PM';
                            hour = hour % 12;
                        }

                        if (hour === 12) {
                            meridian = 'PM';
                        }
                    }
                } else {
                    if (time.match(/p/i) !== null) {
                        meridian = 'PM';
                    } else {
                        meridian = 'AM';
                    }

                    time = time.replace(/[^0-9\:]/g, '');

                    timeArray = time.split(':');

                    hour = timeArray[0] ? timeArray[0].toString() : timeArray.toString();
                    minute = timeArray[1] ? timeArray[1].toString() : '';
                    second = timeArray[2] ? timeArray[2].toString() : '';

                    // proofing
                    if (hour.length > 4) {
                        second = hour.substr(4, 2);
                    }
                    if (hour.length > 2) {
                        minute = hour.substr(2, 2);
                        hour = hour.substr(0, 2);
                    }
                    if (minute.length > 2) {
                        second = minute.substr(2, 2);
                        minute = minute.substr(0, 2);
                    }
                    if (second.length > 2) {
                        second = second.substr(2, 2);
                    }

                    hour = parseInt(hour, 10);
                    minute = parseInt(minute, 10);
                    second = parseInt(second, 10);

                    if (isNaN(hour)) {
                        hour = 0;
                    }
                    if (isNaN(minute)) {
                        minute = 0;
                    }
                    if (isNaN(second)) {
                        second = 0;
                    }

                    if (scope.timepickerOptions.showMeridian) {
                        if (hour < 1) {
                            hour = 1;
                        } else if (hour > 12) {
                            hour = 12;
                        }
                    } else {
                        if (hour >= 24) {
                            hour = 23;
                        } else if (hour < 0) {
                            hour = 0;
                        }
                        if (hour < 13 && meridian === 'PM') {
                            hour = hour + 12;
                        }
                    }

                    if (minute < 0) {
                        minute = 0;
                    } else if (minute >= 60) {
                        minute = 59;
                    }

                    if (scope.timepickerOptions.showSeconds) {
                        if (isNaN(second)) {
                            second = 0;
                        } else if (second < 0) {
                            second = 0;
                        } else if (second >= 60) {
                            second = 59;
                        }
                    }
                }

                var date = scope.time || new Date();
                date.setHours(hour);
                date.setMinutes(minute);
                date.setSeconds(second);
                scope.time = date;

                scope.updateElement();
            };

            function parseTime(viewValue) {
                if (!viewValue) {
                    ngModel.$setValidity('time', true);
                    return null;
                }
                else {
                    if (angular.isString(viewValue)) {
                        var time = dateParser.parse(viewValue, 'shortTime');
                        if (isNaN(time)) {
                            ngModel.$setValidity('time', false);
                            return undefined;
                        } else {
                            ngModel.$setValidity('time', true);
                            return time;
                        }
                    } else {
                        ngModel.$setValidity('time', false);
                        return undefined;
                    }
                }
            }

            scope.updateElement = function () {
                var time = scope.time ? dateFilter(scope.time, 'shortTime') : '';
                if (time) {
                    element.val(time);
                    ngModel.$setViewValue(time);
                    ngModel.$setValidity('time', true);
                } 
                //ngModel.$modelValue = scope.time;
            };

            // Outter change
            ngModel.$render = function () {
                scope.time = parseTime(ngModel.$modelValue);
                //scope.updateElement();
                element.val(dateFilter(scope.time, 'shortTime'));
            };


            var documentClickBind = function (event) {
                if (scope.isOpen && event.target !== element[0]) {
                    scope.$apply(function () {
                        scope.isOpen = false;
                    });
                }
            };

            scope.$watch('isOpen', function (value) {
                if (value) {
                    scope.position = $position.position(element);
                    scope.position.top = scope.position.top + element.prop('offsetHeight');
                    timepickerEl.focus();
                    $document.bind('click', documentClickBind);
                } else {
                    $document.unbind('click', documentClickBind);
                }
            });

            scope.close = function () {
                scope.isOpen = false;
                element[0].focus();
            };

            var $popup = $compile(popupEl)(scope);
            element.after($popup);

            scope.$on('$destroy', function () {
                $popup.remove();
                $document.unbind('click', documentClickBind);
            });
        }
    };
}]);