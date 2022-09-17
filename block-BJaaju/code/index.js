const input = document.querySelector("input");
let root = document.querySelector(".root");

function createUI(query = "") {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.unsplash.com/photos/random?` +
      `query=${query}&` +
      `count=12&client_id=pAeRV90c6ujNcHBeOJS8h30AotYj60rc0oM9WMKPW7g`
  );
  xhr.onload = function () {
    let response = JSON.parse(xhr.response);
    root.innerHTML = "";
    let fragment = new DocumentFragment();
    for (let i = 0; i < 12; i++) {
      let img = document.createElement("img");
      img.src = response[i].urls.small;
      fragment.append(img);
    }
    root.append(fragment);
  };
  xhr.onerror = function () {
    console.error("Something went wrong");
  };
  xhr.send();
}

function handleSearch(event) {
  if (event.keyCode === 13 && event.target.value) {
    createUI(event.target.value);
    event.target.value = "";
  }
}
input.addEventListener("keyup", handleSearch);
createUI();
