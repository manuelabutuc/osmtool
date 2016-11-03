var map = L.map( 'map', {
  center: [46.0, 25.0],
  minZoom: 2,
  zoom: 7
});

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo( map );

var myIcon = L.icon({
  iconUrl:  'images/marker.png',
  iconSize: [23, 30],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

function onEachFeature(possible_roundabouts, layer) {
		var popupContent = 
				"<p>"+ possible_roundabouts.properties.type+"</p>"
                +"<p><a href="+possible_roundabouts.properties.url+" target='_blank'>"+"Edit in iD"+"</a>"+" | " +"<a href="+possible_roundabouts.properties.josm+" target='_blank'>"+"Edit in JOSM"+"</p>";              
if (possible_roundabouts.properties && possible_roundabouts.properties.url) {
			popupContent;
		}
		layer.bindPopup(popupContent);
        }

   var myLayer=L.geoJson(possible_roundabouts, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng,  {icon: myIcon});
    }
    })     
function doalert(id){
  if(document.getElementById(id).checked) {
    myLayer.addTo(map);
  }else{
    map.removeLayer(myLayer);
  }
}


