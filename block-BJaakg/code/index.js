const root = document.querySelector(".root");
const modal = document.querySelector(".modal");
const modalroot = document.querySelector(".modalroot");
const loading = document.querySelectorAll(".loading");

const url = `https://www.anapioficeandfire.com/api/books`;

function fetchData(url, cb) {
  loading.forEach((icon) => icon.classList.add("visible"));
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((value) => cb(value))
    .catch((error) => {
      root.innerHTML = `Failed to Load Data. ${error}`;
    })
    .finally(() => loading.forEach((icon) => icon.classList.remove("visible")));
}

function createUI(books) {
  root.innerHTML = "";
  const fragment = new DocumentFragment();
  books.forEach((book) => {
    const li = document.createElement("li");
    const h2 = document.createElement("h2");
    h2.innerText = book.name;

    const h3 = document.createElement("h3");
    h3.innerText =
      book.authors.length > 1 ? book.authors.join(", ") : book.authors.join("");

    const button = document.createElement("button");
    button.innerText = `Show characters(${book.characters.length})`;
    button.addEventListener("click", () => handleClick(book.characters));

    li.append(h2, h3, button);
    fragment.append(li);
  });
  root.append(fragment);
}

function modalUI(character) {
  const li = document.createElement("li");
  const name = document.createElement("h4");
  const alias = document.createElement("h5");
  const gender = document.createElement("p");
  const tvseries = document.createElement("p");

  name.innerText = `Name: ${character.name}`;

  let aliases =
    character.aliases.length > 1
      ? character.aliases.join(", ")
      : character.aliases.join("");
  alias.innerText = `Aliases: ${aliases}`;

  gender.innerText = `Gender: ${character.gender}`;
  let series =
    character.tvSeries.length > 1
      ? character.tvSeries.join(", ")
      : character.tvSeries.join("");
  tvseries.innerText = `TV Series: ${series}`;

  const close = document.querySelector(".close");
  close.addEventListener("click", () => {
    modal.classList.remove("visible");
  });
  li.append(name, alias, gender, tvseries);
  modalroot.append(li);
}

function handleClick(characters) {
  modal.classList.add("visible");
  modalroot.innerHTML = "";
  characters.forEach((characterURL) => {
    fetchData(characterURL, modalUI);
  });
}

fetchData(url, createUI);
