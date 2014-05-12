var dHash = window.location.hash.replace("#","").split("/");


var layer = new L.StamenTileLayer(dHash[0]);

var map = L.map('map_canvas',{
	layers: layer,
	maxZoom: 8
}).setView([dHash[1], dHash[2]], dHash[3]);
map.on("moveend",function(){
	var hVal = "#"+dHash[0]+"/"+""+map.getCenter().toString().replace("LatLng(","").replace(")","").replace(", ","/")+"/"+map.getZoom();
	history.pushState(null,null,hVal);
});
var queryUrlHead = 'https://www.googleapis.com/fusiontables/v1/query?sql=';
var queryUrlTail = '&key=AIzaSyA_2F4f39ncWIbzriIlpHSQXe5JRpAkvEU';
var tableId = '1QLIjC-rLx9KootgPGUn3H9Os2unBOEZ5FH5tB6mj';

var query = "SELECT * FROM " + tableId;
var queryurl = encodeURI(queryUrlHead + query + queryUrlTail);

function loadCompanies(comps){
	var regStyle = {
		color:"green",
		fillOpacity: 0.5,
		radius: 8
	}
	var hoverStyle = {
		color:"green",
		fillOpacity: 0.9,
		radius: 10
	}
	var markers = L.markerClusterGroup({showCoverageOnHover: false, spiderfyDistanceMultiplier:1.5, zoomToBoundsOnClick: false});
	for (i=0;i<comps.records.length;i++){
		console.log(comps.records[i].CompanyName);
		regStyle.title = comps.records[i].CompanyName
		var marker = L.circleMarker([comps.records[i].Lat,comps.records[i].Lng],regStyle)
			.bindPopup(
				"<h2>"+comps.records[i].CompanyName+"</h2><p><a href='"+comps.records[i].Website+"'>"+comps.records[i].Website+"</a></p>"
			)
			.on("mouseover",function(){
				this.setStyle(hoverStyle)
			})
			.on("mouseout", function(){
				this.setStyle(regStyle)
			});
		markers.addLayer(marker);
	}
	map.addLayer(markers);
}

$.ajax({
	url: queryurl,
	dataType: "jsonp"
})
.done(function(done){
	var cleaned = cleanGoogleFusionTable(done);
	loadCompanies(cleaned);
})
.error(function(err){
	console.log(err)
})