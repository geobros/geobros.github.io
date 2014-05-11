var dHash = window.location.hash.replace("#","");

console.log(dHash);

var layer = new L.StamenTileLayer(dHash);

var map = L.map('map_canvas',{
	layers: layer
}).setView([39, -110], 5);
