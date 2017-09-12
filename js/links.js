function setCookie(cname, cvalue) {
  var expires = "";
  var date = new Date();
  date.setTime(date.getTime() + (900*24*60*60*1000));
  expires = "; expires=" + date.toUTCString();
  document.cookie = cname + "=" + cvalue + expires + "; path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function saveLinks() {
  var lists = document.getElementsByClassName("all");
  var listCookie = "";

  var tempChild = lists[0].childNodes;
  var tempLi = tempChild[3].children;
  for (var i = 0; i < lists.length; i++) {
    var tempLi = lists[i].children;
    var tempTitle = tempLi[0].innerHTML;
    listCookie += tempTitle + "\\t";

    for (var j = 0; j < tempLi[1].children.length; j++) {

      var tempText = tempLi[1].children[j].children[0].innerHTML;
      var tempLink = tempLi[1].children[j].children[0].href;

      listCookie += " " + tempText + " " + tempLink;
    }
    listCookie += "\\n";

  }
  listCookie = listCookie.substring(0, listCookie.length-3);

  setCookie("link_string", listCookie);
}



function rebuildLinks() {
  var list = document.getElementById("ql-list");
  list.innerHTML = "";

  var all_split = getCookie("link_string").split("\\n");
  //var all_split = link_string.split("\\n");

  var link_split = "";
  var title_split = "";
  var tempAll;

  for (var i = 0; i < all_split.length; i++) {
    tempAll = document.createElement("div");
    tempAll.setAttribute("class", "all");

    title_split = all_split[i].split("\\t ");
    var tempTitle = document.createElement("h3");

    tempTitle.setAttribute("class", "title " + title_split[0])
    tempTitle.appendChild(document.createTextNode(title_split[0]));

    tempAll.appendChild(tempTitle);

    link_split = title_split[1].split(" ");

    var tempLi, tempA, tempList;
    tempList = document.createElement("ul");
    tempList.setAttribute("class", "linklist");

    for (var j = 0; j < link_split.length; j+=2) {
      tempA = document.createElement("a");
      tempLi = document.createElement("li");

      tempA.appendChild(document.createTextNode(link_split[j]));
      tempA.setAttribute("href", link_split[j + 1]);

      tempLi.appendChild(tempA);
      tempList.appendChild(tempLi);
    }

    tempAll.appendChild(tempList);
    list.appendChild(tempAll)
  }
}
