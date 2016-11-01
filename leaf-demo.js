var map = L.map( 'map', {
  center: [46.0, 25.0],
  minZoom: 2,
  zoom: 7

});

  var redMarker = L.AwesomeMarkers.icon({
    icon: 'default',
    markerColor: 'red'
  });
  var greyMarker = L.AwesomeMarkers.icon({
    icon: 'default',
    markerColor: 'gray'
  });
  var greenMarker = L.AwesomeMarkers.icon({
    icon: 'default',
    markerColor: 'green'
  });
  var blueMarker = L.AwesomeMarkers.icon({
    icon: 'default',
    markerColor: 'blue'
  });

var iconMappings = {
    'missingroundabout':redMarker,
    'duplicatedways':greyMarker,
    'orphannodes':blueMarker,
    'orphanways':greenMarker
  }    

var assignMarkers = function (markers){
  quarter = parseInt(markers.length/4)
  var first = markers.slice(0,quarter)
  var second = markers.slice(quarter,quarter*2)
  var third = markers.slice(quarter*2,quarter*3)
  var fourth = markers.slice(quarter*3,quarter*4)

  var markerLayerMappings = {
    'missingroundabout':first,
    'duplicatedways':second,
    'orphannodes':third,
    'orphanways':fourth
  }
  return markerLayerMappings
}



var initMap = function(){
  L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c']
  }).addTo( map );
}

initMap()

var composeUrlJOSM = function(bbox){
  var rootUrl = "http://127.0.0.1:8111/load_and_zoom?"
  var bboxUrl = "left="+bbox.west+"&right="+bbox.east+"&top="+bbox.north+"&bottom="+bbox.south
  return rootUrl+bboxUrl
}

//Create for each marker and edit in Id link
function editInID(markers, layer) {
  var josmUrl = "http://localhost:8111/load_object?new_layer=true&objects=w"+markers.properties.id
  var popupContent = "<p>"+ markers.properties.type+"</p>"
  +"<p><a href="+markers.properties.url+" target='_blank'>"+"Edit in iD"+"</a>"+" | " 
  +"<a href="+josmUrl+" target='_blank'>"+"Edit in JOSM"+"</p>";       
  if (markers.properties && markers.properties.url) {
    popupContent;
  } 
  layer.bindPopup(popupContent);
}

var editInJOSM = function(feature,layer){
  bbox = feature['bbox']
  var url = composeUrlJOSM(bbox)
  var htmlMarkup = '<p><a href ="'+url+'">Edit in JOSM</a></p>'
  layer.bindPopup(htmlMarkup)
}

var getMapBounds = function(callback){
  map.on('dragend',function(){
    var east = map.getBounds().getEast()
    var west = map.getBounds().getWest()
    var south = map.getBounds().getSouth()
    var north = map.getBounds().getNorth()
    bbox = {'west':west,'east':east,'south':south,'north':north}
    callback(bbox)
  })
}

var returnBounds = function(bbox){
  geometries = []
  for(key in possible_roundabouts){
    if(possible_roundabouts.hasOwnProperty(key)){
       possible_roundabouts[key]['bbox'] = bbox
       geometries.push(possible_roundabouts[key]) 
    }
  }
  markerMappings = assignMarkers(geometries)
  
}

var addToMapGeoJsonLayer = function(geojson,type){
    var geojsonLayer = L.geoJson(geojson, {
      onEachFeature: editInID,
      pointToLayer:function(feature,latlng){
        return L.marker(latlng,{
          icon:iconMappings[type]
        });
      }
  })
   
  return geojsonLayer 
}

//var removeJsonLayer = function(mar)

var clearLayers = function(){
    map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
}

var clearMap = function(layers){
  layers.forEach(function(layer){
    map.removeLayer(layer)
  })
  layers = []
}

getMapBounds(returnBounds)
map.fire('dragend')

$(function(){
   addedLayers = []
   $("#panel").click(function(){
     //clearLayers()
     clearMap(addedLayers)
     initMap()
     checkedValues = []
     checkboxes = $("input[type='checkbox']").each(function(){
       if($(this).is(":checked")){
         checkedValues.push($(this).attr("value"))
       }
     })
     
     checkedValues.forEach(function(item){
       layer = addToMapGeoJsonLayer(markerMappings[item],item)
       layer.addTo(map)
       addedLayers.push(layer)
     })
   })
   
   $("#panel").trigger('click')
})




