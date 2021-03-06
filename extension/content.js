/*-----------------------------------------------------------------------------
 * Content Script
 *
 * Authors
 *  Alice Xue, Jeffrey Zou, Yicheng Wang
 *
 * Description
 *  Runs in the context of the webpage, makes changes to the webpage
 *
 *-----------------------------------------------------------------------------*/


console.log("loaded content.js");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    	console.log(request);
    	console.log(sender);
    	console.log(sendResponse);
	if(request.method == "getHTML"){
  	    var metadata = document.getElementsByTagName("meta");
  	    var divs = document.getElementsByTagName("div");
            var title = document.title;
  	    var datePublished = "";

  	    dates = document.querySelectorAll("time, [itemprop=datePublished], span[class=timeago], span[class=timestamp]");
  	    authors = document.querySelectorAll("[name=author], .byline-author, [itemprop=author], h3[class=article-author-title] > a, a[class=author-name]");
  	    //paragraphs = document.querySelectorAll("p[itemprop=articleBody], p[class=p1], div[itemprop=articleBody] p, div[id=article-body] p, div[class=article-entry] p, span[class=focusParagraph] > p, span[id=articleText] > p");

  	    for (i=0;i<dates.length;i++) {
  		datePublished = dates[i].innerText;
  		if (typeof datePublished == "undefined" || datePublished == "" || datePublished == null) {
  		    datePublished = dates[i].getAttribute("content");
  		}
  		if (typeof datePublished != "undefined" & datePublished != "" & datePublished != null) {
  		    break;
  		}
  	    }

            var that = document.body.outerHTML;
  	    var author = "";
  	    for (i=0;i<authors.length;i++) {
  		author = authors[i].innerText;
  		if (typeof author == "undefined" || author == "" || author == null) {
  		    author = authors[i].getAttribute("content");
  		}
		if (typeof author != "undefined" & author != "" & author != null) {
		    break;
		}
	    }

	    if (datePublished == "") {
		for (i=0;i<metadata.length;i++) {
		    if (metadata[i].getAttribute("property") == "article:published_time") {
			datePublished = metadata[i].getAttribute("content");
			if (datePublished.length > 10) {
			    datePublished = datePublished.substring(0,10);
			}
		    }
		}
	    }

	    console.log("---------title------------");
	    console.log(title);
	    console.log("---------Date------------");
	    console.log(datePublished);
	    console.log("---------Author------------");
	    console.log(author);

	    var data = {
		title:title,
		author:author,
		date:datePublished,
		url:document.URL,
		p:document.body.outerHTML,
		method:"getHTML"
	    };
            sendResponse(data);
	}
    }

);
