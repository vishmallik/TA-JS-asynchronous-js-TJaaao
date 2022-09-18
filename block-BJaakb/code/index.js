// - Create a function named `fetch` which can accept one parameter an `url` and returns a promise.
// - Use `XMLHttpRequest` to make a network request using the `url` from parameter
// - When the data is loaded resolve the promise with the value
// - If there is any issue loading data reject the promise with an error message

// Add-on:

// - Refactor the image search app you created (in previous exercise) to use the function `fetch` you crated above.

function fetch(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
      resolve(JSON.parse(xhr.response));
    };
    xhr.onerror = function () {
      reject("Something Went Wrong");
    };
    xhr.send();
  });
}

const input = document.querySelector("input");
let root = document.querySelector(".root");

function createQuery(query = "") {
  root.innerHTML = "";
  let url = `https://api.unsplash.com/photos/random?query=${query}&count=12&client_id=pAeRV90c6ujNcHBeOJS8h30AotYj60rc0oM9WMKPW7g`;
  fetch(url).then((value) =>
    value.forEach((object) => createUI(object.urls.small))
  );
}
function createUI(imgUrl) {
  let fragment = new DocumentFragment();
  let img = document.createElement("img");
  img.src = imgUrl;
  fragment.append(img);
  root.append(fragment);
}

function handleSearch(event) {
  if (event.keyCode === 13 && event.target.value) {
    createQuery(event.target.value);
    event.target.value = "";
  }
}
input.addEventListener("keyup", handleSearch);
createQuery();
