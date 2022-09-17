const userImg = document.querySelector(".userimg");
const userName = document.querySelector("h2");
const userHandle = document.querySelector("h3");
const search = document.querySelector("input");
const follower = document.querySelector(".follower");
const following = document.querySelector(".following");
const catImg = document.querySelector(".cat");
const button = document.querySelector("button");

function displayUI(data) {
  userImg.src = data.avatar_url;
  userName.innerText = data.name;
  userHandle.innerText = `@${data.login}`;
  for (let i = 1; i <= 5; i++) {
    let img = document.createElement("img");
    img.src = data;
  }
}
function createUI(data, root) {
  root.innerHTML = "";
  let fragment = new DocumentFragment();
  for (let i = 1; i <= 5; i++) {
    let img = document.createElement("img");
    img.src = data[i].avatar_url;
    fragment.append(img);
  }
  root.append(fragment);
}

function handleSearch(event) {
  if (event.keyCode === 13) {
    let username = event.target.value;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.github.com/users/${username}`);
    xhr.onload = function () {
      let userData = JSON.parse(xhr.response);
      displayUI(userData);
    };

    xhr.send();

    let xhr2 = new XMLHttpRequest();
    xhr2.open("GET", `https://api.github.com/users/${username}/followers`);
    xhr2.onload = function () {
      let followerData = JSON.parse(xhr2.response);
      createUI(followerData, follower);
    };
    xhr2.send();

    let xhr3 = new XMLHttpRequest();
    xhr3.open("GET", `https://api.github.com/users/${username}/following`);
    xhr3.onload = function () {
      let followingData = JSON.parse(xhr3.response);
      createUI(followingData, following);
    };
    xhr3.send();
    event.target.value = "";
  }
}

function handleClick() {
  let xhr4 = new XMLHttpRequest();
  xhr4.open(
    "GET",
    "https://api.thecatapi.com/v1/images/search?limit=1&size=full"
  );
  xhr4.onload = function () {
    let catData = JSON.parse(xhr4.response);
    catImg.src = catData[0].url;
  };
  xhr4.send();
}

search.addEventListener("keyup", handleSearch);
button.addEventListener("click", handleClick);
