var map;
var markers = [];
var infoWindow;
var locationSelect;

function initMap() {           
    var losAngeles = {
        lat: 34.063380, 
        lng: -118.358080
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 4,
        mapTypeId: 'roadmap',
        styles : [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ebe3cd"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#523735"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f1e6"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#c9b2a6"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#dcd2be"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#ae9e90"
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#93817c"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#a5b076"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#447530"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f1e6"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#fdfcf8"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f8c967"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#e9bc62"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e98d58"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#db8555"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#806b63"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8f7d77"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#ebe3cd"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dfd2ae"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#b9d3c2"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#92998d"
                }
              ]
            }
          ]
    });

    //to display information when clicked on marker you need to define infoWindow
    infoWindow = new google.maps.InfoWindow();
    displayStores();
    showMarkers();
}

/******  showMarkers ********/
function showMarkers() { //showStoreMarker..
    //console.log(stores.length)
    var bounds = new google.maps.LatLngBounds(); //bounds spreads the marker

    stores.forEach(function(store, index) {
        console.log(store)
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude
        );

        var name = store.name;
        var address = store.addressLines[0];
        createMarker(latlng, name, address, index);
        bounds.extend(latlng);
    })
    map.fitBounds(bounds); //using fitbound marker won't tight together it will scattered to fit in map
}

/******  createMarker ********/
function createMarker(latlng, name, address, index) {
    var html = '<b>' + name + '<b> <br/>' + address;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        label: `${index+1}`
    });
    
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });

    markers.push(marker);
}

// ************ DISPLAY STORES *************
function displayStores(){
    var storeHtml = '';
    stores.forEach(function(store, index){ 
        var address = store.addressLines;
        var phone = store.phoneNumber; 

        storeHtml += ` 
            <div class = 'store-container'>
                <div class = 'store-container-background' >
                    <div class = "store-info-container">
                        <div class = 'store-address'>
                            <span> ${address[0]} </span>
                            <span> ${address[1]} </span>
                        </div>

                        <div class = 'store-phone-number'>
                             ${phone}
                        </div>
                    </div>

                    <div class = "store-number-container">
                        <div class = 'store-number'>
                            ${index + 1}
                        </div>
                    </div>    
                </div>
            </div>
         `
    });
    document.querySelector('.stores-list').innerHTML = storeHtml; //select element with class "stores-list" and display storeHtml there.
}

