 function initMap() {
   var myLatLng = {
     lat: 50.658852,
     lng: 21.844459
   };

   var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 10,
     center: myLatLng
   });

   var marker = new google.maps.Marker({
     position: myLatLng,
     map: map,
     title: ''
   });
 }