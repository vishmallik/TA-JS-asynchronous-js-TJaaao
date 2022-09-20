(function () {
  const baseURL = "https://basic-todo-api.vercel.app/api/todo";
  const input = document.querySelector("input");
  const rootelm = document.querySelector(".rootelm");
  const loading = document.querySelector(".loading");

  function fetchTodo(url = baseURL, method, data) {
    loading.classList.add("visible");
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Something went wrong ${response.status}`);
        }
        return response.json();
      })
      .then((value) => createUI(value.todos))
      .catch((error) => (rootelm.innerHTML = `${error}`))
      .finally(() => loading.classList.remove("visible"));
  }

  function createUI(todos) {
    rootelm.innerHTML = "";
    todos.forEach((todo) => {
      let li = document.createElement("li");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.isCompleted;
      checkbox.addEventListener("input", (event) => {
        handleToggle(event, todo._id);
      });

      let span = document.createElement("span");
      span.innerText = todo.title;
      if (todo.isCompleted) {
        span.style.textDecoration = "line-through";
        span.style.color = "lightgrey";
      }

      let i = document.createElement("i");
      i.classList.add("fa-solid");
      i.classList.add("fa-xmark");
      i.style.visibility = "visible";
      i.addEventListener("click", () => {
        handleDelete(todo._id);
      });

      li.append(checkbox, span, i);

      rootelm.append(li);
    });
  }

  function data(isCompleted = false, title) {
    return {
      todo: {
        title: title,
        isCompleted: isCompleted,
      },
    };
  }
  function handleToggle(e, id) {
    fetchTodo(baseURL + "/" + id, "PUT", data(e.target.checked));
  }
  function handleDelete(id) {
    fetchTodo(baseURL + "/" + id, "DELETE");
  }

  function handleInput(event) {
    let value = event.target.value;
    if (event.keyCode === 13 && value !== "") {
      let todo = data(false, value);
      fetchTodo(baseURL, "POST", todo);
      event.target.value = "";
      fetchTodo(baseURL, "GET");
    }
  }
  input.addEventListener("keyup", handleInput);
  fetchTodo(baseURL, "GET");
})();
