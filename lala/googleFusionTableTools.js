function cleanGoogleFusionTable(resp){
	var cleanObj = {"keys":[],"records":[]}
	for (i in resp.columns){
		cleanObj.keys.push(resp.columns[i].replace(" ",""));
	}
	for (r in resp.rows){
		var tempObj = {}
		for (c in resp.rows[r]){
			tempObj[cleanObj.keys[c]] = resp.rows[r][c]
		}
		cleanObj.records.push(tempObj)
	}
	return cleanObj;
}