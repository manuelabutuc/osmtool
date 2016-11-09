//map layer and position
var map = L.map( 'map', {
  center: [46.0, 25.0],
  minZoom: 2,
  zoom: 7
});

//tiles from OSM
L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
}).addTo( map );

//my markers
var myIcon1 = L.icon({
  iconUrl:  'images/marker1.png',
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

var myIcon3 = L.icon({
  iconUrl:  'images/marker3.png',
  iconSize: [23, 30],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var myIcon4 = L.icon({
  iconUrl:  'images/marker4.png',
  iconSize: [23, 30],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

//checks the checkboxes on window load & calls the showOnMap function when they are checked
window.onload = function(){
   var checkboxes = document.getElementsByTagName("INPUT");

   for(var x=0; x<checkboxes.length; x++)
   {
      if(checkboxes[x].type == "checkbox")
      {
          checkboxes[x].checked = true;
      }
      showOnMap(checkboxes[x].id);
   }
}

//initialize status value
var statusValue = "open"; 

//update status in popup
function refreshStatusField(status) {
  var container = document.getElementById("status");
  var content = container.innerHTML;
  container.innerHTML= status; 
}

//set status as false positive
function setFalsePositive(){
  var geoId=document.getElementById("geoId").innerHTML;
  statusValue="false positive"
  localStorage[geoId] = statusValue;
  refreshStatusField(statusValue);  
  document.location.reload(true); 
}

//set status as closed
function setClosed(){
  var geoId=document.getElementById("geoId").innerHTML;
  statusValue="closed"
  localStorage[geoId] = statusValue;
  refreshStatusField(statusValue);  
  document.location.reload(true);
}

//set status as open
function setClear(){
  var geoId=document.getElementById("geoId").innerHTML;
  localStorage.removeItem(geoId);
  refreshStatusField("open");
  document.location.reload(true);
}

//read value from localStorage and return it
function getCurrentStatusForId(id){
  var popupId=id.toString();
  var currentStatus=localStorage.getItem(popupId); 
  switch (currentStatus)
  {
    case "false positive": 
       return "false positive"
       break;
    case "closed": 
       return "closed"
       break;
    default: 
       return "open";
       break;
  }
}

//function to add popup & content
function onEachFeature(possible_roundabouts, layer) {
		var popupContent = 
				"<p><b>"+ possible_roundabouts.properties.type+"</b></p>"
        +"<p>Id: <label id=\"geoId\">"+possible_roundabouts.properties.id+"</label></p>"
        +"<p>Status: <label id=\"status\">"+getCurrentStatusForId(possible_roundabouts.properties.id)+"</label></p>"
        +"<p><a href="+possible_roundabouts.properties.url+" target='_blank'>"+"Edit in iD"+"</a>"
        +" | " 
        +"<a href="+possible_roundabouts.properties.josm+" target='_blank'>"+"Edit in JOSM"+"</a>"+"</p>"
        +"<button id=\"falsePositiveButton\" onClick=\"setFalsePositive()\">False Positive</button>"              
        +"<button id=\"closedButton\" onClick=\"setClosed()\">Closed</button>"
        +"<button id=\"clearStatusButton\" onClick=\"setClear()\">Clear Status</button>"
        ;    

    if (possible_roundabouts.properties && possible_roundabouts.properties.url) {
			popupContent;
		}
		layer.bindPopup(popupContent);
}

       
 //layers for each marker category  
   var myLayer1=L.geoJson(possible_roundabouts, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng,  {icon: myIcon1});
    }
    })  
      
      var myLayer2 = L.geoJson(duplicates, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng,  {icon: myIcon2});
    }
    }) 
    
      var myLayer3 = L.geoJson(overlapping_ways, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng,  {icon: myIcon3});
    }
    }) 
    
      var myLayer4 = L.geoJson(untagged_ways, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng,  {icon: myIcon4});
    }
    }) 
     
//show layers based on cheched value
    function showOnMap(id){
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
