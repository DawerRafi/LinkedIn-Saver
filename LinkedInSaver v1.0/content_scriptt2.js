
function csvFile(str){
this.obj =str;
}

/*
*creating csv file and initailizing attributes
*/
var csv= new csvFile("data:text/csv;charset=utf-16,");
var csvcontent="data:text/csv;charset=utf-16,";
var loopURL=document.URL;
var counter=1;
httpGet(document.URL,csv);

/*
* The main function which takes in json from the linkedin source code and parses it to get three things:
* 	-Name of the person
*	-Designation of the person
*	-Company of the person
*
* The function is recursive in nature. I.e it first scraps one page of the search result and if the next page
* is present, it recurses for the next page till it has scrapped all of the pages.
* The function makes asynchronous calls to the search results, gets the json formatted data and then retrieved people
* from there.
*/
function httpGet(theUrl,csv)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", loopURL,true );
	xmlHttp.responseType = "document";
	xmlHttp.onreadystatechange=function()
	{
		try
		{
			if (xmlHttp.readyState==4 && xmlHttp.status==200)
			{ 
			coded  = xmlHttp.responseXML.getElementsByTagName("code")[0].childNodes[0].nodeValue;
			try
			{
				var js=JSON.parse(coded);
			}
			catch(e)
			{
				coded=coded.replace(/:\\u002d1,/g,":\"NoName\",");
				try
				{
					var js=JSON.parse(coded);
				}
				catch(ee)
				{
					alert('Encountered a Parsing Error.Press OK to download the successfully parsed content');
					chrome.runtime.sendMessage({greeting: "WorkDone"}, function(response) {
					console.log(response.farewell);
					});
					download(csvcontent);
					console.log(e);
				}
			}
			
			var x = new Array(10);
			for (var i = 0; i < 10; i++) {
				x[i] = new Array(4);
			}
			
			var j=0;
			
			//looping through all the persons in the current page
			for(var i=0;i<js.content.page.voltron_unified_search_json.search.results.length;i++){
				if(js.content.page.voltron_unified_search_json.search.results[i].person){
					x[j][0]=js.content.page.voltron_unified_search_json.search.results[i].person.firstName;
					x[j][1]=js.content.page.voltron_unified_search_json.search.results[i].person.lastName;
					
					//If name is not shown by linked in then we hardcode it
					if(js.content.page.voltron_unified_search_json.search.results[i].person.fmt_name="" || !js.content.page.voltron_unified_search_json.search.results[i].person.fmt_name){
						x[j][0]="LinkedIn";
						x[j][1]="User";
					}
					//removing extra xml used for font styling by linkedin
					x[j][0]=x[j][0].replace(/<[ -~]*?>/g," ");
					x[j][1]=x[j][1].replace(/<[ -~]*?>/g," ");
				
					//parsing designation and company of the individual
					var str=js.content.page.voltron_unified_search_json.search.results[i].person.fmt_headline;
					var two = str.split(" at ");
					x[j][2]=two[0].replace(/&amp;|,|<[ -~]*?>/g," ");
					if(two[1]){
						x[j][3]=two[1].replace(/&amp;|,|<[ -~]*?>/g," ");
					}
					j++;
				}
			}
			//showing alert if no search results found
			if(j==0)
			{
				alert("0 results found");
			}
			//parsing the next result page
			else
			{	
				//saving the scrapped data
				x.forEach(function(infoarray, index){
					datastring = infoarray.join(",");
					csvcontent+=index < x.length ? datastring+ "\n" : datastring;
					csv.obj += index < x.length ? datastring+ "\n" : datastring;
				}); 
				//if next page is available
				if(js.content.page.voltron_unified_search_json.search.baseData.resultPagination.nextPage)
				{
					loopURL="https://www.linkedin.com"+js.content.page.voltron_unified_search_json.search.baseData.resultPagination.nextPage.pageURL;
					counter +=1;
					chrome.runtime.sendMessage({greeting: "PageRefresh",OnPage: counter+""}, function(response) {});
					console.log(loopURL);
					//recurse back to this function
					httpGet(loopURL,csv);
				}
				//download the file for user
				else
				{
					chrome.runtime.sendMessage({greeting: "WorkDone"}, function(response) 
					{
					console.log(response.farewell);
					});
					download(csvcontent);
				}
			}
		
			}
			else{
				//return;
			}
		}

		catch(Ex)
		{
			alert("An Error Occured "+Ex);
			chrome.runtime.sendMessage({greeting: "WorkDone"}, function(response) {
			console.log(response.farewell);
			});
		}
	};
	xmlHttp.send(null);

}
/*
This function takes in the scrapped data and returns a file to be downloaded by the user.
*/
function download(csv) {
 	 var person = prompt("Please specify the filename you wish to create", "mydata.csv");
  
	
	 var encodeduri = encodeURI(csv);
	 var link = document.createElement("a");
	 
	 
	 
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

