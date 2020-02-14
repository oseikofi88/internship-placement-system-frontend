import {GoogleMapsAPIWrapper} from '@agm/core/services/google-maps-api-wrapper';
import { Directive,  Input, ViewContainerRef} from '@angular/core';
declare var google: any;

@Directive({
    selector: '<agm-directions></agm-directions>'
})
export class DirectionsMapDirective {
    @Input() origin;
    @Input() destination;
    @Input() directionsDisplay:any;

    public estimated_distance: any;
    public estimated_duration: any;
    public point: any;


    constructor (private gmapsApi: GoogleMapsAPIWrapper) {}
    getDirections(){
        this.gmapsApi.getNativeMap().then(map => {

            var directionsService = new google.maps.DirectionsService;

            this.directionsDisplay.setMap(map);
            this.directionsDisplay.setOptions({
                polylineOptions: {
                    strokeWeight: 8,
                    strokeOpacity: 0.7,
                    strokeColor:  '#00468c' 
                }
            });
            directionsService.route({
                origin: {lat: this.origin.latitude, lng: this.origin.longitude},
                destination: {lat: this.destination.latitude, lng: this.destination.longitude},
                waypoints: [],
                optimizeWaypoints: true,
                travelMode: 'DRIVING'
            }, function(response, status) {
                if (status === 'OK') {

                    this.point = response.routes[ 0 ].legs[ 0 ];
                    this.directionsDisplay.setDirections(response);
                    this.estimated_distance = this.point.distance.text;
                    this.estimated_duration = this.point.duration.text;
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            }.bind(this)); // using bind inorder to make reference to this from the global perspective inside the function(response,...)

        });
    }
}
