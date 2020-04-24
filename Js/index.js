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
        zoom: 11,
        mapTypeId: 'roadmap',
    });

    //to display information when clicked on marker you need to define infoWindow
    infoWindow = new google.maps.InfoWindow();

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

