var map = L.map( 'map', {
  center: [46.0, 25.0],
  minZoom: 2,
  zoom: 7
});

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo( map );

var myIcon1 = L.icon({
  iconUrl:  'images/marker.png',
  iconSize: [23, 30],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var myIcon2 = L.icon({
  iconUrl:  'images/marker2.png',
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

        
        
   var myLayer1=L.geoJson(possible_roundabouts, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng,  {icon: myIcon1});
    }
    })  
    
    
      var myLayer2 = L.geoJson(markers, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng,  {icon: myIcon2});
    }
    }) 
    
  

    function doalert(id){
    switch(id){
        case 'layer1':
            if(document.getElementById(id).checked) {
                myLayer1.addTo(map);
            }else{
                map.removeLayer(myLayer1);
                }
            break;  
        case 'layer2':
            if(document.getElementById(id).checked) {
                myLayer2.addTo(map);
            }else{
                map.removeLayer(myLayer2);
                }
            break;
                
        case 'layer3':
            if(document.getElementById(id).checked) {
                myLayer3.addTo(map);
            }else{
                map.removeLayer(myLayer3);
                }
            break;
                
        case 'layer4':
            if(document.getElementById(id).checked) {
                myLayer4.addTo(map);
            }else{
                map.removeLayer(myLayer4);
                }
            default :
            break;
     }
  
}


