var map = L.map( 'map', {
  center: [46.0, 25.0],
  minZoom: 2,
  zoom: 7
});

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo( map );

var myURL = jQuery( 'script[src$="leaf-demo.js"]' ).attr( 'src' ).replace( 'leaf-demo.js', '' );

//var myIcon = L.icon({
//iconUrl: myURL + 'images/pin24.png',
//  iconRetinaUrl: myURL + 'images/pin48.png',
//  iconSize: [29, 24],
//  iconAnchor: [9, 21],
//  popupAnchor: [0, -14]
//});

//var geojsonMarkerOptions = {
//    radius: 8,
//    fillColor: "#ff7800",
//    color: "#000",
//    weight: 1,
//    opacity: 1,
//    fillOpacity: 0.8
//};

function onEachFeature(possible_roundabouts, layer) {
		var popupContent = 
				"<p>"+ possible_roundabouts.properties.type+"</p>"
                +"<p><a href="+possible_roundabouts.properties.url+" target='_blank'>"+"Edit in iD"+"</a>"+" | " +"<a href="+possible_roundabouts.properties.josm+" target='_blank'>"+"Edit in JOSM"+"</p>";
                
if (possible_roundabouts.properties && possible_roundabouts.properties.url) {
			popupContent;
		}
		layer.bindPopup(popupContent);
        }

L.geoJson(possible_roundabouts, {
    onEachFeature: onEachFeature
}).addTo(map);

