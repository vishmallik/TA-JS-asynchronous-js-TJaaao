const root = document.querySelector(".root");
const select = document.querySelector("select");
const loading = document.getElementById("loading");
const url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
let news = [];
let sources = [];

function fetchData() {
  loading.classList.add("display");
  let data = fetch(url);
  data
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error Occurred: ${response.status}`);
      } else {
        return response.json();
      }
    })
    .then((articles) => {
      articles.forEach((article) => {
        sources.push(article.newsSite);
        news.push(article);
      });
      render(news);
      displayOptions();
    })
    .catch((err) => (root.innerText = `${err}`))
    .finally(() => loading.classList.remove("display"));
}
function displayOptions() {
  Array.from(new Set(sources)).forEach((source) => {
    let option = document.createElement("option");
    option.value = source;
    option.innerText = source;
    select.append(option);
  });
}

function render(object) {
  root.innerHTML = "";
  let fragment = new DocumentFragment();
  object.forEach((article) => {
    // console.log(article);
    let parent = document.createElement("article");
    parent.classList.add("flex");

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("imgcontainer");
    let img = document.createElement("img");
    img.src = article.imageUrl;
    imgContainer.append(img);

    let textContainer = document.createElement("div");
    textContainer.classList.add("textcontainer");

    let newsSite = document.createElement("p");
    newsSite.innerText = article.newsSite.toUpperCase();

    let title = document.createElement("h2");
    title.innerText = article.title;

    let button = document.createElement("button");
    let link = document.createElement("a");
    link.href = article.url;
    link.innerText = "Read More";
    button.append(link);
    textContainer.append(newsSite, title, button);
    parent.append(imgContainer, textContainer);
    fragment.append(parent);
  });
  root.append(fragment);
}
select.addEventListener("change", (event) => {
  let selectedNews = news.filter((elm) => elm.newsSite === event.target.value);
  if (event.target.value) {
    render(selectedNews);
  } else {
    render(news);
  }
});
fetchData();
