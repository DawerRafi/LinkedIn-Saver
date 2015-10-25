// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 **/
 var file;
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
 /*
function getImageUrl(searchTerm, callback, errorCallback) {
  // Google image search - 100 searches per day.
  // https://developers.google.com/image-search/
  var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
    '?v=1.0&q=' + encodeURIComponent(searchTerm);
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = x.response;
    if (!response || !response.responseData || !response.responseData.results ||
        response.responseData.results.length === 0) {
      errorCallback('No response from Google Image search!');
      return;
    }
    var firstResult = response.responseData.results[0];
    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    var imageUrl = firstResult.tbUrl;
    var width = parseInt(firstResult.tbWidth);
    var height = parseInt(firstResult.tbHeight);
    console.assert(
        typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
        'Unexpected respose from the Google Image Search API!');
    callback(imageUrl, width, height);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}
*/
function renderStatus(statusText) {
  document.getElementById('status').innerHTML = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    // Put the image URL in Google search. 
	var expression= "https://www.linkedin.com/vsearch/[!-~]*keywords=[!-~]*vsrp_people[!-~]*";
	var expression2="https://www.linkedin.com/vsearch/[!-~]*type=people[!-~]*keyword[!-~]*";
	var expression3="https://www.linkedin.com/vsearch/[!-~]*keywords=[!-~]*openAdvancedForm=true[!-~]*";
	var expression4="https://www.linkedin.com/vsearch/p[!-~]*";
	var regex = new RegExp(expression);
	var regex2 = new RegExp(expression2);
	var regex3 = new RegExp(expression3);
	var regex4 = new RegExp(expression4);
if (url.match(regex) || url.match(regex2) || url.match(regex3) || url.match(regex4))
 {
   renderStatus('<b>Status:</b> URL Matched');
   document.getElementById('button').style.display='block';
 } 
	 else {
   document.getElementById('button').style.display='none';
   renderStatus('<b>Status:</b> URL Not Matched');
 }
 
  });
});

function Extract(){
	document.getElementById('extract').disabled = true;
	document.getElementById('pagestatus').innerHTML="Loading Page : 1";
	
	
  
  // if (!file) {
    // }
  // else{
	// //Read file and append [Logic to be seen]
  // }
  // //Scrape();
  
  chrome.tabs.executeScript(null, {file: "content_scriptt2.js"});
	//var data = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
	// var csvContent = "data:text/csv;charset=utf-8,";
	// data.forEach(function(infoArray, index){
	// dataString = infoArray.join(",");
	// csvContent += index < data.length ? dataString+ "\n" : dataString;
	// }); 
	// var encodedUri = encodeURI(csvContent);
	// var link = document.createElement("a");
	// link.setAttribute("href", encodedUri);
	// if (person == null) {
		// link.setAttribute("download", "mydata.csv");
	// }
	// else{
	// link.setAttribute("download", person);
	// }
	// link.click();
}
/*
function read(e){
file=e.target.files[0];
}
*/
