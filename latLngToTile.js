var latLng2tile = function(lat,lon,zoom){
	eLng = (lon+180)/360*Math.pow(2,zoom);
	eLat = (1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom);
	//x coord in image tile of lat/lng
	xInd = Math.round((eLng-Math.floor(eLng))*256);
	//y coord in image tile of lat/lng
	yInd = Math.round((eLat-Math.floor(eLat))*256);
	//flattened index for clamped array in imagedata
	fInd = yInd*256+xInd;
	//for calling tile from array
	eLng = Math.floor(eLng);
	eLat = Math.floor(eLat);
	return {"tileCall":""+eLng+eLat,"tileX":eLng,"tileY":eLat,"pX":xInd,"pY":yInd,"arrInd":fInd}
}
