'use strict';

app.directives.directive('addressAutocomplete', function () {
    return {
        restrict: 'EA',
        scope: { addressData: '=' },
        replace: true,
        template: "<input type='text' ng-model='addressDescription' />",
        link: function (scope, elem, attrs) {

            //  $(elem).focus(geolocate);
            scope.addressDescription = "";

            var autocomplete = new google.maps.places.Autocomplete(elem[0], { types: ['geocode'] });
            google.maps.event.addListener((autocomplete), 'place_changed', function () {
                var place = autocomplete.getPlace();
                scope.addressData = {
                    description: place.formatted_address,
                    latitude: place.geometry.location.D,
                    longitude: place.geometry.location.k,
                    gmId: place.place_id,
                    gmURL: place.url
                };

                scope.$apply();
            });

            scope.$watch('addressData', function () {
                scope.addressData = scope.addressData || {};
                scope.addressDescription = scope.addressData.description;
            });

            elem.on("blur", function () {
                scope.addressData.description = scope.addressDescription;
                scope.$apply();
            });

            //elem.on("blur", function () {
            //    scope.addressData.description = this.value;
            //});

            // Bias the autocomplete object to the user's geographical location,
            // as supplied by the browser's 'navigator.geolocation' object.
            function geolocate() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var geolocation = new google.maps.LatLng(
                            position.coords.latitude, position.coords.longitude);
                        var circle = new google.maps.Circle({
                            center: geolocation,
                            radius: position.coords.accuracy
                        });
                        autocomplete.setBounds(circle.getBounds());
                    });
                }
            }
        }
    }
});


