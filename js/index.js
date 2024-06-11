var siteName = document.getElementById("Name");
var siteURL = document.getElementById("URL");
var submit = document.getElementById("submit");
var table = document.getElementById("table");
var close = document.getElementById("close");
var boxx123 = document.querySelector(".box-info");
var bookmarks = [];

if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (var x = 0; x < bookmarks.length; x++) {
    display12(x);
  }
}

function display12(indexOfWebsite) {
  var userURL = bookmarks[indexOfWebsite].siteURL;
  var httpsRegex = /^https?:\/\//g;
  if (httpsRegex.test(userURL)) {
    validURL = userURL;
    fixedURL = validURL
      .split("")
      .splice(validURL.match(httpsRegex)[0].length)
      .join("");
  } else {
    var fixedURL = userURL;
    validURL = `https://${userURL}`;
  }

  var newBookmark = `
              <tr>
                <td>${indexOfWebsite + 1}</td>
                <td>${bookmarks[indexOfWebsite].siteName}</td>              
                <td>
                  <button class="btn btn-visit" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  table.innerHTML += newBookmark;

  var delete123;

  delete123 = document.querySelectorAll(".btn-delete");
  if (delete123) {
    for (var j = 0; j < delete123.length; j++) {
      delete123[j].addEventListener("click", function (e) {
        deleteBookmark(e);
      });
    }
  }

function deleteBookmark(e) {
  table.innerHTML = "";
  var deletedIndex = e.target.dataset.index;
  bookmarks.splice(deletedIndex, 1);
  for (var k = 0; k < bookmarks.length; k++) {
    display12(k);
  }
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

  var viset;

  viset = document.querySelectorAll(".btn-visit");
  if (viset) {
    for (var l = 0; l < viset.length; l++) {
      viset[l].addEventListener("click", function (e) {
        visetWeb(e);
      });
    }
  }
}

function visetWeb(e) {
  var websiteIndex = e.target.dataset.index;
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
    open(bookmarks[websiteIndex].siteURL);
  } else {
    open(`https://${bookmarks[websiteIndex].siteURL}`);
  }
}

function clear123() {
  siteName.value = "";
  siteURL.value = "";
}

function capitalize(str) {
  let strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}

submit.addEventListener("click", function () {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName: capitalize(siteName.value),
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    display12(bookmarks.length - 1);
    clear123();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } else {
    boxx123.classList.remove("d-none");
  }
});

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
  validate12(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validate12(siteURL, urlRegex);
});

function validate12(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

function close11() {
  boxx123.classList.add("d-none");
}

close.addEventListener("click", close11);
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    close11();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    close11();
  }
});
