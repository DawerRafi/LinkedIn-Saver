
//document.getElementById('file-input').addEventListener('change', read, false);
document.getElementById("extract").addEventListener("click", Extract);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "WorkDone"){
		
	document.getElementById('extract').disabled = false;
	document.getElementById('pagestatus').innerHTML="";
      sendResponse({farewell: "On"});
	}
	else if(request.greeting == "PageRefresh"){
	document.getElementById('pagestatus').innerHTML="Loading Page : "+request.OnPage;
	 sendResponse({farewell: "On"});
	}
  });