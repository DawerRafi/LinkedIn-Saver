
function csvFile(str){
this.obj =str;
}

var csv= new csvFile("data:text/csv;charset=utf-16,");
var csvcontent="data:text/csv;charset=utf-16,";
var loopURL=document.URL;
var counter=1;
httpGet(document.URL,csv);
/*
 function call(xmlHttp) {
						  coded  = this.responseXML.getElementsByTagName("code")[0].childNodes[0].nodeValue;
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
			httpGet(loopURL,csv,call());
		}
		else{
			download(csvcontent);
			}
} //} 
*/
//download(csvcontent);
	//function getResponse(){
	//	return function(){ coded  = this.responseXML.getElementsById("voltron_srp_main-content")[0].childNodes[0].nodeValue;};
//	}
		//download(csv);
		//download(csvcontent);
  // div.innerHTML=xmlHttp.responseText;
    
//var coded=div.getElementsByTagName('code');
//download("file.txt",coded.InnerHTML + " CONTENT STARTING FROM HERE : "+content);

function httpGet(theUrl,csv)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", loopURL,true );
	xmlHttp.responseType = "document";
	xmlHttp.onreadystatechange=function()
	{
		try{
		if (xmlHttp.readyState==4 && xmlHttp.status==200)
		{ 
		coded  = xmlHttp.responseXML.getElementsByTagName("code")[0].childNodes[0].nodeValue;
		try{
		var js=JSON.parse(coded);
    }catch(e){
		coded=coded.replace(/:\\u002d1,/g,":\"NoName\",");
		try{
		var js=JSON.parse(coded);
		}
		catch(ee){
			
		alert('Encountered a Parsing Error.Press OK to download the successfully parsed content');
		chrome.runtime.sendMessage({greeting: "WorkDone"}, function(response) {
	console.log(response.farewell);
	});
        download(csvcontent);
		console.log(e);
		//downloadErr("ErrorFile.txt",coded);
		}
		
    }
			var x = new Array(10);
			for (var i = 0; i < 10; i++) {
				x[i] = new Array(4);
			}
			var j=0;
		for(var i=0;i<js.content.page.voltron_unified_search_json.search.results.length;i++){
			if(js.content.page.voltron_unified_search_json.search.results[i].person){
				x[j][0]=js.content.page.voltron_unified_search_json.search.results[i].person.firstName;
				x[j][1]=js.content.page.voltron_unified_search_json.search.results[i].person.lastName;
			
				if(js.content.page.voltron_unified_search_json.search.results[i].person.fmt_name="" || !js.content.page.voltron_unified_search_json.search.results[i].person.fmt_name){
				x[j][0]="LinkedIn";
				x[j][1]="User";
				}
				x[j][0]=x[j][0].replace(/<[ -~]*?>/g," ");
				x[j][1]=x[j][1].replace(/<[ -~]*?>/g," ");
				
				//x[j][1]=js.content.page.voltron_unified_search_json.search.results[i].person.fmt_headline;
				var str=js.content.page.voltron_unified_search_json.search.results[i].person.fmt_headline;
				var two = str.split(" at ");
				x[j][2]=two[0].replace(/&amp;|,|<[ -~]*?>/g," ");
				if(two[1]){
				x[j][3]=two[1].replace(/&amp;|,|<[ -~]*?>/g," ");
				}
				j++;
			}
			
				
		}
		if(j==0){
			alert("0 results found");
		}
		else{
			x.forEach(function(infoarray, index){
				 datastring = infoarray.join(",");
				 csvcontent+=index < x.length ? datastring+ "\n" : datastring;
				 csv.obj += index < x.length ? datastring+ "\n" : datastring;
				 }); 
		if(js.content.page.voltron_unified_search_json.search.baseData.resultPagination.nextPage){
			loopURL="https://www.linkedin.com"+js.content.page.voltron_unified_search_json.search.baseData.resultPagination.nextPage.pageURL;
			counter +=1;
			chrome.runtime.sendMessage({greeting: "PageRefresh",OnPage: counter+""}, function(response) {
				
			});
			console.log(loopURL);
			httpGet(loopURL,csv);
		}
		else{
			chrome.runtime.sendMessage({greeting: "WorkDone"}, function(response) {
			console.log(response.farewell);
			});
			download(csvcontent);
			}
		
		}
		
		//var data = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
		}
	else{
		//return;
	}
	/*
	
	*/
	}

	catch(Ex){
		alert("An Error Occured "+Ex);
		
		chrome.runtime.sendMessage({greeting: "WorkDone"}, function(response) {
	console.log(response.farewell);
	});
	}
};
	xmlHttp.send(null);

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
		 var exp="[!-~]*.csv";
		 var regex = new RegExp(exp);
		if(person.match(regex)){ 
			link.setAttribute("download", person);
		}
		else{
			link.setAttribute("download", person+".csv");
		}
	 }
	 link.click();
}

function downloadErr(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
