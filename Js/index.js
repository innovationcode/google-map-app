function initMap() {
                
    var mumbai = {lat: 19.0760, lng: 72.8777};
    map = new google.maps.Map(document.getElementById('map'), {
        center: mumbai,
        zoom: 4
    })
}