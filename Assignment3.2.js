var originalGistList = [];
var gistAll = document.getElementById("gists");
var gistFav = document.getElementById("gists-favored");
var ulNode = document.createElement("ul");


function fetchData() {
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest ();
	} else {
		xmlhttp = new ActiveXObject ('Microsoft.XMLHTTP');
	}

	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = xmlhttp.responseText;
			originalGistList = JSON.parse(response);
			localStorage.setItem('gistLocal', originalGistList);

			for (var i = 0; i < originalGistList.length; i++) {
				generateGistHtml(originalGistList[i]);
			}

			var favString = localStorage.getItem('favs'), favObj;
			if (favString == null) {
				favObj = {"favList": []};
				localStorage.setItem("favs", JSON.stringify(favObj));
			} else {
				favObj = JSON.parse(localStorage.getItem("favs"))
				//Iterate over favObj.favList to create HTML
			}

			//generateGistHtml(originalGistList);
		}
	}

	var url = 'http://api.github.com/gists';
	xmlhttp.open('GET', url, true);
	xmlhttp.send();
}

var generateGistHtml = function(gist) {
	var fbutton = document.createElement("button");
	fbutton.innerHTML = "+";
	fbutton.setAttribute("gistId", gist.id);
	fbutton.onclick = function () {
		var gistId = this.getAttribute("gistId");
		var toBeFavoredGist = findById(gistId);
		favObj = JSON.parse(localStorage.getItem("favs"));
		//favObj.favList.push(?????? gist object);
		localStorage.setItem("favs", JSON.stringify(favObj));
		//Add gist to favorite list in local storage and remove
		//it from the gist list
	}
	document.body.appendChild(fbutton);
	var listItem1 = document.createElement('li');
	var listItem2 = document.createElement('li');
	var desc = document.createTextNode(gist.description);
	var link = document.createElement('a');
	var linkText = document.createTextNode(gist.url);
	link.appendChild(linkText);
	link.setAttribute('href', gist.html_url);
	listItem1.appendChild(desc);
	listItem2.appendChild(link);
	ulNode.appendChild(listItem1);
	ulNode.appendChild(listItem2); 
	document.getElementById("gists").appendChild(ulNode);
}

var findById = function(id) {

}

