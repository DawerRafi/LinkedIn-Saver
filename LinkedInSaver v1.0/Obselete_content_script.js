

// var div=document.createElement('div');
// div.setAttribute("id", "Hiddendivforme");
// div.style.display='none';
function csvFile(str){
this.obj =str;
}
var csvcontent="data:text/csv;charset=utf-8,";
//var csvcontent = "data:text/csv;charset=utf-8,";
var csv= new csvFile("data:text/csv;charset=utf-8,");
//GetHttpSync(document.URL);
//download(csv);
var block=false;
var release=false;
var loopURL=document.URL;
var coded;
httpGet(document.URL,csv, function() {
						  coded  = this.responseXML.getElementsByTagName("code")[1].childNodes[0].nodeValue;
		var js=JSON.parse(coded);
			var x = new Array(10);
			for (var i = 0; i < 10; i++) {
				x[i] = new Array(2);
			}
			var j=0;
		for(var i=0;i<js.content.page.voltron_unified_search_json.search.results.length;i++){
			if(js.content.page.voltron_unified_search_json.search.results[i].person){
				
				x[j][0]=js.content.page.voltron_unified_search_json.search.results[i].person.fmt_name;
				x[j][1]=js.content.page.voltron_unified_search_json.search.results[i].person.fmt_headline;
				j++;
			}
				
		}
			x.forEach(function(infoarray, index){
				 datastring = infoarray.join(",");
				 csvcontent+=index < x.length ? datastring+ "\n" : datastring;
				 csv.obj += index < x.length ? datastring+ "\n" : datastring;
				 }); 
		if(js.content.page.voltron_unified_search_json.search.baseData.resultPagination.nextPage){
			loopURL="https://www.linkedin.com"+js.content.page.voltron_unified_search_json.search.baseData.resultPagination.nextPage.pageURL;
			console.log(loopURL);
			release=true;
		}
		else{
			loopURL="";
			release=true;
			}
}); //} 
download(csvcontent);
	function getResponse(){
		return function(){ coded  = this.responseXML.getElementsByTagName("code")[0].childNodes[0].nodeValue;};
	}
		//download(csv);
		//download(csvcontent);
  // div.innerHTML=xmlHttp.responseText;
    
//var coded=div.getElementsByTagName('code');
//download("file.txt",coded.InnerHTML + " CONTENT STARTING FROM HERE : "+content);
function httpGet(theUrl,csvcontent,callback)
{
	while(loopURL){
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", loopURL,true );
	xmlHttp.responseType = "document";
	xmlHttp.onreadystatechange=function()
	{
		if (xmlHttp.readyState==4 && xmlHttp.status==200)
		{
		//var coded=xmlHttp.responseXML.getElementsByTagName("code")[0].childNodes[0].nodeValue;
			if (typeof callback == "function") {
        // apply() sets the meaning of "this" in the callback
				callback.apply(xmlHttp);
			}
		//var coded=div.getElementsByTagName('code');
		/*
		
		var js=JSON.parse(coded);
			var x = new Array(10);
			for (var i = 0; i < 10; i++) {
				x[i] = new Array(2);
			}
			var j=0;
		for(var i=0;i<js.content.page.voltron_unified_search_json.search.results.length;i++){
			if(js.content.page.voltron_unified_search_json.search.results[i].person){
				
				x[j][0]=js.content.page.voltron_unified_search_json.search.results[i].person.fmt_name;
				x[j][1]=js.content.page.voltron_unified_search_json.search.results[i].person.fmt_headline;
				j++;
			}
				
		}
		*/
		//var data = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
		}
	else{
		//return;
	}
	/*
	
	*/
};
	block=true;
	release=false;
    xmlHttp.send(null);
	while(block){
		if(release){
		break;
		}
	}
	if(!loopURL || loopURL==""){
	break;
	}
}
}
function download(csv) {
 	 var person = prompt("Please specify the filename you wish to create", "mydata.csv");
  
	 var encodeduri = encodeURI(csv);
	 var link = document.createElement("a");
	 
	 
	 /*
	 var output="";
	 for(var y=0;y<x.length;y++){
		output+= x[y][0]+" , "+x[y][1]+"\n";
	 }
	 */
	 
	 
	 link.setAttribute("href", encodeduri);
	 if (person === null) {
	 link.setAttribute("download", "mydata.csv");
	 }
	 else{
	 link.setAttribute("download", person);
	 }
	 link.click();
}


function GetHttpSync(theUrl){

    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl,false );
	xmlHttp.send(null);
	var xml=xmlHttp.ResponseXML;
	var json= xml.getElementsByTagName("code")[0].childNodes[0].nodeValue;
	var js=JSON.parse(json);
			var x = new Array(10);
			for (var i = 0; i < 10; i++) {
				x[i] = new Array(2);
			}
			var j=0;
		for(var i=0;i<js.content.page.voltron_unified_search_json.search.results.length;i++){
			if(js.content.page.voltron_unified_search_json.search.results[i].person){
				
				x[j][0]=js.content.page.voltron_unified_search_json.search.results[i].person.fmt_name;
				x[j][1]=js.content.page.voltron_unified_search_json.search.results[i].person.fmt_headline;
				j++;
			}
				
		}
			x.forEach(function(infoarray, index){
				 datastring = infoarray.join(",");
				 csvcontent+=index < x.length ? datastring+ "\n" : datastring;
				 csv.obj += index < x.length ? datastring+ "\n" : datastring;
				 }); 
				 if(js.content.page.voltron_unified_search_json.search.baseData.resultPagination.nextPage){
			var NewURL="https://www.linkedin.com"+js.content.page.voltron_unified_search_json.search.baseData.resultPagination.nextPage.pageURL;
			console.log(NewURL);
			GetHttpSync(NewURL);
				 }
}
