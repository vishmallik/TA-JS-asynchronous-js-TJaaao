const root = document.querySelector(".root");
const url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;

let data = fetch(url);
data.then((response) => response.json()).then((articles) => render(articles));

function render(object) {
  root.innerHTML = "";
  let fragment = new DocumentFragment();
  object.forEach((article) => {
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
